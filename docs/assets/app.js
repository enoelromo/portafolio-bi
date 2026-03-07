// ===== Config =====
const CONTACT_EMAIL = "enoelromo@gmail.com"; // destinatario mailto
// Si prefieres un backend (Formspree u otro), define window.FORM_ENDPOINT

// ===== Util =====
document.addEventListener('DOMContentLoaded', () => {
  const y = document.getElementById('y');
  if (y) y.textContent = new Date().getFullYear();
});

// ===== Carruseles =====
function initCarousel(el){
  const slides = el.querySelector('.slides'); if(!slides) return;
  const imgs = slides.querySelectorAll('img'); let i=0;
  const go = n => { i=(n+imgs.length)%imgs.length; slides.style.transform=`translateX(-${i*100}%)`; };
  el.querySelector('.prev')?.addEventListener('click',()=>go(i-1));
  el.querySelector('.next')?.addEventListener('click',()=>go(i+1));
  if(el.dataset.autoplay==='true') setInterval(()=>go(i+1),4000);
}
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.carousel').forEach(initCarousel);
});

// ===== Tabs accesibles (página BI) =====
(function () {
  function initTabs(root=document){
    const tablist = root.querySelector('.tabs[role="tablist"]');
    if(!tablist) return;
    const tabs   = Array.from(tablist.querySelectorAll('.tab[role="tab"]'));
    const panels = tabs.map(t => root.querySelector('#'+t.getAttribute('aria-controls'))).filter(Boolean);

    function selectTab(idx, updateHash=true, focusTab=true){
      tabs.forEach((t,i)=> {
        const sel = i===idx;
        t.setAttribute('aria-selected', String(sel));
        t.tabIndex = sel ? 0 : -1;
        if(sel && focusTab) t.focus({preventScroll:true});
      });
      panels.forEach((p,i)=> p.toggleAttribute('hidden', i!==idx));
      const panelId = panels[idx]?.id;
      if(updateHash && panelId){
        history.replaceState(null,'',`${location.pathname}#${panelId}`);
      }
    }

    tabs.forEach((t,i)=> t.addEventListener('click',()=>selectTab(i,false,false)));

    tablist.addEventListener('keydown',(e)=>{
      const cur = tabs.findIndex(t=>t.getAttribute('aria-selected')==='true');
      if(e.key==='ArrowRight'){ e.preventDefault(); selectTab((cur+1)%tabs.length); }
      else if(e.key==='ArrowLeft'){ e.preventDefault(); selectTab((cur-1+tabs.length)%tabs.length); }
      else if(e.key==='Home'){ e.preventDefault(); selectTab(0); }
      else if(e.key==='End'){ e.preventDefault(); selectTab(tabs.length-1); }
    });

    const fromHash = (() => {
      const id=(location.hash||'').slice(1);
      return panels.findIndex(p=>p.id===id);
    })();
    if(fromHash>=0) selectTab(fromHash,false,false);
    else {
      const def = tabs.findIndex(t=>t.getAttribute('aria-selected')==='true') || 0;
      selectTab(def,false,false);
    }
    window.addEventListener('hashchange',()=>{
      const id=(location.hash||'').slice(1);
      const i=panels.findIndex(p=>p.id===id);
      if(i>=0) selectTab(i,false,false);
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    const pg = document.body.getAttribute('data-page');
    if(['bi','olivovilo','floo'].includes(pg)) initTabs(document);
  });
})();

// ===== i18n =====
const t = {
  es: {
    brand: "Inicio",
    "nav.projects": "Proyectos",
    "nav.contact": "Contáctame",
    "nav.linkedin": "LinkedIn",
    "nav.cv": "CV",

    "hero.title": "Portafolio — Eric Noël",
    "hero.lead": "Caso real end-to-end: Data Warehouse en PostgreSQL y orquestación con n8n. Dashboard público en preparación. Además, dos apps propias en camino.",
    "hero.note": "Este portafolio reúne proyectos personales, colaboraciones y trabajos para clientes. Para ver experiencia completa, roles y otras tecnologías, revisa mi CV o LinkedIn (arriba).",
    "hero.quick.title": "En resumen",
    "hero.quick.1": "Modelado dimensional y diseño de DWH (PostgreSQL / SQL Server) orientado a crecimiento y rendimiento.",
    "hero.quick.2": "Pipelines ETL incrementales y orquestación (SQL, cron, n8n, Visual Studio/SSIS) con monitoreo y reintentos.",
    "hero.quick.3": "Reporting y autoservicio: Power BI, Qlik, SAP BO; KPIs, comparativos y automatización (NPrinting/SSRS).",
    "hero.quick.4": "Gobierno de datos: documentación técnica, trazabilidad y auditoría; backups y operación en Windows/Linux.",
    "hero.quick.5": "Soft skills: análisis, autonomía, rigor y priorización; trabajo con equipos de negocio y TI.",

    "projects.title": "Proyectos",
    "card.bi.title": "BI End-to-End (3 etapas)",
    "card.bi.desc": "DWH en PostgreSQL → Orquestación en n8n → Dashboard (Power BI/Qlik). Datos anonimizados.",
    "card.bi.cta": "Ver etapas",

    "card.servicios.title": "Olivovilo — gestion empresarial",
    "card.servicios.desc": "Nomina, RRHH y gastos para Ecuador. Next.js + Supabase + Vercel.",
    "card.servicios.cta": "Ver proyecto",

    "card.finanzas.title": "Floo — finanzas personales",
    "card.finanzas.desc": "Multi-moneda, multi-idioma (EN/ES/FR). Next.js + PostgreSQL + Vercel.",
    "card.finanzas.cta": "Ver proyecto",

    "contact.title": "Conversemos",
    "contact.lead": "Cuéntame de tu reto (técnico o de negocio). Respondo normalmente el mismo día.",
    "contact.name": "Nombre",
    "contact.email": "Email",
    "contact.message": "Mensaje",
    "contact.send": "Enviar",
    "contact.privacy": "Tu mensaje se enviará por email. No guardo tus datos en servidores terceros.",

    "bi.title": "BI End-to-End",
    "bi.lead": "Un solo proyecto en 3 etapas: DWH en PostgreSQL → Orquestación en n8n → Dashboard.",
    "bi.tab1": "Etapa 1 · DWH & ETL",
    "bi.tab2": "Etapa 2 · Orquestación (n8n)",
    "bi.tab3": "Etapa 3 · Dashboard",
    "bi.e1.title": "DWH & ETL (PostgreSQL)",
    "bi.e1.desc": "Replicación controlada + transformaciones con procedimientos y logging por paso. Índices y vistas materializadas para baja latencia.",
    "bi.e1.bullets": `
      <li><b>PostgreSQL</b>: robusto, extensiones (<code>dblink</code>) y <code>REFRESH MATERIALIZED VIEW CONCURRENTLY</code>.</li>
      <li><b>PL/pgSQL</b>: control de flujo + trazabilidad (<code>dw_logs_procedures</code>).</li>
      <li><b>Índices</b> por selectividad (fechas, <code>businessId</code>, <code>customerId</code>).</li>
      <li><b>Alternativas</b>: SQL Server + SSIS (licencias), BigQuery (serverless, pago por consulta).</li>
    `,
    "bi.e2.title": "Orquestación (de cron a n8n)",
    "bi.e2.desc": "Reemplazo de cron por n8n: programaciones, reintentos, notificaciones y auditoría visual.",
    "bi.e2.bullets": `
      <li><b>n8n</b>: UI visual, bajo costo, conectores listos.</li>
      <li><b>vs cron</b>: historial, reintentos y alertas.</li>
      <li><b>Alternativas</b>: Airflow (más potente, más operación), SSIS (acoplado a SQL Server).</li>
    `,
    "bi.e3.title": "Dashboard",
    "bi.e3.desc": "KPIs, comparativos y filtros sobre MVs (mv_ventas_dia/mes, mv_resumen_clientes_dia/mes). Datos anonimizados.",
    "bi.e3.bullets": `
      <li><b>Power BI / Qlik</b>: prototipado rápido y ecosistema sólido.</li>
      <li><b>Alternativas</b>: Superset (open source), Metabase (rápido para empezar).</li>
      <li><b>Buenas prácticas</b>: parámetros de fecha y RLS si aplica.</li>
    `,

    "app.servicios.title": "Olivovilo — gestion empresarial",
    "app.servicios.lead": "Plataforma SaaS de nomina, RRHH y gastos para empresas en Ecuador. En produccion.",
    "app.servicios.tab1": "Producto",
    "app.servicios.tab2": "Stack & Arquitectura",
    "app.servicios.tab3": "Seguridad & Infra",
    "app.servicios.p.title": "Que hace Olivovilo",
    "app.servicios.p.desc": "Plataforma todo-en-uno para gestionar nomina ecuatoriana, empleados, gastos y operaciones de negocio.",
    "app.servicios.p.bullets": `
      <li><b>Nomina ecuatoriana</b>: IESS (9.45% personal / 11.15% patronal), decimos 13ro y 14to, fondos de reserva, horas extra.</li>
      <li><b>Roles de pago</b>: generacion automatica con desglose de ingresos, egresos y neto a recibir.</li>
      <li><b>Empleados</b>: registro, contratos, departamentos, cargos y estados (activo, prueba, inactivo).</li>
      <li><b>Gastos</b>: categorias, estados de pago y reportes por periodo.</li>
      <li><b>Dashboard</b>: KPIs en tiempo real con graficos interactivos (Recharts).</li>
      <li><b>Multi-empresa</b>: cada cuenta puede gestionar varias empresas.</li>
      <li><b>3 planes</b>: Semilla ($15/mes), Olivo ($35/mes), Cosecha ($65/mes).</li>
    `,
    "app.servicios.s.title": "Stack & Arquitectura",
    "app.servicios.s.desc": "Decisiones tecnicas clave y por que se tomaron.",
    "app.servicios.s.bullets": `
      <li><b>Next.js 15</b> App Router: SSR/SSG, Server Actions, rendimiento y SEO optimizado.</li>
      <li><b>Supabase</b>: PostgreSQL + Auth + Storage. Row Level Security para aislamiento por empresa.</li>
      <li><b>Tailwind CSS + shadcn/ui</b>: sistema de diseño consistente con tema oklch personalizado.</li>
      <li><b>Vercel</b>: CI/CD automatico desde GitHub, preview por PR, Edge Functions.</li>
      <li><b>Recharts</b>: graficos interactivos para dashboard y reportes.</li>
    `,
    "app.servicios.i.title": "Seguridad & Infraestructura",
    "app.servicios.i.desc": "Configuracion de seguridad y despliegue.",
    "app.servicios.i.bullets": `
      <li><b>Cloudflare</b>: DNS, DNSSEC habilitado, Domain Lock (proteccion contra transferencia).</li>
      <li><b>Email</b>: Resend con dominio propio + DKIM, SPF y DMARC configurados.</li>
      <li><b>Supabase RLS</b>: cada query se filtra automaticamente por company_id a nivel de BD.</li>
      <li><b>HTTPS</b>: forzado en todo el dominio via Cloudflare + Vercel.</li>
      <li><b>Cookie consent</b>: banner de cookies esenciales con persistencia en localStorage.</li>
    `,

    "app.finanzas.title": "Floo — finanzas personales",
    "app.finanzas.lead": "App multi-moneda y multi-idioma para gestionar gastos e ingresos personales. En produccion.",
    "app.finanzas.tab1": "Producto",
    "app.finanzas.tab2": "Auth & Seguridad",
    "app.finanzas.tab3": "Stack & i18n",
    "app.finanzas.p.title": "Que hace Floo",
    "app.finanzas.p.desc": "App de finanzas personales con soporte multi-moneda (USD, EUR, etc.), multi-idioma (EN/ES/FR) e importacion CSV.",
    "app.finanzas.p.bullets": `
      <li><b>Multi-moneda</b>: USD, EUR y mas, con conversion automatica entre divisas.</li>
      <li><b>Multi-idioma</b>: interfaz completa en ingles, espanol y frances (next-intl).</li>
      <li><b>Transacciones</b>: gastos e ingresos con categorias, etiquetas y filtros.</li>
      <li><b>Importacion CSV</b>: carga masiva desde extractos bancarios de cualquier banco.</li>
      <li><b>Dashboard</b>: resumen financiero con graficos de tendencia y desglose por categoria.</li>
      <li><b>Insights</b>: score de salud financiera, patrones de gasto y recomendaciones.</li>
      <li><b>Onboarding</b>: flujo guiado que crea cuentas automaticamente al importar.</li>
    `,
    "app.finanzas.a.title": "Auth & Seguridad",
    "app.finanzas.a.desc": "Sistema de autenticacion propio con multiples capas de seguridad.",
    "app.finanzas.a.bullets": `
      <li><b>Auth propio</b>: no usa Supabase Auth — control total del flujo de registro y verificacion.</li>
      <li><b>Verificacion email</b>: codigo de 6 digitos hasheado con SHA-256 en BD. Expira en 1 hora.</li>
      <li><b>JWT + HttpOnly cookies</b>: proteccion contra XSS. Token firmado con secreto del servidor.</li>
      <li><b>Cloudflare Turnstile</b>: CAPTCHA invisible en registro (anti-bot).</li>
      <li><b>bcrypt</b>: hash de contrasenas con salt automatico.</li>
      <li><b>Rate limiting</b>: proteccion contra fuerza bruta en login.</li>
      <li><b>Honeypot</b>: campo oculto para detectar bots en formularios.</li>
    `,
    "app.finanzas.t.title": "Stack & Internacionalizacion",
    "app.finanzas.t.desc": "Arquitectura tecnica y sistema de idiomas automatico.",
    "app.finanzas.t.bullets": `
      <li><b>Next.js 15</b> App Router + API Routes: SSR para SEO, API para auth y datos.</li>
      <li><b>PostgreSQL</b> (Supabase): transacciones, cuentas, tokens — todo relacional.</li>
      <li><b>next-intl</b>: deteccion automatica del idioma via Accept-Language con q-values.</li>
      <li><b>Tema oscuro/claro</b>: toggle con persistencia en cookie, sin flash.</li>
      <li><b>Tailwind CSS + shadcn/ui</b>: componentes accesibles y responsive.</li>
      <li><b>Vercel</b>: deploy automatico, subdominio floo.olivovilo.com.</li>
    `
  },

  en: {
    brand: "Home",
    "nav.projects": "Projects",
    "nav.contact": "Contact",
    "nav.linkedin": "LinkedIn",
    "nav.cv": "CV",

    "hero.title": "Portfolio — Eric Noël",
    "hero.lead": "Real end-to-end case: PostgreSQL Data Warehouse and n8n orchestration. Public dashboard in progress. Plus two personal apps in the works.",
    "hero.note": "This portfolio includes personal projects, collaborations and client work. For full experience, roles and additional technologies, see my CV or LinkedIn (top).",
    "hero.quick.title": "At a glance",
    "hero.quick.1": "Dimensional modeling & DWH design (PostgreSQL / SQL Server) built for growth and performance.",
    "hero.quick.2": "Incremental ETL pipelines & orchestration (SQL, cron, n8n, Visual Studio/SSIS) with monitoring and retries.",
    "hero.quick.3": "Reporting & self-service: Power BI, Qlik, SAP BO; KPIs, comparisons and automation (NPrinting/SSRS).",
    "hero.quick.4": "Data governance: technical docs, traceability & audit; backups and operations on Windows/Linux.",
    "hero.quick.5": "Soft skills: analytical, autonomous, detail-oriented; partner with business and IT stakeholders.",

    "projects.title": "Projects",
    "card.bi.title": "BI End-to-End (3 stages)",
    "card.bi.desc": "PostgreSQL DWH → n8n orchestration → Dashboard (Power BI/Qlik). Data anonymized.",
    "card.bi.cta": "View stages",

    "card.servicios.title": "Olivovilo — business management",
    "card.servicios.desc": "Payroll, HR and expenses for Ecuador. Next.js + Supabase + Vercel.",
    "card.servicios.cta": "View project",

    "card.finanzas.title": "Floo — personal finance",
    "card.finanzas.desc": "Multi-currency, multi-language (EN/ES/FR). Next.js + PostgreSQL + Vercel.",
    "card.finanzas.cta": "View project",

    "contact.title": "Let’s talk",
    "contact.lead": "Tell me about your challenge. I usually reply the same day.",
    "contact.name": "Name",
    "contact.email": "Email",
    "contact.message": "Message",
    "contact.send": "Send",
    "contact.privacy": "Your message will be sent via email. No third-party storage.",

    "bi.title": "BI End-to-End",
    "bi.lead": "One project, three stages: PostgreSQL DWH → n8n orchestration → Dashboard.",
    "bi.tab1": "Stage 1 · DWH & ETL",
    "bi.tab2": "Stage 2 · Orchestration (n8n)",
    "bi.tab3": "Stage 3 · Dashboard",
    "bi.e1.title": "DWH & ETL (PostgreSQL)",
    "bi.e1.desc": "Controlled replication + stored procedures with step logging. Indexes + MVs for low latency.",
    "bi.e1.bullets": `
      <li><b>PostgreSQL</b>: robust, extensions (<code>dblink</code>) and <code>REFRESH MATERIALIZED VIEW CONCURRENTLY</code>.</li>
      <li><b>PL/pgSQL</b>: flow control + traceability (<code>dw_logs_procedures</code>).</li>
      <li><b>Indexes</b> by selectivity (dates, <code>businessId</code>, <code>customerId</code>).</li>
      <li><b>Alternatives</b>: SQL Server + SSIS (licensing), BigQuery (serverless, pay-per-query).</li>
    `,
    "bi.e2.title": "Orchestration (from cron to n8n)",
    "bi.e2.desc": "Replace cron with n8n: schedules, retries, notifications and visual audit.",
    "bi.e2.bullets": `
      <li><b>n8n</b>: visual UI, low cost, ready connectors.</li>
      <li><b>vs cron</b>: history, retries and alerts.</li>
      <li><b>Alternatives</b>: Airflow (powerful, more ops), SSIS (tied to SQL Server).</li>
    `,
    "bi.e3.title": "Dashboard",
    "bi.e3.desc": "KPIs, comparisons and filters over MVs (mv_ventas_dia/mes, mv_resumen_clientes_dia/mes). Data anonymized.",
    "bi.e3.bullets": `
      <li><b>Power BI / Qlik</b>: fast prototyping and strong ecosystem.</li>
      <li><b>Alternatives</b>: Superset (open source), Metabase (quick to start).</li>
      <li><b>Good practices</b>: date parameters and RLS when needed.</li>
    `,

    "app.servicios.title": "Olivovilo — business management",
    "app.servicios.lead": "SaaS payroll, HR and expense platform for companies in Ecuador. In production.",
    "app.servicios.tab1": "Product",
    "app.servicios.tab2": "Stack & Architecture",
    "app.servicios.tab3": "Security & Infra",
    "app.servicios.p.title": "What Olivovilo does",
    "app.servicios.p.desc": "All-in-one platform for Ecuadorian payroll, employees, expenses and business operations.",
    "app.servicios.p.bullets": `
      <li><b>Ecuadorian payroll</b>: IESS (9.45% employee / 11.15% employer), 13th & 14th salary, reserve funds, overtime.</li>
      <li><b>Pay stubs</b>: auto-generated with income, deductions and net pay breakdown.</li>
      <li><b>Employees</b>: registration, contracts, departments, positions and statuses.</li>
      <li><b>Expenses</b>: categories, payment statuses and period reports.</li>
      <li><b>Dashboard</b>: real-time KPIs with interactive charts (Recharts).</li>
      <li><b>Multi-company</b>: each account can manage multiple companies.</li>
      <li><b>3 plans</b>: Semilla ($15/mo), Olivo ($35/mo), Cosecha ($65/mo).</li>
    `,
    "app.servicios.s.title": "Stack & Architecture",
    "app.servicios.s.desc": "Key technical decisions and why they were made.",
    "app.servicios.s.bullets": `
      <li><b>Next.js 15</b> App Router: SSR/SSG, Server Actions, performance and optimized SEO.</li>
      <li><b>Supabase</b>: PostgreSQL + Auth + Storage. Row Level Security for per-company isolation.</li>
      <li><b>Tailwind CSS + shadcn/ui</b>: consistent design system with custom oklch theme.</li>
      <li><b>Vercel</b>: automatic CI/CD from GitHub, preview per PR, Edge Functions.</li>
      <li><b>Recharts</b>: interactive charts for dashboard and reports.</li>
    `,
    "app.servicios.i.title": "Security & Infrastructure",
    "app.servicios.i.desc": "Security configuration and deployment.",
    "app.servicios.i.bullets": `
      <li><b>Cloudflare</b>: DNS, DNSSEC enabled, Domain Lock (transfer protection).</li>
      <li><b>Email</b>: Resend with custom domain + DKIM, SPF and DMARC configured.</li>
      <li><b>Supabase RLS</b>: every query auto-filtered by company_id at DB level.</li>
      <li><b>HTTPS</b>: enforced across the entire domain via Cloudflare + Vercel.</li>
      <li><b>Cookie consent</b>: essential cookies banner with localStorage persistence.</li>
    `,

    "app.finanzas.title": "Floo — personal finance",
    "app.finanzas.lead": "Multi-currency and multi-language app for managing personal expenses and income. In production.",
    "app.finanzas.tab1": "Product",
    "app.finanzas.tab2": "Auth & Security",
    "app.finanzas.tab3": "Stack & i18n",
    "app.finanzas.p.title": "What Floo does",
    "app.finanzas.p.desc": "Personal finance app with multi-currency (USD, EUR, etc.), multi-language (EN/ES/FR) and CSV import.",
    "app.finanzas.p.bullets": `
      <li><b>Multi-currency</b>: USD, EUR and more, with automatic conversion between currencies.</li>
      <li><b>Multi-language</b>: full interface in English, Spanish and French (next-intl).</li>
      <li><b>Transactions</b>: expenses and income with categories, tags and filters.</li>
      <li><b>CSV import</b>: bulk upload from any bank statement.</li>
      <li><b>Dashboard</b>: financial summary with trend charts and category breakdown.</li>
      <li><b>Insights</b>: financial health score, spending patterns and recommendations.</li>
      <li><b>Onboarding</b>: guided flow that auto-creates accounts on import.</li>
    `,
    "app.finanzas.a.title": "Auth & Security",
    "app.finanzas.a.desc": "Custom authentication system with multiple security layers.",
    "app.finanzas.a.bullets": `
      <li><b>Custom auth</b>: not Supabase Auth — full control over registration and verification flow.</li>
      <li><b>Email verification</b>: 6-digit code hashed with SHA-256 in DB. Expires in 1 hour.</li>
      <li><b>JWT + HttpOnly cookies</b>: XSS protection. Server-signed token.</li>
      <li><b>Cloudflare Turnstile</b>: invisible CAPTCHA on registration (anti-bot).</li>
      <li><b>bcrypt</b>: password hashing with automatic salt.</li>
      <li><b>Rate limiting</b>: brute force protection on login.</li>
      <li><b>Honeypot</b>: hidden field to detect bots in forms.</li>
    `,
    "app.finanzas.t.title": "Stack & Internationalization",
    "app.finanzas.t.desc": "Technical architecture and automatic language system.",
    "app.finanzas.t.bullets": `
      <li><b>Next.js 15</b> App Router + API Routes: SSR for SEO, API for auth and data.</li>
      <li><b>PostgreSQL</b> (Supabase): transactions, accounts, tokens — fully relational.</li>
      <li><b>next-intl</b>: automatic language detection via Accept-Language with q-values.</li>
      <li><b>Dark/light theme</b>: toggle with cookie persistence, no flash.</li>
      <li><b>Tailwind CSS + shadcn/ui</b>: accessible and responsive components.</li>
      <li><b>Vercel</b>: automatic deploy, subdomain floo.olivovilo.com.</li>
    `
  },

  fr: {
    brand: "Accueil",
    "nav.projects": "Projets",
    "nav.contact": "Contact",
    "nav.linkedin": "LinkedIn",
    "nav.cv": "CV",

    "hero.title": "Portfolio BI — Eric Noël",
    "hero.lead": "Cas réel de bout en bout : Data Warehouse PostgreSQL et orchestration n8n. Dashboard public en préparation. Deux applis perso en cours.",
    "hero.note": "Ce portfolio regroupe des projets personnels, des collaborations et des missions client. Pour l’expérience complète et d’autres technologies, consultez mon CV ou LinkedIn (en haut).",
    "hero.quick.title": "En bref",
    "hero.quick.1": "Modélisation dimensionnelle & DWH (PostgreSQL / SQL Server) pensés pour la performance et la croissance.",
    "hero.quick.2": "Pipelines ETL incrémentiels & orchestration (SQL, cron, n8n, Visual Studio/SSIS) avec suivi et relances.",
    "hero.quick.3": "Reporting & self-service : Power BI, Qlik, SAP BO ; KPI, comparatifs et automatisation (NPrinting/SSRS).",
    "hero.quick.4": "Gouvernance des données : documentation, traçabilité & audit ; sauvegardes et exploitation Windows/Linux.",
    "hero.quick.5": "Soft skills : analyse, autonomie, rigueur & priorisation ; collaboration métiers/IT.",

    "projects.title": "Projets",
    "card.bi.title": "BI End-to-End (3 étapes)",
    "card.bi.desc": "DWH PostgreSQL → orchestration n8n → dashboard (Power BI/Qlik). Données anonymisées.",
    "card.bi.cta": "Voir les étapes",

    "card.servicios.title": "Olivovilo — gestion d'entreprise",
    "card.servicios.desc": "Paie, RH et depenses pour l'Equateur. Next.js + Supabase + Vercel.",
    "card.servicios.cta": "Voir le projet",

    "card.finanzas.title": "Floo — finances personnelles",
    "card.finanzas.desc": "Multi-devises, multilingue (EN/ES/FR). Next.js + PostgreSQL + Vercel.",
    "card.finanzas.cta": "Voir le projet",

    "contact.title": "Échangeons",
    "contact.lead": "Parlez-moi de votre besoin. Je réponds généralement le jour même.",
    "contact.name": "Nom",
    "contact.email": "Email",
    "contact.message": "Message",
    "contact.send": "Envoyer",
    "contact.privacy": "Votre message sera envoyé par email. Aucune donnée n’est stockée chez des tiers.",

    "bi.title": "BI End-to-End",
    "bi.lead": "Un projet, trois étapes : DWH PostgreSQL → orchestration n8n → dashboard.",
    "bi.tab1": "Étape 1 · DWH & ETL",
    "bi.tab2": "Étape 2 · Orchestration (n8n)",
    "bi.tab3": "Étape 3 · Dashboard",
    "bi.e1.title": "DWH & ETL (PostgreSQL)",
    "bi.e1.desc": "Réplication contrôlée + procédures stockées avec logs par étape. Index + vues matérialisées.",
    "bi.e1.bullets": `
      <li><b>PostgreSQL</b> : robuste, extensions (<code>dblink</code>) et <code>REFRESH MATERIALIZED VIEW CONCURRENTLY</code>.</li>
      <li><b>PL/pgSQL</b> : contrôle du flux + traçabilité (<code>dw_logs_procedures</code>).</li>
      <li><b>Index</b> selon la sélectivité (dates, <code>businessId</code>, <code>customerId</code>).</li>
      <li><b>Alternatives</b> : SQL Server + SSIS (licences), BigQuery (serverless, facturation à la requête).</li>
    `,
    "bi.e2.title": "Orchestration (de cron à n8n)",
    "bi.e2.desc": "Remplacer cron par n8n : planification, relances, notifications et audit visuel.",
    "bi.e2.bullets": `
      <li><b>n8n</b> : UI visuelle, coût réduit, connecteurs prêts.</li>
      <li><b>vs cron</b> : historique, relances et alertes.</li>
      <li><b>Alternatives</b> : Airflow (puissant mais plus lourd), SSIS (lié à SQL Server).</li>
    `,
    "bi.e3.title": "Dashboard",
    "bi.e3.desc": "KPI, comparatifs et filtres sur des vues matérialisées. Données anonymisées.",
    "bi.e3.bullets": `
      <li><b>Power BI / Qlik</b> : prototypage rapide, écosystème riche.</li>
      <li><b>Alternatives</b> : Superset (open-source), Metabase (démarrage rapide).</li>
      <li><b>Bonnes pratiques</b> : paramètres de date et RLS si nécessaire.</li>
    `,

    "app.servicios.title": "Olivovilo — gestion d’entreprise",
    "app.servicios.lead": "Plateforme SaaS de paie, RH et depenses pour les entreprises en Equateur. En production.",
    "app.servicios.tab1": "Produit",
    "app.servicios.tab2": "Stack & Architecture",
    "app.servicios.tab3": "Securite & Infra",
    "app.servicios.p.title": "Ce que fait Olivovilo",
    "app.servicios.p.desc": "Plateforme tout-en-un pour la paie equatorienne, les employes, les depenses et les operations.",
    "app.servicios.p.bullets": `
      <li><b>Paie equatorienne</b> : IESS (9,45% employe / 11,15% employeur), 13e & 14e salaire, fonds de reserve, heures sup.</li>
      <li><b>Fiches de paie</b> : generation automatique avec detail des revenus, deductions et net a percevoir.</li>
      <li><b>Employes</b> : inscription, contrats, departements, postes et statuts.</li>
      <li><b>Depenses</b> : categories, statuts de paiement et rapports par periode.</li>
      <li><b>Dashboard</b> : KPIs en temps reel avec graphiques interactifs (Recharts).</li>
      <li><b>Multi-entreprise</b> : chaque compte peut gerer plusieurs entreprises.</li>
      <li><b>3 plans</b> : Semilla (15$/mois), Olivo (35$/mois), Cosecha (65$/mois).</li>
    `,
    "app.servicios.s.title": "Stack & Architecture",
    "app.servicios.s.desc": "Decisions techniques cles et leurs justifications.",
    "app.servicios.s.bullets": `
      <li><b>Next.js 15</b> App Router : SSR/SSG, Server Actions, performance et SEO optimise.</li>
      <li><b>Supabase</b> : PostgreSQL + Auth + Storage. Row Level Security pour l’isolation par entreprise.</li>
      <li><b>Tailwind CSS + shadcn/ui</b> : systeme de design coherent avec theme oklch personnalise.</li>
      <li><b>Vercel</b> : CI/CD automatique depuis GitHub, preview par PR, Edge Functions.</li>
      <li><b>Recharts</b> : graphiques interactifs pour le dashboard et les rapports.</li>
    `,
    "app.servicios.i.title": "Securite & Infrastructure",
    "app.servicios.i.desc": "Configuration de securite et deploiement.",
    "app.servicios.i.bullets": `
      <li><b>Cloudflare</b> : DNS, DNSSEC active, Domain Lock (protection contre le transfert).</li>
      <li><b>Email</b> : Resend avec domaine propre + DKIM, SPF et DMARC configures.</li>
      <li><b>Supabase RLS</b> : chaque requete filtree automatiquement par company_id au niveau BD.</li>
      <li><b>HTTPS</b> : force sur tout le domaine via Cloudflare + Vercel.</li>
      <li><b>Cookie consent</b> : banniere de cookies essentiels avec persistance localStorage.</li>
    `,

    "app.finanzas.title": "Floo — finances personnelles",
    "app.finanzas.lead": "App multi-devises et multilingue pour gerer les depenses et revenus personnels. En production.",
    "app.finanzas.tab1": "Produit",
    "app.finanzas.tab2": "Auth & Securite",
    "app.finanzas.tab3": "Stack & i18n",
    "app.finanzas.p.title": "Ce que fait Floo",
    "app.finanzas.p.desc": "App de finances personnelles avec multi-devises (USD, EUR, etc.), multilingue (EN/ES/FR) et import CSV.",
    "app.finanzas.p.bullets": `
      <li><b>Multi-devises</b> : USD, EUR et plus, avec conversion automatique entre devises.</li>
      <li><b>Multilingue</b> : interface complete en anglais, espagnol et francais (next-intl).</li>
      <li><b>Transactions</b> : depenses et revenus avec categories, etiquettes et filtres.</li>
      <li><b>Import CSV</b> : chargement en masse depuis des releves bancaires de n’importe quelle banque.</li>
      <li><b>Dashboard</b> : resume financier avec graphiques de tendance et repartition par categorie.</li>
      <li><b>Insights</b> : score de sante financiere, habitudes de depenses et recommandations.</li>
      <li><b>Onboarding</b> : parcours guide qui cree automatiquement les comptes a l’import.</li>
    `,
    "app.finanzas.a.title": "Auth & Securite",
    "app.finanzas.a.desc": "Systeme d’authentification personnalise avec plusieurs couches de securite.",
    "app.finanzas.a.bullets": `
      <li><b>Auth personnalise</b> : pas Supabase Auth — controle total du flux d’inscription et de verification.</li>
      <li><b>Verification email</b> : code a 6 chiffres hashe SHA-256 en BD. Expire en 1 heure.</li>
      <li><b>JWT + cookies HttpOnly</b> : protection XSS. Token signe cote serveur.</li>
      <li><b>Cloudflare Turnstile</b> : CAPTCHA invisible a l’inscription (anti-bot).</li>
      <li><b>bcrypt</b> : hashage des mots de passe avec salt automatique.</li>
      <li><b>Rate limiting</b> : protection contre la force brute au login.</li>
      <li><b>Honeypot</b> : champ cache pour detecter les bots dans les formulaires.</li>
    `,
    "app.finanzas.t.title": "Stack & Internationalisation",
    "app.finanzas.t.desc": "Architecture technique et systeme de langues automatique.",
    "app.finanzas.t.bullets": `
      <li><b>Next.js 15</b> App Router + API Routes : SSR pour le SEO, API pour l’auth et les donnees.</li>
      <li><b>PostgreSQL</b> (Supabase) : transactions, comptes, tokens — entierement relationnel.</li>
      <li><b>next-intl</b> : detection automatique de la langue via Accept-Language avec q-values.</li>
      <li><b>Theme sombre/clair</b> : bascule avec persistance cookie, sans flash.</li>
      <li><b>Tailwind CSS + shadcn/ui</b> : composants accessibles et responsifs.</li>
      <li><b>Vercel</b> : deploy automatique, sous-domaine floo.olivovilo.com.</li>
    `
  }
};

function applyI18n(lang){
  const dict = t[lang] || t.es;
  document.documentElement.lang = lang;

  // texto plano
  document.querySelectorAll('[data-i18n]').forEach(el=>{
    const key = el.getAttribute('data-i18n');
    if (dict[key]) el.textContent = dict[key];
  });
  // html (listas, etc.)
  document.querySelectorAll('[data-i18n-html]').forEach(el=>{
    const key = el.getAttribute('data-i18n-html');
    if (dict[key]) el.innerHTML = dict[key];
  });

  localStorage.setItem('lang', lang);
}

document.addEventListener('DOMContentLoaded', () => {
  const select = document.getElementById('lang');
  const saved = localStorage.getItem('lang') || 'es';
  if (select){ select.value = saved; select.addEventListener('change', e=>applyI18n(e.target.value)); }
  applyI18n(saved);
});

// ===== Formulario (mailto por defecto) =====
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  if (!form) return;
  form.addEventListener('submit', async (e)=>{
    e.preventDefault();
    const fd = new FormData(form);
    const name = fd.get('name'); const email = fd.get('email'); const message = fd.get('message');
    const msg = document.getElementById('formMsg');

    try{
      if (window.FORM_ENDPOINT){
        const res = await fetch(window.FORM_ENDPOINT, { method:'POST', headers:{'Accept':'application/json'}, body: fd });
        if(!res.ok) throw new Error('HTTP '+res.status);
        msg.textContent = localize('form.ok'); form.reset();
      }else{
        const subject = encodeURIComponent(`[Portafolio] ${name}`);
        const body = encodeURIComponent(`${message}\n\n— ${name} <${email}>`);
        window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
        msg.textContent = localize('form.mail');
      }
    }catch(err){ msg.textContent = localize('form.err'); }
  });
});

function localize(key){
  const lang = localStorage.getItem('lang') || 'es';
  const map = {
    es:{'form.ok':'¡Gracias! Te escribo pronto.','form.mail':'Abriendo tu cliente de correo…','form.err':'Ups, no se pudo enviar.'},
    en:{'form.ok':'Thanks! I’ll get back to you soon.','form.mail':'Opening your mail client…','form.err':'Oops, the message could not be sent.'},
    fr:{'form.ok':'Merci ! Je vous réponds bientôt.','form.mail':'Ouverture de votre client mail…','form.err':'Oups, envoi impossible.'}
  };
  return (map[lang] && map[lang][key]) || map.es[key];
}
