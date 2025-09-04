
# Proyecto 1 — Data Warehouse & ETL (PostgreSQL)

[← Volver al inicio](../index.md)

## 🧩 Contexto
Replicación desde el servidor de producción hacia un **Data Warehouse** para analítica/reportes. Cargas rápidas con **procedimientos**, **índices** y **vistas materializadas**.

## 🗺️ Arquitectura

...


## 📸 Capturas
> Sube las imágenes a `docs/proyecto-1/img/` y usa estos nombres:

- Actividad BD: `![Actividad](./img/06_pgadmin_activity.png)`
- Objetos (MVs/SPs): `![Objetos](./img/07_pgadmin_objects.png)`
- Log con error conexión: `![Log error](./img/04_logs_connection_issue.png)`
- Log OK: `![Log ok](./img/05_logs_ok.png)`

## ⚙️ ETL y Logging
- 1 procedimiento por entidad (Bill/BillDetail, Order/OrderProduct…).
- Logging en `public.dw_logs_procedures` (step, message, duration, cumulativeTotal, executionId).

### Código SQL (en el repositorio)
- Procedimiento Bill+Detail:  
  https://github.com/enoelromo/portafolio-bi/blob/main/Proyecto_1_DataWarehouse_ETL/sql/proc_month_bill_billdetail_anon.sql
- Procedimiento Order+OrderProduct:  
  https://github.com/enoelromo/portafolio-bi/blob/main/Proyecto_1_DataWarehouse_ETL/sql/proc_month_order_orderproduct_anon.sql
- Refresco de MVs:  
  https://github.com/enoelromo/portafolio-bi/blob/main/Proyecto_1_DataWarehouse_ETL/sql/proc_refresh_all_views.sql
- Utilidades (listar tablas/índices/MVs):  
  https://github.com/enoelromo/portafolio-bi/blob/main/Proyecto_1_DataWarehouse_ETL/sql/utility_queries.sql

## ✅ Resultados
- Cargas parciales < **5s** (según volumen).
- `REFRESH MATERIALIZED VIEW CONCURRENTLY` para latencia baja.
