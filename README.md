# BI Portfolio — Eric Noël

Public site: https://enoelromo.github.io/portafolio-bi/

This repository contains a static portfolio (GitHub Pages) with:
- An end-to-end BI case study (DW in PostgreSQL + orchestration with n8n + finished dashboard).
- Two personal apps in production: Olivovilo (services) and Floo (personal finance).
- Full i18n support (ES/EN/FR) with French as the default language.

## Structure

docs/ # published site (GitHub Pages)
assets/
app.js # text & i18n (ES/EN/FR)
style.css # styles
icons/ # icons (linkedin.png, cv.png)
index.html # home
bi/index.html # BI project
apps/servicios/index.html
apps/finanzas/index.html


## Quick Editing
- **Text / i18n**: `docs/assets/app.js` (`t` object).
- **LinkedIn / CV links**: header in `docs/index.html`, `docs/bi/index.html`, `docs/apps/servicios/index.html`, `docs/apps/finanzas/index.html`.
- **Icons**: place `linkedin.png` and `cv.png` in `docs/assets/icons/`. Suggested size: **128x128** (displayed at ~20px).

## License
- **Code (HTML/CSS/JS)**: MIT — see `LICENSE`.
- **Content (portfolio text and images)**: CC BY-NC-ND 4.0 (non-commercial, no derivatives, with attribution).
