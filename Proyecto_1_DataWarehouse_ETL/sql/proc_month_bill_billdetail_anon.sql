
-- PROCEDURE: public.proc_month_bill_billdetail(integer) [ANONIMIZADA]
CREATE OR REPLACE PROCEDURE public.proc_month_bill_billdetail(IN offset_months integer DEFAULT 1)
LANGUAGE plpgsql
AS $$
DECLARE
  start_time TIMESTAMP; step_duration INTERVAL;
  cumulative_total INTERVAL := INTERVAL '0 seconds';
  execution_id UUID := gen_random_uuid();
  from_date DATE; to_date DATE; mes_log TEXT;
  deleted_bills INT := 0; deleted_details INT := 0;
  inserted_bills INT := 0; inserted_details INT := 0;
BEGIN
  from_date := date_trunc('month', CURRENT_DATE) - (INTERVAL '1 month' * offset_months);
  to_date   := date_trunc('month', CURRENT_DATE) - (INTERVAL '1 month' * (offset_months - 1));
  mes_log   := to_char(from_date, 'YYYY-MM');

  -- Timeout
  start_time := clock_timestamp(); PERFORM set_config('statement_timeout','60s',false);
  step_duration := clock_timestamp() - start_time; cumulative_total := cumulative_total + step_duration;
  INSERT INTO public.dw_logs_procedures(procedure_name,step,message,duration,cumulativeTotal,executionId)
  VALUES ('proc_month_bill_billdetail','timeout_config',FORMAT('1. ⏱ Timeout applied. (Date: %s)',mes_log),
          step_duration,cumulative_total,execution_id);

  -- Cerrar conexión si existe
  start_time := clock_timestamp();
  BEGIN
    IF EXISTS (SELECT 1 FROM dblink_get_connections() WHERE dblink_get_connections = 's_conexion') THEN
      PERFORM dblink_disconnect('s_conexion');
    END IF;
    step_duration := clock_timestamp() - start_time; cumulative_total := cumulative_total + step_duration;
    INSERT INTO public.dw_logs_procedures(procedure_name,step,message,duration,cumulativeTotal,executionId)
    VALUES ('proc_month_bill_billdetail','disconnect_if_exists','2. 🔌 Existing connection closed.',
            step_duration,cumulative_total,execution_id);
  EXCEPTION WHEN OTHERS THEN
    step_duration := clock_timestamp() - start_time; cumulative_total := cumulative_total + step_duration;
    INSERT INTO public.dw_logs_procedures(procedure_name,step,message,duration,cumulativeTotal,executionId)
    VALUES ('proc_month_bill_billdetail','disconnect_if_exists','2. ⚠️ Failed to check/disconnect existing connection.',
            step_duration,cumulative_total,execution_id);
  END;

  -- Conectar (placeholders)
  start_time := clock_timestamp();
  BEGIN
    PERFORM dblink_connect('s_conexion',
      'dbname=<SRC_DB> host=<SRC_HOST> user=<SRC_USER> password=<SRC_PASSWORD> port=<SRC_PORT> sslmode=require');
    step_duration := clock_timestamp() - start_time; cumulative_total := cumulative_total + step_duration;
    INSERT INTO public.dw_logs_procedures(procedure_name,step,message,duration,cumulativeTotal,executionId)
    VALUES ('proc_month_bill_billdetail','connect','3. ✅ Connected to Source.',
            step_duration,cumulative_total,execution_id);
  EXCEPTION WHEN OTHERS THEN
    RAISE EXCEPTION '3. ❌ Connection error: %', SQLERRM;
  END;

  -- Delete mes previo (BillDetail → Bill)
  start_time := clock_timestamp();
  WITH del_bd AS (
    DELETE FROM public."BillDetail"
    WHERE "billId" IN (SELECT "id" FROM public."Bill" WHERE "updatedAt" >= from_date AND "updatedAt" < to_date)
    RETURNING 1
  ), del_b AS (
    DELETE FROM public."Bill" WHERE "updatedAt" >= from_date AND "updatedAt" < to_date RETURNING 1
  )
  SELECT (SELECT COUNT(*) FROM del_b),(SELECT COUNT(*) FROM del_bd)
  INTO deleted_bills, deleted_details;
  step_duration := clock_timestamp() - start_time; cumulative_total := cumulative_total + step_duration;
  INSERT INTO public.dw_logs_procedures(procedure_name,step,message,duration,cumulativeTotal,executionId)
  VALUES ('proc_month_bill_billdetail','delete_month',
          FORMAT('4. 🪩 Deleted %s Bill and %s BillDetail rows (Date: %s)',deleted_bills,deleted_details,mes_log),
          step_duration,cumulative_total,execution_id);

  -- Insert Bill
  start_time := clock_timestamp();
  WITH ins AS (
    INSERT INTO public."Bill"(
      "id","customerId","businessId","subTotalTax","orderId","total","status","subTotal",
      "createdAt","updatedAt","paymentMethodId")
    SELECT * FROM dblink('s_conexion', FORMAT($f$
      SELECT "id","customerId","businessId","subTotalTax","orderId","total","status","subTotal",
             "createdAt","updatedAt","paymentMethodId"
      FROM public."Bill" WHERE "updatedAt" >= %L AND "updatedAt" < %L $f$, from_date, to_date))
    AS t("id" INT,"customerId" INT,"businessId" INT,"subTotalTax" NUMERIC(5),"orderId" INT,"total" NUMERIC(10),
         "status" TEXT,"subTotal" REAL,"createdAt" TIMESTAMPTZ,"updatedAt" TIMESTAMPTZ,"paymentMethodId" INT)
    RETURNING 1
  ) SELECT COUNT(*) INTO inserted_bills FROM ins;
  step_duration := clock_timestamp() - start_time; cumulative_total := cumulative_total + step_duration;
  INSERT INTO public.dw_logs_procedures(procedure_name,step,message,duration,cumulativeTotal,executionId)
  VALUES ('proc_month_bill_billdetail','insert_bill',
          FORMAT('5. 📅 Inserted %s Bill rows for %s', inserted_bills, mes_log),
          step_duration,cumulative_total,execution_id);

  -- Insert BillDetail
  start_time := clock_timestamp();
  WITH ins AS (
    INSERT INTO public."BillDetail"("id","billId","productId","quantity","discount",
                                    "productUnitPrice","productTaxSubtotal","total")
    SELECT * FROM dblink('s_conexion', FORMAT($f$
      SELECT "id","billId","productId","quantity","discount","productUnitPrice","productTaxSubtotal","total"
      FROM public."BillDetail"
      WHERE "billId" IN (SELECT "id" FROM public."Bill" WHERE "updatedAt" >= %L AND "updatedAt" < %L) $f$,
      from_date, to_date))
    AS t("id" INT,"billId" INT,"productId" INT,"quantity" NUMERIC,"discount" NUMERIC,
         "productUnitPrice" NUMERIC,"productTaxSubtotal" NUMERIC,"total" NUMERIC)
    RETURNING 1
  ) SELECT COUNT(*) INTO inserted_details FROM ins;
  step_duration := clock_timestamp() - start_time; cumulative_total := cumulative_total + step_duration;
  INSERT INTO public.dw_logs_procedures(procedure_name,step,message,duration,cumulativeTotal,executionId)
  VALUES ('proc_month_bill_billdetail','insert_billdetail',
          FORMAT('6. 📊 Inserted %s BillDetail rows for %s', inserted_details, mes_log),
          step_duration,cumulative_total,execution_id);

  -- Desconectar
  start_time := clock_timestamp(); PERFORM dblink_disconnect('s_conexion');
  step_duration := clock_timestamp() - start_time; cumulative_total := cumulative_total + step_duration;
  INSERT INTO public.dw_logs_procedures(procedure_name,step,message,duration,cumulativeTotal,executionId)
  VALUES ('proc_month_bill_billdetail','disconnect','7. 🔌 Disconnected from Source.',
          step_duration,cumulative_total,execution_id);

EXCEPTION
  WHEN query_canceled THEN
    INSERT INTO public.dw_logs_procedures(procedure_name,step,message,duration,cumulativeTotal,executionId)
    VALUES ('proc_month_bill_billdetail','error','⛔ Query canceled due to timeout.',
            INTERVAL '0',cumulative_total,execution_id);
  WHEN OTHERS THEN
    INSERT INTO public.dw_logs_procedures(procedure_name,step,message,duration,cumulativeTotal,executionId)
    VALUES ('proc_month_bill_billdetail','error',SQLERRM,INTERVAL '0',cumulative_total,execution_id);
    BEGIN PERFORM dblink_disconnect('s_conexion'); EXCEPTION WHEN OTHERS THEN NULL; END;
END;
$$;
