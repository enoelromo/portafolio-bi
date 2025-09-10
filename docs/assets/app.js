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

