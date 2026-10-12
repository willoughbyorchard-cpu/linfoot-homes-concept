(() => {
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.site-nav');
  if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open');
      menuButton.setAttribute('aria-expanded', String(open));
      menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    });
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      nav.classList.remove('is-open'); menuButton.setAttribute('aria-expanded','false');
    }));
  }
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const reveal = document.querySelectorAll('.home-card,.collection-item,.principle,.approach-feature__copy,.contact-card,.intro-section__main');
  if ('IntersectionObserver' in window && !reduce) {
    const ob = new IntersectionObserver(entries => entries.forEach(e => { if(e.isIntersecting){e.target.classList.add('is-visible');ob.unobserve(e.target);} }),{threshold:.12});
    reveal.forEach(el=>{el.classList.add('reveal');ob.observe(el);});
  } else reveal.forEach(el=>el.classList.add('is-visible'));
  const journey=document.querySelector('.immersive'); if(!journey||reduce)return;
  const markers=[...journey.querySelectorAll('.journey-marker')], scenes=[...journey.querySelectorAll('.immersive__scene')];
  const kicker=document.getElementById('journey-kicker'), title=document.getElementById('journey-title'), body=document.getElementById('journey-body'), link=document.getElementById('journey-link'), current=journey.querySelector('.hud-current b'), fill=journey.querySelector('.immersive__progress-fill');
  let active=-1, ticking=false;
  const setActive=i=>{i=Math.max(0,Math.min(markers.length-1,i));if(i===active||!markers[i])return;active=i;const m=markers[i];scenes.forEach((s,j)=>s.classList.toggle('is-active',j===i));kicker.textContent=m.dataset.kicker||'';title.innerHTML=m.dataset.title||'';body.textContent=m.dataset.body||'';link.href=m.dataset.link||'approach.html';link.innerHTML=(m.dataset.linktext||'Discover more')+' <span>↗</span>';current.textContent=String(i+1).padStart(2,'0');fill.style.width=((i+1)/markers.length*100)+'%';};
  const update=()=>{ticking=false;const centre=window.innerHeight*.52;let chosen=0;for(let i=0;i<markers.length;i++){const r=markers[i].getBoundingClientRect();if(r.top<=centre&&r.bottom>centre){chosen=i;break;}if(r.top<centre)chosen=i;}setActive(chosen);};
  const request=()=>{if(!ticking){ticking=true;window.requestAnimationFrame(update);}};
  window.addEventListener('scroll',request,{passive:true});window.addEventListener('resize',request);update();
})();
