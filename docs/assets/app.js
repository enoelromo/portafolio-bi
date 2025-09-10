// Año en footer
document.addEventListener('DOMContentLoaded', ()=>{
  const y=document.getElementById('y'); if(y) y.textContent=new Date().getFullYear();
});
// Carruseles
function initCarousel(el){
  const slides=el.querySelector('.slides'); const imgs=slides.querySelectorAll('img'); let i=0;
  const go=n=>{ i=(n+imgs.length)%imgs.length; slides.style.transform=`translateX(-${i*100}%)`; };
  el.querySelector('.prev')?.addEventListener('click',()=>go(i-1));
  el.querySelector('.next')?.addEventListener('click',()=>go(i+1));
  if(el.dataset.autoplay==='true') setInterval(()=>go(i+1),4000);
}
document.querySelectorAll('.carousel').forEach(initCarousel);

// Tabs (pestañas)
function initTabs(root){
  const tabs=[...root.querySelectorAll('.tab')];
  const panels=[...root.querySelectorAll('.panel')];
  const activate=(id)=>{
    tabs.forEach(t=>t.classList.toggle('active', t.dataset.target===id));
    panels.forEach(p=>p.classList.toggle('active', '#'+p.id===id));
    history.replaceState(null,'',id);
  };
  tabs.forEach(t=>t.addEventListener('click',()=>activate(t.dataset.target)));
  const initial=location.hash && panels.some(p=>('#'+p.id)===location.hash) ? location.hash : tabs[0].dataset.target;
  activate(initial);
}
document.querySelectorAll('[data-tabs]').forEach(initTabs);

// ===== Configura tu email aquí =====
const CONTACT_EMAIL = "enoelromo@gmail.com"; // <-- cambia por tu correo
// Opcional: usa Formspree si luego quieres envío sin cliente de correo:
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
    brand: "Eric Noël — BI",
    "nav.projects": "Proyectos",
    "nav.contact": "Contáctame",
    "hero.title": "Portafolio",
    "hero.lead": "Un caso End-to-End de Business Intelligence y dos apps en camino.",
    "projects.title": "Proyectos",
    "card.bi.title": "BI End-to-End (3 etapas)",
    "card.bi.desc": "DWH en PostgreSQL → Orquestación en n8n → Dashboard (Power BI/Qlik). Datos anonimizados.",
    "card.bi.cta": "Ver etapas",
    "card.vecinos.title": "App “Vecinos” — servicios & eventos",
    "card.vecinos.desc": "Publicaciones, reservas y organización de reuniones. (Próximamente)",
    "card.vecinos.cta": "Ver avance",
    "card.finanzas.title": "App Finanzas — gastos/ingresos unificados",
    "card.finanzas.desc": "ETL de bancos + analítica personal/negocio. (Próximamente)",
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
      <li><b>PostgreSQL</b>: libre, robusto, extensiones (<code>dblink</code>), <code>REFRESH MATERIALIZED VIEW CONCURRENTLY</code>.</li>
      <li><b>PL/pgSQL</b>: control de flujo, manejo de errores y <b>trazabilidad</b> con tabla de logs por paso.</li>
      <li><b>Índices</b> por selectividad (fechas, <code>businessId</code>, <code>customerId</code>) y vistas materializadas para KPIs “listos”.</li>
      <li><b>Alternativas</b>: SQL Server + SSIS (licenciamiento y stack Windows), BigQuery (serverless y escalable, pero costo por consulta).</li>
    `,
    "bi.e2.title": "Orquestación (de cron a n8n)",
    "bi.e2.desc": "Reemplazo de cron por n8n: programaciones, reintentos, notificaciones y auditoría visual.",
    "bi.e2.bullets": `
      <li><b>n8n</b>: interfaz visual, bajo costo, conectores; facilita extender a ETL sin tocar cron.</li>
      <li><b>Mejor que cron</b>: historial, log centralizado, reintentos, alertas.</li>
      <li><b>Alternativas</b>: Airflow (más potente para pipelines grandes, requiere mayor operación), SSIS (acoplado a SQL Server).</li>
    `,
    "bi.e3.title": "Dashboard",
    "bi.e3.desc": "KPIs, comparativos y filtros sobre MVs (mv_ventas_dia/mes, mv_resumen_clientes_dia/mes). Datos anonimizados.",
    "bi.e3.bullets": `
      <li><b>Power BI / Qlik</b>: velocidad para prototipos y gran ecosistema.</li>
      <li><b>Alternativas</b>: Superset (open source), Metabase (rápido para starters).</li>
      <li><b>Buenas prácticas</b>: parámetros de fecha y RLS cuando aplique.</li>
    `
  },

  en: {
    brand: "Eric Noël — BI",
    "nav.projects": "Projects",
    "nav.contact": "Contact",
    "hero.title": "Portfolio",
    "hero.lead": "An end-to-end BI case and two apps in progress.",
    "projects.title": "Projects",
    "card.bi.title": "BI End-to-End (3 stages)",
    "card.bi.desc": "PostgreSQL DWH → n8n orchestration → Dashboard (Power BI/Qlik). Data anonymized.",
    "card.bi.cta": "View stages",
    "card.vecinos.title": "“Neighbors” app — services & events",
    "card.vecinos.desc": "Posts, bookings and meetings. (Coming soon)",
    "card.vecinos.cta": "Preview",
    "card.finanzas.title": "Finance app — unified expenses/income",
    "card.finanzas.desc": "Bank ETL + personal/business analytics. (Coming soon)",
    "card.finanzas.cta": "Preview",
    "contact.title": "Let’s talk",
    "contact.lead": "Tell me about your challenge (tech or business). I usually reply the same day.",
    "contact.name": "Name",
    "contact.email": "Email",
    "contact.message": "Message",
    "contact.send": "Send",
    "contact.privacy": "Your message will be sent via email. I don’t store your data on third-party servers.",

    "bi.title": "BI End-to-End",
    "bi.lead": "One project, three stages: PostgreSQL DWH → n8n orchestration → Dashboard.",
    "bi.tab1": "Stage 1 · DWH & ETL",
    "bi.tab2": "Stage 2 · Orchestration (n8n)",
    "bi.tab3": "Stage 3 · Dashboard",
    "bi.e1.title": "DWH & ETL (PostgreSQL)",
    "bi.e1.desc": "Controlled replication + transformations with stored procedures and step-level logging. Indexes + materialized views for low latency.",
    "bi.e1.bullets": `
      <li><b>PostgreSQL</b>: open, robust, extensions (<code>dblink</code>), <code>REFRESH MATERIALIZED VIEW CONCURRENTLY</code>.</li>
      <li><b>PL/pgSQL</b>: flow control, error handling and <b>traceability</b> with step logs.</li>
      <li><b>Indexes</b> by selectivity (dates, <code>businessId</code>, <code>customerId</code>) and MVs to pre-compute KPIs.</li>
      <li><b>Alternatives</b>: SQL Server + SSIS (licensing, Windows stack), BigQuery (serverless, scalable, pay-per-query).</li>
    `,
    "bi.e2.title": "Orchestration (from cron to n8n)",
    "bi.e2.desc": "Replace cron with n8n: scheduling, retries, notifications and visual audit trail.",
    "bi.e2.bullets": `
      <li><b>n8n</b>: visual UI, low cost, connectors; easier evolution to ETL than cron.</li>
      <li><b>Better than cron</b>: history, centralized logging, retries, alerts.</li>
      <li><b>Alternatives</b>: Airflow (powerful for large pipelines, more ops), SSIS (tied to SQL Server).</li>
    `,
    "bi.e3.title": "Dashboard",
    "bi.e3.desc": "KPIs, comparisons and filters over MVs (mv_ventas_dia/mes, mv_resumen_clientes_dia/mes). Data anonymized.",
    "bi.e3.bullets": `
      <li><b>Power BI / Qlik</b>: fast prototyping and strong ecosystem.</li>
      <li><b>Alternatives</b>: Superset (open source), Metabase (quick to start).</li>
      <li><b>Good practices</b>: date parameters and RLS when needed.</li>
    `
  },

  fr: {
    brand: "Eric Noël — BI",
    "nav.projects": "Projets",
    "nav.contact": "Contact",
    "hero.title": "Portfolio",
    "hero.lead": "Un cas BI de bout en bout et deux applications en préparation.",
    "projects.title": "Projets",
    "card.bi.title": "BI End-to-End (3 étapes)",
    "card.bi.desc": "DWH PostgreSQL → orchestration n8n → tableau de bord (Power BI/Qlik). Données anonymisées.",
    "card.bi.cta": "Voir les étapes",
    "card.vecinos.title": "App « Voisins » — services & événements",
    "card.vecinos.desc": "Annonces, réservations et réunions. (Bientôt)",
    "card.vecinos.cta": "Aperçu",
    "card.finanzas.title": "App Finance — dépenses/recettes unifiées",
    "card.finanzas.desc": "ETL bancaire + analytique perso/pro. (Bientôt)",
    "card.finanzas.cta": "Aperçu",
    "contact.title": "Échangeons",
    "contact.lead": "Parlez-moi de votre besoin (technique ou métier). Je réponds en général le jour même.",
    "contact.name": "Nom",
    "contact.email": "Email",
    "contact.message": "Message",
    "contact.send": "Envoyer",
    "contact.privacy": "Votre message sera envoyé par email. Aucune donnée n’est stockée sur des serveurs tiers.",

    "bi.title": "BI End-to-End",
    "bi.lead": "Un projet, trois étapes : DWH PostgreSQL → orchestration n8n → tableau de bord.",
    "bi.tab1": "Étape 1 · DWH & ETL",
    "bi.tab2": "Étape 2 · Orchestration (n8n)",
    "bi.tab3": "Étape 3 · Dashboard",
    "bi.e1.title": "DWH & ETL (PostgreSQL)",
    "bi.e1.desc": "Réplication contrôlée + transformations via procédures stockées et journalisation par étape. Index + vues matérialisées pour faible latence.",
    "bi.e1.bullets": `
      <li><b>PostgreSQL</b> : open-source, robuste, extensions (<code>dblink</code>), <code>REFRESH MATERIALIZED VIEW CONCURRENTLY</code>.</li>
      <li><b>PL/pgSQL</b> : contrôle du flux, gestion d’erreurs et <b>traçabilité</b> grâce aux logs par étape.</li>
      <li><b>Index</b> selon la sélectivité (dates, <code>businessId</code>, <code>customerId</code>) et vues matérialisées pour pré-calculer les KPI.</li>
      <li><b>Alternatives</b> : SQL Server + SSIS (licences, stack Windows), BigQuery (serverless, facturation à la requête).</li>
    `,
    "bi.e2.title": "Orchestration (de cron à n8n)",
    "bi.e2.desc": "Remplacement de cron par n8n : planification, relances, notifications et audit visuel.",
    "bi.e2.bullets": `
      <li><b>n8n</b> : interface visuelle, coût réduit, connecteurs ; évolution vers l’ETL plus simple que cron.</li>
      <li><b>Mieux que cron</b> : historique, logs centralisés, relances, alertes.</li>
      <li><b>Alternatives</b> : Airflow (très puissant mais plus lourd à opérer), SSIS (lié à SQL Server).</li>
    `,
    "bi.e3.title": "Dashboard",
    "bi.e3.desc": "KPI, comparatifs et filtres sur des vues matérialisées (mv_ventas_dia/mes, mv_resumen_clientes_dia/mes). Données anonymisées.",
    "bi.e3.bullets": `
      <li><b>Power BI / Qlik</b> : rapidité de prototypage et riche écosystème.</li>
      <li><b>Alternatives</b> : Superset (open-source), Metabase (démarrage rapide).</li>
      <li><b>Bonnes pratiques</b> : paramètres de date et RLS si nécessaire.</li>
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
  // html
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

// ===== Formulario (mailto o Formspree) =====
const form = document.getElementById('contactForm');
if (form){
  form.addEventListener('submit', async (e)=>{
    e.preventDefault();
    const fd = new FormData(form);
    const name = fd.get('name'); const email = fd.get('email'); const message = fd.get('message');
    const msg = document.getElementById('formMsg');

    try{
      if (window.FORM_ENDPOINT){
        const res = await fetch(window.FORM_ENDPOINT, {
          method:'POST',
          headers:{'Accept':'application/json'},
          body: fd
        });
        if(!res.ok) throw new Error('HTTP '+res.status);
        msg.textContent = localize('form.ok');
        form.reset();
      }else{
        // Fallback: mailto
        const subject = encodeURIComponent(`[Portafolio] ${name}`);
        const body = encodeURIComponent(`${message}\n\n— ${name} <${email}>`);
        window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
        msg.textContent = localize('form.mail');
      }
    }catch(err){
      msg.textContent = localize('form.err');
    }
  });
}
function localize(key){
  const lang = localStorage.getItem('lang') || 'es';
  const map = {
    es: { 'form.ok':'¡Gracias! Te escribo pronto.', 'form.mail':'Abriendo tu cliente de correo…', 'form.err':'Ups, no se pudo enviar.' },
    en: { 'form.ok':'Thanks! I’ll get back to you soon.', 'form.mail':'Opening your mail client…', 'form.err':'Oops, the message could not be sent.' },
    fr: { 'form.ok':'Merci ! Je vous réponds bientôt.', 'form.mail':'Ouverture de votre client mail…', 'form.err':'Oups, envoi impossible.' }
  };
  return (map[lang] && map[lang][key]) || map.es[key];
}



