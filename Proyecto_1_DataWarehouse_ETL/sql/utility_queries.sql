
-- Listar tablas (no sistema)
SELECT table_schema, table_name
FROM information_schema.tables
WHERE table_type = 'BASE TABLE'
  AND table_schema NOT IN ('pg_catalog', 'information_schema')
ORDER BY 1,2;

-- Listar índices
SELECT schemaname, tablename, indexname, indexdef
FROM pg_indexes
WHERE schemaname NOT IN ('pg_catalog','information_schema')
ORDER BY 1,2;

-- Vistas materializadas
SELECT schemaname, matviewname, definition
FROM pg_matviews
ORDER BY 1,2;

-- Definición de funciones/procedimientos
SELECT n.nspname AS schema, p.proname AS name, p.prokind AS kind,
       pg_get_functiondef(p.oid) AS definition
FROM pg_proc p
JOIN pg_namespace n ON n.oid = p.pronamespace
WHERE n.nspname NOT IN ('pg_catalog','information_schema')
ORDER BY 1,2;

-- Actividad actual
SELECT pid, usename, datname, state, query_start,
       now() - query_start AS duracion, left(query, 200) AS query
FROM pg_stat_activity
WHERE state <> 'idle'
ORDER BY query_start;
