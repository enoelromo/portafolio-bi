-- PROCEDURE: public.proc_month_order_orderproduct(integer) [ANONIMIZADA]
CREATE OR REPLACE PROCEDURE public.proc_month_order_orderproduct(IN offset_months integer DEFAULT 1)
LANGUAGE plpgsql
AS $$
DECLARE
  start_time TIMESTAMP; step_duration INTERVAL;
  cumulative_total INTERVAL := INTERVAL '0 seconds';
  execution_id UUID := gen_random_uuid();
  from_date DATE; to_date DATE; mes_log TEXT;
  deleted_orders INT := 0; deleted_orderproducts INT := 0;
  inserted_orders INT := 0; inserted_orderproducts INT := 0;
BEGIN
  from_date := date_trunc('month', CURRENT_DATE) - (INTERVAL '1 month' * offset_months);
  to_date   := date_trunc('month', CURRENT_DATE) - (INTERVAL '1 month' * (offset_months - 1));
  mes_log := to_char(from_date,'YYYY-MM');

  -- Timeout
  start_time := clock_timestamp(); PERFORM set_config('statement_timeout','60s',false);
  step_duration := clock_timestamp() - start_time; cumulative_total := cumulative_total + step_duration;
  INSERT INTO public.dw_logs_procedures(procedure_name,step,message,duration,cumulativeTotal,executionId)
  VALUES ('proc_month_order_orderproduct','timeout_config',
          FORMAT('1. ⏱ Timeout applied. (Date: %s)',mes_log),
          step_duration,cumulative_total,execution_id);

  -- Desconectar si existe
  start_time := clock_timestamp();
  BEGIN
    IF EXISTS (SELECT 1 FROM dblink_get_connections() WHERE dblink_get_connections = 's_conexion') THEN
      PERFORM dblink_disconnect('s_conexion');
    END IF;
    step_duration := clock_timestamp() - start_time; cumulative_total := cumulative_total + step_duration;
    INSERT INTO public.dw_logs_procedures(procedure_name,step,message,duration,cumulativeTotal,executionId)
    VALUES ('proc_month_order_orderproduct','disconnect_if_exists',
            '2. 🔌 Existing connection closed.', step_duration,cumulative_total,execution_id);
  EXCEPTION WHEN OTHERS THEN
    step_duration := clock_timestamp() - start_time; cumulative_total := cumulative_total + step_duration;
    INSERT INTO public.dw_logs_procedures(procedure_name,step,message,duration,cumulativeTotal,executionId)
    VALUES ('proc_month_order_orderproduct','disconnect_if_exists',
            '2. ⚠️ Failed to check/disconnect existing connection.', step_duration,cumulative_total,execution_id);
  END;

  -- Conectar (placeholders)
  start_time := clock_timestamp();
  BEGIN
    PERFORM dblink_connect('s_conexion',
      'dbname=<SRC_DB> host=<SRC_HOST> user=<SRC_USER> password=<SRC_PASSWORD> port=<SRC_PORT> sslmode=require');
    step_duration := clock_timestamp() - start_time; cumulative_total := cumulative_total + step_duration;
    INSERT INTO public.dw_logs_procedures(procedure_name,step,message,duration,cumulativeTotal,executionId)
    VALUES ('proc_month_order_orderproduct','connect','3. ✅ Connected to Source.',
            step_duration,cumulative_total,execution_id);
  EXCEPTION WHEN OTHERS THEN
    RAISE EXCEPTION '3. ❌ Connection error: %', SQLERRM;
  END;

  -- Delete
  start_time := clock_timestamp();
  WITH del_op AS (
    DELETE FROM public."OrderProduct"
    WHERE "orderId" IN (SELECT "id" FROM public."Order" WHERE "updatedAt" >= from_date AND "updatedAt" < to_date)
    RETURNING 1
  ), del_o AS (
    DELETE FROM public."Order" WHERE "updatedAt" >= from_date AND "updatedAt" < to_date RETURNING 1
  )
  SELECT (SELECT COUNT(*) FROM del_o),(SELECT COUNT(*) FROM del_op)
  INTO deleted_orders, deleted_orderproducts;
  step_duration := clock_timestamp() - start_time; cumulative_total := cumulative_total + step_duration;
  INSERT INTO public.dw_logs_procedures(procedure_name,step,message,duration,cumulativeTotal,executionId)
  VALUES ('proc_month_order_orderproduct','delete_month',
          FORMAT('4. 🚼 Deleted %s Order and %s OrderProduct rows (Date: %s)',
                 deleted_orders, deleted_orderproducts, mes_log),
          step_duration,cumulative_total,execution_id);

  -- Insert Orders
  start_time := clock_timestamp();
  WITH ins AS (
    INSERT INTO public."Order"("id","tableNumber","status","businessId","deletedAt","createdAt","updatedAt","note")
    SELECT * FROM dblink('s_conexion', FORMAT($f$
      SELECT "id","tableNumber","status","businessId","deletedAt","createdAt","updatedAt","note"
      FROM public."Order" WHERE "updatedAt" >= %L AND "updatedAt" < %L $f$, from_date, to_date))
    AS t("id" INT,"tableNumber" TEXT,"status" TEXT,"businessId" INT,
         "deletedAt" TIMESTAMPTZ,"createdAt" TIMESTAMPTZ,"updatedAt" TIMESTAMPTZ,"note" TEXT)
    RETURNING 1
  ) SELECT COUNT(*) INTO inserted_orders FROM ins;
  step_duration := clock_timestamp() - start_time; cumulative_total := cumulative_total + step_duration;
  INSERT INTO public.dw_logs_procedures(procedure_name,step,message,duration,cumulativeTotal,executionId)
  VALUES ('proc_month_order_orderproduct','insert_order',
          FORMAT('5. 📅 Inserted %s Order rows for %s', inserted_orders, mes_log),
          step_duration,cumulative_total,execution_id);

  -- Insert OrderProduct
  start_time := clock_timestamp();
  WITH ins AS (
    INSERT INTO public."OrderProduct"("orderId","productId","quantity","discount","createdAt","updatedAt","unitPrice",
                                      "taxSubtotal","status","quantityBilled","note")
    SELECT * FROM dblink('s_conexion', FORMAT($f$
      SELECT "orderId","productId","quantity","discount","createdAt","updatedAt","unitPrice",
             "taxSubtotal","status","quantityBilled","note"
      FROM public."OrderProduct"
      WHERE "orderId" IN (SELECT "id" FROM public."Order" WHERE "updatedAt" >= %L AND "updatedAt" < %L) $f$,
      from_date, to_date))
    AS t("orderId" INT,"productId" INT,"quantity" NUMERIC,"discount" NUMERIC,"createdAt" TIMESTAMPTZ,
         "updatedAt" TIMESTAMPTZ,"unitPrice" NUMERIC,"taxSubtotal" NUMERIC,"status" TEXT,
         "quantityBilled" NUMERIC,"note" TEXT)
    RETURNING 1
  ) SELECT COUNT(*) INTO inserted_orderproducts FROM ins;
  step_duration := clock_timestamp() - start_time; cumulative_total := cumulative_total + step_duration;
  INSERT INTO public.dw_logs_procedures(procedure_name,step,message,duration,cumulativeTotal,executionId)
  VALUES ('proc_month_order_orderproduct','insert_orderproduct',
          FORMAT('6. 📊 Inserted %s OrderProduct rows for %s', inserted_orderproducts, mes_log),
          step_duration,cumulative_total,execution_id);

  -- Desconectar
  start_time := clock_timestamp(); PERFORM dblink_disconnect('s_conexion');
  step_duration := clock_timestamp() - start_time; cumulative_total := cumulative_total + step_duration;
  INSERT INTO public.dw_logs_procedures(procedure_name,step,message,duration,cumulativeTotal,executionId)
  VALUES ('proc_month_order_orderproduct','disconnect','7. 📴 Disconnected from Source.',
          step_duration,cumulative_total,execution_id);

EXCEPTION
  WHEN query_canceled THEN
    INSERT INTO public.dw_logs_procedures(procedure_name,step,message,duration,cumulativeTotal,executionId)
    VALUES ('proc_month_order_orderproduct','error','⛔ Query canceled due to timeout.',
            INTERVAL '0',cumulative_total,execution_id);
  WHEN OTHERS THEN
    INSERT INTO public.dw_logs_procedures(procedure_name,step,message,duration,cumulativeTotal,executionId)
    VALUES ('proc_month_order_orderproduct','error',SQLERRM,INTERVAL '0',cumulative_total,execution_id);
    BEGIN PERFORM dblink_disconnect('s_conexion'); EXCEPTION WHEN OTHERS THEN NULL; END;
END;
$$;

