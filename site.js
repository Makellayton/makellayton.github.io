// Basic interactivity and progressive animations
document.getElementById('year').textContent = new Date().getFullYear();

// Mobile menu (progressive enhancement)
const menuBtn = document.querySelector('.menu');
const nav = document.querySelector('.nav-links');
menuBtn?.addEventListener('click', () => {
  nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
  nav.style.position = 'absolute';
  nav.style.right = '16px';
  nav.style.top = '60px';
  nav.style.flexDirection = 'column';
  nav.style.background = 'rgba(12,19,38,.95)';
  nav.style.backdropFilter = 'blur(12px)';
  nav.style.border = '1px solid rgba(255,255,255,.12)';
  nav.style.padding = '12px';
  nav.style.borderRadius = '12px';
});

// Load project cards
(async function loadProjects(){
  try{
    const res = await fetch('assets/projects.json');
    const data = await res.json();
    const grid = document.getElementById('project-grid');
    data.forEach(p => {
      const el = document.createElement('article');
      el.className = 'card';
      el.innerHTML = `
        <img src="${p.image}" alt="${p.title}">
        <div class="card-body">
          <h3>${p.title}</h3>
          <p>${p.summary}</p>
          <div class="tags">${p.tags.map(t=>`<span class='tag'>${t}</span>`).join('')}</div>
          <div class="cta" style="margin-top:10px">
            ${p.github ? `<a class="btn ghost" href="${p.github}" target="_blank" rel="noopener">GitHub</a>`:''}
            ${p.caseStudy ? `<a class="btn primary" href="${p.caseStudy}" target="_blank" rel="noopener">View</a>`:''}
          </div>
        </div>`;
      grid.appendChild(el);
    });
  }catch(e){ console.warn('Project load failed', e); }
})();

// Reduced motion respect
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if(!prefersReduced){
  document.querySelectorAll('.blob').forEach((b,i)=>{
    const speed = 60000 + i*10000;
    b.animate([{transform:'translateY(0px)'},{transform:'translateY(25px)'}],
      {duration:speed,iterations:Infinity,direction:'alternate',easing:'ease-in-out'});
  });
}
