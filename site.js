// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Reveal on scroll
const items = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.15 });
items.forEach(el => io.observe(el));

// Gentle blob motion (respect reduced motion)
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if(!prefersReduced){
  document.querySelectorAll('.blob').forEach((b,i)=>{
    const speed = 60000 + i*10000;
    b.animate([{transform:'translateY(0px)'},{transform:'translateY(25px)'}],
      {duration:speed,iterations:Infinity,direction:'alternate',easing:'ease-in-out'});
  });
}

// Load projects to any page with #project-grid
(async function loadProjects(){
  const grid = document.getElementById('project-grid');
  if(!grid) return;
  try{
    const res = await fetch('assets/projects.json');
    const data = await res.json();
    data.forEach(p => {
      const el = document.createElement('article');
      el.className = 'card reveal';
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
      io.observe(el);
    });
  }catch(e){ console.warn('Project load failed', e); }
})();

// Swap to hero video if present
fetch('assets/hero.mp4', {method:'HEAD'}).then(r => {
  if(r.ok){ document.body.classList.add('video-on'); }
}).catch(()=>{});

// Mobile menu
const menuBtn = document.querySelector('.menu');
const nav = document.querySelector('.nav-links');
menuBtn?.addEventListener('click', () => {
  const open = nav.style.display === 'flex';
  nav.style.display = open ? 'none' : 'flex';
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
