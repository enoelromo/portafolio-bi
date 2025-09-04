
# Proyecto 1 — Data Warehouse & ETL (PostgreSQL)

## 🧩 Contexto
Replicación desde servidor de producción hacia un **DWH** para analítica/reportes. Cargas rápidas con **procedimientos**, **índices** y **vistas materializadas**.

## 🛠 Tecnologías
PostgreSQL · dblink · Vistas materializadas · Índices · Logs en tabla · pgAdmin

## 🗺️ Arquitectura (alto nivel)

...


## 📸 Capturas (súbelas luego)
- `img/06_pgadmin_activity.png` (actividad)
- `img/07_pgadmin_objects.png` (objetos: MVs/SPs)
- `img/04_logs_connection_issue.png` y `img/05_logs_ok.png` (logs)

## ⚙️ ETL con procedimientos (y logs)
- 1 SP por entidad (Bill/BillDetail, Order/OrderProduct…).
- Logging en `public.dw_logs_procedures` (step, message, duration, cumulativeTotal, executionId).
- SQL de ejemplo en `./sql/`.

## 🚀 Optimización
- Índices por selectividad/patrones de acceso (fechas, businessId, customerId).
- Vistas materializadas (KPI diarios/mensuales, resúmenes).
- `proc_refresh_all_views()` al final del pipeline.

## ✅ Resultados
- Cargas parciales mensuales < **5s** (según volumen).
- Bajísima latencia en dashboards con `REFRESH MATERIALIZED VIEW CONCURRENTLY`.
