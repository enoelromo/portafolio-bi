// ===== Configura tu email aquí =====
const CONTACT_EMAIL = "enoelromo@gmail.com"; // <-- cámbialo
// Si quieres enviar sin abrir el cliente de correo, pon un endpoint de Formspree:
// window.FORM_ENDPOINT = "https://formspree.io/f/XXXXXXXX";

// ===== Año en footer =====
document.addEventListener('DOMContentLoaded', () => {
  const y = document.getElementById('y');
  if (y) y.textContent = new Date().getFullYear();
});

// ===== Carruseles =====
function initCarousel(el){
  const slides=el.querySelector('.slides'); if(!slides) return;
  const imgs=slides.querySelectorAll('img'); let i=0;
  const go=n=>{ i=(n+imgs.length)%imgs.length; slides.style.transform=`translateX(-${i*100}%)`; };
  el.querySelector('.prev')?.addEventListener('click',()=>go(i-1));
  el.querySelector('.next')?.addEventListener('click',()=>go(i+1));
  if(el.dataset.autoplay==='true') setInterval(()=>go(i+1),4000);
}
document.querySelectorAll('.carousel').forEach(initCarousel);

// ===== Tabs (pestañas) =====
function initTabs(root){
  const tabs=[...root.querySelectorAll('.tab')];
  const panels=[...root.querySelectorAll('.panel')];
  const activate=(id)=>{
    tabs.forEach(t=>t.classList.toggle('active', t.dataset.target===id));
    panels.forEach(p=>p.classList.toggle('active', '#'+p.id===id));
    history.replaceState(null,'',id);
  };
  tabs.forEach(t=>t.addEventListener('click',()=>activate(t.dataset.target)));
  const initial = (location.hash && panels.some(p=>('#'+p.id)===location.hash)) ? location.hash : tabs[0]?.dataset.target;
  if(initial) activate(initial);
}
document.querySelectorAll('[data-tabs]').forEach(initTabs);

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
    "hero.quick.1": "Modelado y replicación selectiva con PL/pgSQL + logging paso a paso.",
    "hero.quick.2": "Rendimiento: índices compuestos y vistas materializadas concurrentes (ETL < 5 s/mes).",
    "hero.quick.3": "Orquestación: migración de cron a n8n con reintentos, alertas y auditoría visual.",
    "hero.quick.4": "Dashboard: KPIs y comparativos; versión pública en preparación.",

    "projects.title": "Proyectos",
    "card.bi.title": "BI End-to-End (3 etapas)",
    "card.bi.desc": "DWH en PostgreSQL → Orquestación en n8n → Dashboard (Power BI/Qlik). Datos anonimizados.",
    "card.bi.cta": "Ver etapas",

    "card.servicios.title": "Servicios — plataforma web",
    "card.servicios.desc": "MVP con Next.js + Supabase + PWA. (En preparación)",
    "card.servicios.cta": "Ver avance",

    "card.finanzas.title": "Finanzas — gastos/ingresos unificados",
    "card.finanzas.desc": "Python + FastAPI + PostgreSQL + ETL PDF/OCR. (En preparación)",
    "card.finanzas.cta": "Ver avance",

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
      <li><b>PostgreSQL</b>: robusto, extensiones (<code>dblink</code>), <code>REFRESH MATERIALIZED VIEW CONCURRENTLY</code>.</li>
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

    /* Apps */
    "app.servicios.title": "Servicios — plataforma web",
    "app.servicios.lead": "MVP centrado en agilidad y seguridad: Next.js + Supabase + PWA.",
    "app.servicios.stack": "Stack inicial",
    "app.servicios.stack.bullets": `
      <li><b>Frontend</b>: TypeScript + Next.js (SSR/SSG) · PWA.</li>
      <li><b>Datos</b>: Supabase (Postgres + Auth + RLS) · Storage.</li>
      <li><b>Comms</b>: Email (Resend/SendGrid) · Telegram · (futuro) WhatsApp API.</li>
      <li><b>Pagos</b>: (futuro) Stripe suscripciones.</li>
      <li><b>Automatización</b>: n8n en VPS.</li>
    `,
    "app.servicios.why": "¿Por qué así?",
    "app.servicios.why.bullets": `
      <li>Mover rápido sin perder base: server + DB + auth listos.</li>
      <li>Coste bajo al inicio, escalable después.</li>
      <li>RLS para privacidad desde el día 1.</li>
    `,
    "app.servicios.note": "En evolución: el alcance puede ajustarse sin revelar ideas clave.",

    "app.finanzas.title": "Finanzas — gastos/ingresos unificados",
    "app.finanzas.lead": "Backend en Python para ingesta PDF/OCR, normalización y API.",
    "app.finanzas.stack": "Stack inicial",
    "app.finanzas.stack.bullets": `
      <li><b>Backend</b>: Python + FastAPI · Uvicorn.</li>
      <li><b>Datos</b>: PostgreSQL · SQLAlchemy + Alembic.</li>
      <li><b>ETL</b>: pdfplumber/Camelot/PyMuPDF (+ Tesseract si OCR).</li>
      <li><b>Jobs</b>: Celery/RQ + Redis (según volumen).</li>
      <li><b>BI</b>: Superset/Metabase + vistas materializadas.</li>
    `,
    "app.finanzas.why": "¿Por qué así?",
    "app.finanzas.why.bullets": `
      <li>Python facilita parsing y normalización compleja.</li>
      <li>FastAPI es rápido y bien tipado.</li>
      <li>Postgres prepara analítica sin sobre-ingeniería.</li>
    `,
    "app.finanzas.note": "En evolución: enfoque en herramientas, no en la idea."
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
    "hero.quick.1": "Modeling & selective replication with PL/pgSQL + step-by-step logging.",
    "hero.quick.2": "Performance: composite indexes & concurrent MVs (ETL < 5 s/month).",
    "hero.quick.3": "Orchestration: from cron to n8n with retries, alerts and visual audit.",
    "hero.quick.4": "Dashboard: KPIs & comparisons; public version in progress.",

    "projects.title": "Projects",
    "card.bi.title": "BI End-to-End (3 stages)",
    "card.bi.desc": "PostgreSQL DWH → n8n orchestration → Dashboard (Power BI/Qlik). Data anonymized.",
    "card.bi.cta": "View stages",

    "card.servicios.title": "Services — web platform",
    "card.servicios.desc": "MVP with Next.js + Supabase + PWA. (In progress)",
    "card.servicios.cta": "Preview",

    "card.finanzas.title": "Finance — unified expenses/income",
    "card.finanzas.desc": "Python + FastAPI + PostgreSQL + PDF/OCR ETL. (In progress)",
    "card.finanzas.cta": "Preview",

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
      <li><b>PostgreSQL</b>: robust, extensions (<code>dblink</code>), <code>REFRESH MATERIALIZED VIEW CONCURRENTLY</code>.</li>
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

    "app.servicios.title": "Services — web platform",
    "app.servicios.lead": "MVP focused on speed and security: Next.js + Supabase + PWA.",
    "app.servicios.stack": "Initial stack",
    "app.servicios.stack.bullets": `
      <li><b>Frontend</b>: TypeScript + Next.js (SSR/SSG) · PWA.</li>
      <li><b>Data</b>: Supabase (Postgres + Auth + RLS) · Storage.</li>
      <li><b>Comms</b>: Email (Resend/SendGrid) · Telegram · (later) WhatsApp API.</li>
      <li><b>Payments</b>: (later) Stripe subscriptions.</li>
      <li><b>Automation</b>: n8n on a VPS.</li>
    `,
    "app.servicios.why": "Why this?",
    "app.servicios.why.bullets": `
      <li>Ship fast without losing a solid base.</li>
      <li>Low initial cost, scalable later.</li>
      <li>RLS: privacy from day one.</li>
    `,
    "app.servicios.note": "Evolving: scope may change without revealing key ideas.",

    "app.finanzas.title": "Finance — unified expenses/income",
    "app.finanzas.lead": "Python backend for PDF/OCR ingestion, normalization and API.",
    "app.finanzas.stack": "Initial stack",
    "app.finanzas.stack.bullets": `
      <li><b>Backend</b>: Python + FastAPI · Uvicorn.</li>
      <li><b>Data</b>: PostgreSQL · SQLAlchemy + Alembic.</li>
      <li><b>ETL</b>: pdfplumber/Camelot/PyMuPDF (+ Tesseract if OCR needed).</li>
      <li><b>Jobs</b>: Celery/RQ + Redis (as volume grows).</li>
      <li><b>BI</b>: Superset/Metabase + materialized views.</li>
    `,
    "app.finanzas.why": "Why this?",
    "app.finanzas.why.bullets": `
      <li>Python simplifies parsing and normalization.</li>
      <li>FastAPI is fast and strongly typed.</li>
      <li>Postgres enables analytics without over-engineering.</li>
    `,
    "app.finanzas.note": "Evolving: focus on tools, not on the idea."
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
    "hero.quick.1": "Modélisation & réplication sélective avec PL/pgSQL + logs étape par étape.",
    "hero.quick.2": "Performance : index composés & vues matérialisées concurrentes (ETL < 5 s/mois).",
    "hero.quick.3": "Orchestration : de cron à n8n avec relances, alertes et audit visuel.",
    "hero.quick.4": "Dashboard : KPI & comparatifs ; version publique en préparation.",

    "projects.title": "Projets",
    "card.bi.title": "BI End-to-End (3 étapes)",
    "card.bi.desc": "DWH PostgreSQL → orchestration n8n → dashboard (Power BI/Qlik). Données anonymisées.",
    "card.bi.cta": "Voir les étapes",

    "card.servicios.title": "Services — plateforme web",
    "card.servicios.desc": "MVP avec Next.js + Supabase + PWA. (En préparation)",
    "card.servicios.cta": "Aperçu",

    "card.finanzas.title": "Finance — dépenses/recettes unifiées",
    "card.finanzas.desc": "Python + FastAPI + PostgreSQL + ETL PDF/OCR. (En préparation)",
    "card.finanzas.cta": "Aperçu",

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
      <li><b>PostgreSQL</b> : robuste, extensions (<code>dblink</code>), <code>REFRESH MATERIALIZED VIEW CONCURRENTLY</code>.</li>
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

    "app.servicios.title": "Services — plateforme web",
    "app.servicios.lead": "MVP axé vitesse et sécurité : Next.js + Supabase + PWA.",
    "app.servicios.stack": "Stack initial",
    "app.servicios.stack.bullets": `
      <li><b>Frontend</b> : TypeScript + Next.js (SSR/SSG) · PWA.</li>
      <li><b>Données</b> : Supabase (Postgres + Auth + RLS) · Storage.</li>
      <li><b>Comms</b> : Email (Resend/SendGrid) · Telegram · (plus tard) WhatsApp API.</li>
      <li><b>Paiements</b> : (plus tard) Stripe abonnements.</li>
      <li><b>Automatisation</b> : n8n sur VPS.</li>
    `,
    "app.servicios.why": "Pourquoi ce choix ?",
    "app.servicios.why.bullets": `
      <li>Livrer vite sans perdre une base solide.</li>
      <li>Coût initial faible, montée en charge ensuite.</li>
      <li>RLS : confidentialité dès le premier jour.</li>
    `,
    "app.servicios.note": "Évolutif : le périmètre peut changer sans révéler les idées clés.",

    "app.finanzas.title": "Finance — dépenses/recettes unifiées",
    "app.finanzas.lead": "Backend Python pour ingestion PDF/OCR, normalisation et API.",
    "app.finanzas.stack": "Stack initial",
    "app.finanzas.stack.bullets": `
      <li><b>Backend</b> : Python + FastAPI · Uvicorn.</li>
      <li><b>Données</b> : PostgreSQL · SQLAlchemy + Alembic.</li>
      <li><b>ETL</b> : pdfplumber/Camelot/PyMuPDF (+ Tesseract si OCR).</li>
      <li><b>Jobs</b> : Celery/RQ + Redis (selon volume).</li>
      <li><b>BI</b> : Superset/Metabase + vues matérialisées.</li>
    `,
    "app.finanzas.why": "Pourquoi ce choix ?",
    "app.finanzas.why.bullets": `
      <li>Python simplifie le parsing et la normalisation.</li>
      <li>FastAPI est rapide et bien typé.</li>
      <li>Postgres prépare l’analytique sans sur-ingénierie.</li>
    `,
    "app.finanzas.note": "Évolutif : focus sur les outils, pas sur l’idée."
  }
};

function applyI18n(lang){
  const dict = t[lang] || t.es;
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-i18n]').forEach(el=>{
    const key = el.getAttribute('data-i18n');
    if (dict[key]) el.textContent = dict[key];
  });
  document.querySelectorAll('[data-i18n-html]').forEach(el=>{
    const key = el.getAttribute('data-i18n-html');
    if (dict[key]) el.innerHTML = dict[key];
  });
  localStorage.setItem('lang', lang);
}

(function initLang(){
  const select = document.getElementById('lang');
  const saved = localStorage.getItem('lang') || 'es';
  if (select){ select.value = saved; select.addEventListener('change', e=>applyI18n(e.target.value)); }
  applyI18n(saved);
})();

// ===== Formulario =====
const form = document.getElementById('contactForm');
if (form){
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
}
function localize(key){
  const lang = localStorage.getItem('lang') || 'es';
  const map = {
    es:{'form.ok':'¡Gracias! Te escribo pronto.','form.mail':'Abriendo tu cliente de correo…','form.err':'Ups, no se pudo enviar.'},
    en:{'form.ok':'Thanks! I’ll get back to you soon.','form.mail':'Opening your mail client…','form.err':'Oops, the message could not be sent.'},
    fr:{'form.ok':'Merci ! Je vous réponds bientôt.','form.mail':'Ouverture de votre client mail…','form.err':'Oups, envoi impossible.'}
  };
  return (map[lang] && map[lang][key]) || map.es[key];
}
