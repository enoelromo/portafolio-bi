
# Proyecto 2 — Orquestación (cron → n8n)

## 🎯 Objetivo
Reemplazar múltiples cron por un **workflow n8n** con trazabilidad, reintentos y notificaciones.

## 🔁 Antes: cron (ejemplo anon.)

...

*/3 5-23 * * * psql "host=<HOST> dbname=<DB> user=<USER> ..." -f /opt/jobs/proc_month_bill_billdetail.sql >> /var/log/etl.log 2>&1

## ⚙️ Después: n8n
- Trigger (cron) cada 1–3 minutos (05:00–23:57).
- Nodo Postgres con:

CALL public.proc_month_user_data(0);
CALL public.proc_month_business_all(0);
CALL public.proc_month_product_group(0);
CALL public.proc_month_order_orderproduct(0);
CALL public.proc_month_bill_billdetail(0);
CALL public.proc_refresh_all_views();

- Exporta tu workflow real a `n8n/workflow_etl.json`.

## 📸 Capturas (súbelas luego)
- `img/01_n8n_flow.png` (flujo)
- `img/02_n8n_cron.png` (trigger)
- `img/03_n8n_postgres_node.png` (nodo Postgres)

## ✅ Resultado
Menor complejidad operativa y mejor observabilidad del ETL.

