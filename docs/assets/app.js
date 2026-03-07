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
    if(document.body.getAttribute('data-page')==='bi') initTabs(document);
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
    "app.servicios.stack": "Stack tecnologico",
    "app.servicios.stack.bullets": `
      <li><b>Frontend</b>: TypeScript + Next.js 15 (App Router, SSR/SSG) · Tailwind CSS · shadcn/ui.</li>
      <li><b>Backend</b>: Supabase (PostgreSQL + Auth + RLS) · Server Actions.</li>
      <li><b>Deploy</b>: Vercel (CI/CD automatico desde GitHub).</li>
      <li><b>Email</b>: Resend con dominio propio y DKIM/SPF/DMARC.</li>
      <li><b>Seguridad</b>: Cloudflare DNS + DNSSEC · Domain Lock.</li>
    `,
    "app.servicios.features": "Funcionalidades principales",
    "app.servicios.features.bullets": `
      <li><b>Nomina ecuatoriana</b>: calculo automatico de IESS, decimos, fondos de reserva, horas extra y anticipos.</li>
      <li><b>Roles de pago</b>: generacion de roles con desglose completo y estados de pago.</li>
      <li><b>Gestion de empleados</b>: registro, contratos, departamentos y cargos.</li>
      <li><b>Gastos empresariales</b>: seguimiento con categorias, estados y reportes.</li>
      <li><b>Dashboard</b>: metricas en tiempo real con graficos interactivos (Recharts).</li>
      <li><b>Multi-empresa</b>: soporte para multiples empresas por cuenta.</li>
      <li><b>Landing publica</b>: pagina de marketing con planes, FAQ, changelog y seccion legal.</li>
    `,
    "app.servicios.why": "Decisiones de arquitectura",
    "app.servicios.why.bullets": `
      <li>Next.js App Router para rendimiento y SEO optimizado.</li>
      <li>Supabase RLS para aislamiento de datos por empresa desde la base de datos.</li>
      <li>Vercel para deploys automaticos con preview por PR.</li>
      <li>Dominio propio con configuracion DNS completa (DKIM, SPF, DMARC, DNSSEC).</li>
    `,
    "app.servicios.note": "Proyecto en produccion. Algunas funcionalidades estan en desarrollo continuo.",

    "app.finanzas.title": "Floo — finanzas personales",
    "app.finanzas.lead": "App multi-moneda y multi-idioma para gestionar gastos e ingresos personales. En produccion.",
    "app.finanzas.stack": "Stack tecnologico",
    "app.finanzas.stack.bullets": `
      <li><b>Frontend</b>: TypeScript + Next.js 15 (App Router) · Tailwind CSS · shadcn/ui.</li>
      <li><b>Backend</b>: PostgreSQL (Supabase) · API Routes · JWT con cookies HttpOnly.</li>
      <li><b>Auth</b>: registro con email + verificacion por codigo de 6 digitos · reset de contrasena.</li>
      <li><b>Deploy</b>: Vercel · dominio personalizado bajo olivovilo.com.</li>
      <li><b>Seguridad</b>: Cloudflare Turnstile (CAPTCHA) · bcrypt · rate limiting · honeypot.</li>
    `,
    "app.finanzas.features": "Funcionalidades principales",
    "app.finanzas.features.bullets": `
      <li><b>Multi-moneda</b>: soporte para USD, EUR y mas, con conversion automatica.</li>
      <li><b>Multi-idioma</b>: interfaz completa en ingles, espanol y frances (next-intl).</li>
      <li><b>Transacciones</b>: registro de gastos e ingresos con categorias y etiquetas.</li>
      <li><b>Importacion CSV</b>: carga masiva de transacciones desde extractos bancarios.</li>
      <li><b>Dashboard</b>: resumen financiero con graficos y tendencias.</li>
      <li><b>Insights</b>: analisis de patrones de gasto y salud financiera.</li>
      <li><b>Onboarding</b>: flujo guiado para nuevos usuarios con creacion automatica de cuentas.</li>
      <li><b>Tema oscuro/claro</b>: toggle de tema con persistencia.</li>
    `,
    "app.finanzas.why": "Decisiones de arquitectura",
    "app.finanzas.why.bullets": `
      <li>Auth propio (no Supabase Auth) para control total del flujo de verificacion.</li>
      <li>JWT en cookies HttpOnly para seguridad contra XSS.</li>
      <li>next-intl con deteccion automatica del idioma del navegador (Accept-Language con q-values).</li>
      <li>Tokens SHA-256 hasheados en BD para verificacion de email segura.</li>
    `,
    "app.finanzas.note": "Proyecto en produccion. Nuevas funcionalidades en desarrollo continuo."
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
    "app.servicios.lead": "SaaS platform for payroll, HR and expenses for companies in Ecuador. In production.",
    "app.servicios.stack": "Tech stack",
    "app.servicios.stack.bullets": `
      <li><b>Frontend</b>: TypeScript + Next.js 15 (App Router, SSR/SSG) · Tailwind CSS · shadcn/ui.</li>
      <li><b>Backend</b>: Supabase (PostgreSQL + Auth + RLS) · Server Actions.</li>
      <li><b>Deploy</b>: Vercel (automatic CI/CD from GitHub).</li>
      <li><b>Email</b>: Resend with custom domain and DKIM/SPF/DMARC.</li>
      <li><b>Security</b>: Cloudflare DNS + DNSSEC · Domain Lock.</li>
    `,
    "app.servicios.features": "Key features",
    "app.servicios.features.bullets": `
      <li><b>Ecuadorian payroll</b>: automatic calculation of social security (IESS), bonuses, reserve funds, overtime and advances.</li>
      <li><b>Pay stubs</b>: generation with full breakdown and payment status tracking.</li>
      <li><b>Employee management</b>: registration, contracts, departments and positions.</li>
      <li><b>Business expenses</b>: tracking with categories, statuses and reports.</li>
      <li><b>Dashboard</b>: real-time metrics with interactive charts (Recharts).</li>
      <li><b>Multi-company</b>: support for multiple companies per account.</li>
      <li><b>Public landing</b>: marketing page with plans, FAQ, changelog and legal section.</li>
    `,
    "app.servicios.why": "Architecture decisions",
    "app.servicios.why.bullets": `
      <li>Next.js App Router for performance and optimized SEO.</li>
      <li>Supabase RLS for data isolation per company at the database level.</li>
      <li>Vercel for automatic deploys with preview per PR.</li>
      <li>Custom domain with full DNS configuration (DKIM, SPF, DMARC, DNSSEC).</li>
    `,
    "app.servicios.note": "In production. Some features are under continuous development.",

    "app.finanzas.title": "Floo — personal finance",
    "app.finanzas.lead": "Multi-currency and multi-language app for managing personal expenses and income. In production.",
    "app.finanzas.stack": "Tech stack",
    "app.finanzas.stack.bullets": `
      <li><b>Frontend</b>: TypeScript + Next.js 15 (App Router) · Tailwind CSS · shadcn/ui.</li>
      <li><b>Backend</b>: PostgreSQL (Supabase) · API Routes · JWT with HttpOnly cookies.</li>
      <li><b>Auth</b>: email registration + 6-digit code verification · password reset.</li>
      <li><b>Deploy</b>: Vercel · custom subdomain under olivovilo.com.</li>
      <li><b>Security</b>: Cloudflare Turnstile (CAPTCHA) · bcrypt · rate limiting · honeypot.</li>
    `,
    "app.finanzas.features": "Key features",
    "app.finanzas.features.bullets": `
      <li><b>Multi-currency</b>: support for USD, EUR and more, with automatic conversion.</li>
      <li><b>Multi-language</b>: full interface in English, Spanish and French (next-intl).</li>
      <li><b>Transactions</b>: expense and income tracking with categories and tags.</li>
      <li><b>CSV import</b>: bulk upload from bank statements.</li>
      <li><b>Dashboard</b>: financial summary with charts and trends.</li>
      <li><b>Insights</b>: spending pattern analysis and financial health score.</li>
      <li><b>Onboarding</b>: guided flow for new users with automatic account creation.</li>
      <li><b>Dark/light theme</b>: theme toggle with persistence.</li>
    `,
    "app.finanzas.why": "Architecture decisions",
    "app.finanzas.why.bullets": `
      <li>Custom auth (not Supabase Auth) for full control over verification flow.</li>
      <li>JWT in HttpOnly cookies for XSS protection.</li>
      <li>next-intl with automatic browser language detection (Accept-Language with q-values).</li>
      <li>SHA-256 hashed tokens in DB for secure email verification.</li>
    `,
    "app.finanzas.note": "In production. New features under continuous development."
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
    "app.servicios.stack": "Stack technique",
    "app.servicios.stack.bullets": `
      <li><b>Frontend</b> : TypeScript + Next.js 15 (App Router, SSR/SSG) · Tailwind CSS · shadcn/ui.</li>
      <li><b>Backend</b> : Supabase (PostgreSQL + Auth + RLS) · Server Actions.</li>
      <li><b>Deploy</b> : Vercel (CI/CD automatique depuis GitHub).</li>
      <li><b>Email</b> : Resend avec domaine propre et DKIM/SPF/DMARC.</li>
      <li><b>Securite</b> : Cloudflare DNS + DNSSEC · Domain Lock.</li>
    `,
    "app.servicios.features": "Fonctionnalites principales",
    "app.servicios.features.bullets": `
      <li><b>Paie equatorienne</b> : calcul automatique des cotisations (IESS), primes, fonds de reserve, heures sup et avances.</li>
      <li><b>Fiches de paie</b> : generation avec detail complet et suivi du statut de paiement.</li>
      <li><b>Gestion des employes</b> : inscription, contrats, departements et postes.</li>
      <li><b>Depenses entreprise</b> : suivi par categories, statuts et rapports.</li>
      <li><b>Dashboard</b> : metriques en temps reel avec graphiques interactifs (Recharts).</li>
      <li><b>Multi-entreprise</b> : support de plusieurs entreprises par compte.</li>
      <li><b>Landing publique</b> : page marketing avec plans, FAQ, changelog et section legale.</li>
    `,
    "app.servicios.why": "Decisions d’architecture",
    "app.servicios.why.bullets": `
      <li>Next.js App Router pour la performance et le SEO optimise.</li>
      <li>Supabase RLS pour l’isolation des donnees par entreprise au niveau base de donnees.</li>
      <li>Vercel pour des deploys automatiques avec preview par PR.</li>
      <li>Domaine propre avec configuration DNS complete (DKIM, SPF, DMARC, DNSSEC).</li>
    `,
    "app.servicios.note": "En production. Certaines fonctionnalites sont en developpement continu.",

    "app.finanzas.title": "Floo — finances personnelles",
    "app.finanzas.lead": "App multi-devises et multilingue pour gerer les depenses et revenus personnels. En production.",
    "app.finanzas.stack": "Stack technique",
    "app.finanzas.stack.bullets": `
      <li><b>Frontend</b> : TypeScript + Next.js 15 (App Router) · Tailwind CSS · shadcn/ui.</li>
      <li><b>Backend</b> : PostgreSQL (Supabase) · API Routes · JWT avec cookies HttpOnly.</li>
      <li><b>Auth</b> : inscription par email + verification par code a 6 chiffres · reinitialisation du mot de passe.</li>
      <li><b>Deploy</b> : Vercel · sous-domaine personnalise sous olivovilo.com.</li>
      <li><b>Securite</b> : Cloudflare Turnstile (CAPTCHA) · bcrypt · rate limiting · honeypot.</li>
    `,
    "app.finanzas.features": "Fonctionnalites principales",
    "app.finanzas.features.bullets": `
      <li><b>Multi-devises</b> : support USD, EUR et plus, avec conversion automatique.</li>
      <li><b>Multilingue</b> : interface complete en anglais, espagnol et francais (next-intl).</li>
      <li><b>Transactions</b> : suivi des depenses et revenus avec categories et etiquettes.</li>
      <li><b>Import CSV</b> : chargement en masse depuis des releves bancaires.</li>
      <li><b>Dashboard</b> : resume financier avec graphiques et tendances.</li>
      <li><b>Insights</b> : analyse des habitudes de depenses et score de sante financiere.</li>
      <li><b>Onboarding</b> : parcours guide pour les nouveaux utilisateurs avec creation automatique de comptes.</li>
      <li><b>Theme sombre/clair</b> : bascule de theme avec persistance.</li>
    `,
    "app.finanzas.why": "Decisions d’architecture",
    "app.finanzas.why.bullets": `
      <li>Auth personnalise (pas Supabase Auth) pour un controle total du flux de verification.</li>
      <li>JWT dans des cookies HttpOnly pour la protection contre les XSS.</li>
      <li>next-intl avec detection automatique de la langue du navigateur (Accept-Language avec q-values).</li>
      <li>Tokens hashes SHA-256 en base pour une verification d’email securisee.</li>
    `,
    "app.finanzas.note": "En production. Nouvelles fonctionnalites en developpement continu."
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
