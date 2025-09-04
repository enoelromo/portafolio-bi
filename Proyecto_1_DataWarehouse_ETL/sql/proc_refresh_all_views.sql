
-- PROCEDURE: public.proc_refresh_all_views() [comentada]
CREATE OR REPLACE PROCEDURE public.proc_refresh_all_views()
LANGUAGE plpgsql
AS $$
DECLARE
  start_time TIMESTAMP; step_duration INTERVAL;
  cumulative_total INTERVAL := INTERVAL '0 seconds';
  execution_id UUID := gen_random_uuid();
  refreshed_views INT := 0; total_views INT := 4; -- ajusta si agregas MVs
BEGIN
  start_time := clock_timestamp(); PERFORM set_config('statement_timeout','60s',false);
  step_duration := clock_timestamp() - start_time; cumulative_total := cumulative_total + step_duration;
  INSERT INTO public.dw_logs_procedures(procedure_name,step,message,duration,cumulativeTotal,executionId)
  VALUES ('proc_refresh_all_views','init','1. ⏱ Timeout configurado a 60s.',step_duration,cumulative_total,execution_id);

  -- mv_resumen_clientes_dia
  start_time := clock_timestamp();
  BEGIN
    REFRESH MATERIALIZED VIEW CONCURRENTLY public.mv_resumen_clientes_dia;
    refreshed_views := refreshed_views + 1;
    step_duration := clock_timestamp() - start_time; cumulative_total := cumulative_total + step_duration;
    INSERT INTO public.dw_logs_procedures(procedure_name,step,message,duration,cumulativeTotal,executionId)
    VALUES ('proc_refresh_all_views','mv_resumen_clientes_dia','2. ✅ Vista mv_resumen_clientes_dia actualizada.',
            step_duration,cumulative_total,execution_id);
  EXCEPTION WHEN OTHERS THEN
    step_duration := clock_timestamp() - start_time; cumulative_total := cumulative_total + step_duration;
    INSERT INTO public.dw_logs_procedures(procedure_name,step,message,duration,cumulativeTotal,executionId)
    VALUES ('proc_refresh_all_views','mv_resumen_clientes_dia',FORMAT('2. ❌ Error: %s',SQLERRM),
            step_duration,cumulative_total,execution_id);
  END;

  -- mv_resumen_clientes_mes
  start_time := clock_timestamp();
  BEGIN
    REFRESH MATERIALIZED VIEW CONCURRENTLY public.mv_resumen_clientes_mes;
    refreshed_views := refreshed_views + 1;
    step_duration := clock_timestamp() - start_time; cumulative_total := cumulative_total + step_duration;
    INSERT INTO public.dw_logs_procedures(procedure_name,step,message,duration,cumulativeTotal,executionId)
    VALUES ('proc_refresh_all_views','mv_resumen_clientes_mes','3. ✅ Vista mv_resumen_clientes_mes actualizada.',
            step_duration,cumulative_total,execution_id);
  EXCEPTION WHEN OTHERS THEN
    step_duration := clock_timestamp() - start_time; cumulative_total := cumulative_total + step_duration;
    INSERT INTO public.dw_logs_procedures(procedure_name,step,message,duration,cumulativeTotal,executionId)
    VALUES ('proc_refresh_all_views','mv_resumen_clientes_mes',FORMAT('3. ❌ Error: %s',SQLERRM),
            step_duration,cumulative_total,execution_id);
  END;

  -- mv_ventas_dia
  start_time := clock_timestamp();
  BEGIN
    REFRESH MATERIALIZED VIEW CONCURRENTLY public.mv_ventas_dia;
    refreshed_views := refreshed_views + 1;
    step_duration := clock_timestamp() - start_time; cumulative_total := cumulative_total + step_duration;
    INSERT INTO public.dw_logs_procedures(procedure_name,step,message,duration,cumulativeTotal,executionId)
    VALUES ('proc_refresh_all_views','mv_ventas_dia','4. ✅ Vista mv_ventas_dia actualizada.',
            step_duration,cumulative_total,execution_id);
  EXCEPTION WHEN OTHERS THEN
    step_duration := clock_timestamp() - start_time; cumulative_total := cumulative_total + step_duration;
    INSERT INTO public.dw_logs_procedures(procedure_name,step,message,duration,cumulativeTotal,executionId)
    VALUES ('proc_refresh_all_views','mv_ventas_dia',FORMAT('4. ❌ Error: %s',SQLERRM),
            step_duration,cumulative_total,execution_id);
  END;

  -- mv_ventas_mes
  start_time := clock_timestamp();
  BEGIN
    REFRESH MATERIALIZED VIEW CONCURRENTLY public.mv_ventas_mes;
    refreshed_views := refreshed_views + 1;
    step_duration := clock_timestamp() - start_time; cumulative_total := cumulative_total + step_duration;
    INSERT INTO public.dw_logs_procedures(procedure_name,step,message,duration,cumulativeTotal,executionId)
    VALUES ('proc_refresh_all_views','mv_ventas_mes','5. ✅ Vista mv_ventas_mes actualizada.',
            step_duration,cumulative_total,execution_id);
  EXCEPTION WHEN OTHERS THEN
    step_duration := clock_timestamp() - start_time; cumulative_total := cumulative_total + step_duration;
    INSERT INTO public.dw_logs_procedures(procedure_name,step,message,duration,cumulativeTotal,executionId)
    VALUES ('proc_refresh_all_views','mv_ventas_mes',FORMAT('5. ❌ Error: %s',SQLERRM),
            step_duration,cumulative_total,execution_id);
  END;

  -- Resumen
  start_time := clock_timestamp(); step_duration := clock_timestamp() - start_time;
  cumulative_total := cumulative_total + step_duration;
  INSERT INTO public.dw_logs_procedures(procedure_name,step,message,duration,cumulativeTotal,executionId)
  VALUES ('proc_refresh_all_views','summary',
          FORMAT('6. 🔚 Proceso finalizado: %s de %s vistas actualizadas.', refreshed_views, total_views),
          step_duration,cumulative_total,execution_id);
EXCEPTION
  WHEN query_canceled THEN
    INSERT INTO public.dw_logs_procedures(procedure_name,step,message,duration,cumulativeTotal,executionId)
    VALUES ('proc_refresh_all_views','error','⚠️ Proceso cancelado por timeout.',INTERVAL '0',cumulative_total,execution_id);
  WHEN OTHERS THEN
    INSERT INTO public.dw_logs_procedures(procedure_name,step,message,duration,cumulativeTotal,executionId)
    VALUES ('proc_refresh_all_views','error',FORMAT('❌ Error no manejado: %s',SQLERRM),INTERVAL '0',cumulative_total,execution_id);
END;
$$;
