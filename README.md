# Portafolio BI — Eric Noël

Sitio público: https://enoelromo.github.io/portafolio-bi/

Este repositorio contiene un portafolio estático (GitHub Pages) con:
- Un caso end-to-end de BI (DW en PostgreSQL + orquestación en n8n + dashboard en preparación).
- Dos apps personales (Servicios y Finanzas) en fase de diseño/roadmap.

## Estructura

docs/ # sitio publicado (GitHub Pages)
assets/
app.js # textos e i18n (ES/EN/FR)
style.css # estilos
icons/ # íconos (linkedin.png, cv.png)
index.html # home
bi/index.html # proyecto BI
apps/servicios/index.html
apps/finanzas/index.html


## Edición rápida
- **Textos / i18n**: `docs/assets/app.js` (objeto `t`).
- **Enlaces LinkedIn / CV**: header de `docs/index.html`, `docs/bi/index.html`, `docs/apps/servicios/index.html`, `docs/apps/finanzas/index.html`.
- **Íconos**: coloca `linkedin.png` y `cv.png` en `docs/assets/icons/`. Tamaño sugerido: **128×128** (se redimensionan a ~20px).

## Licencia
- **Código (HTML/CSS/JS)**: MIT — ver `LICENSE`.
- **Contenido (textos e imágenes del portafolio)**: CC BY-NC-ND 4.0 (no comercial, sin obras derivadas, con atribución).

