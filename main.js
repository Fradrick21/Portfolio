// ── CURSOR ──
const cur = document.getElementById('cur');
const ring = document.getElementById('cur-ring');
let mx=0,my=0,rx=0,ry=0;
document.addEventListener('mousemove', e=>{ mx=e.clientX; my=e.clientY; });
(function anim(){
  cur.style.cssText = `left:${mx-6}px;top:${my-6}px`;
  rx+=(mx-rx)*.12; ry+=(my-ry)*.12;
  ring.style.cssText = `left:${rx-20}px;top:${ry-20}px`;
  requestAnimationFrame(anim);
})();
document.querySelectorAll('a,button,.sk-card,.proj-card,.cert-card').forEach(el=>{
  el.addEventListener('mouseenter',()=>ring.classList.add('big'));
  el.addEventListener('mouseleave',()=>ring.classList.remove('big'));
});

// ── HAMBURGER MENU ──
const hamburger = document.getElementById('navHamburger');
const drawer    = document.getElementById('navDrawer');
function closeDrawer(){ hamburger.classList.remove('open'); drawer.classList.remove('open'); }
hamburger.addEventListener('click',()=>{
  hamburger.classList.toggle('open');
  drawer.classList.toggle('open');
});

// ── SCROLL REVEAL ──
const obs = new IntersectionObserver(entries=>{
  entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('vis'); });
},{threshold:.12});
document.querySelectorAll('.reveal,.stag-c').forEach(el=>obs.observe(el));

// ── ORBIT TECH DOTS ──
const techs = [
  // inner ring r=100
  {label:'MDB',  icon:'🍃', r:100, color:'#4db33d'},
  {label:'RCT',  icon:'⚛️',  r:100, color:'#61dafb'},
  {label:'NOD',  icon:'🟢', r:100, color:'#68a063'},
  {label:'EXP',  icon:'⚡', r:100, color:'#f0db4f'},
  // outer ring r=180
  {label:'JS',   icon:'🟡', r:180, color:'#f0db4f'},
  {label:'PG',   icon:'🐘', r:180, color:'#336791'},
  {label:'GIT',  icon:'🐙', r:180, color:'#f05032'},
  {label:'CSS',  icon:'🎨', r:180, color:'#264de4'},
  {label:'TWD',  icon:'💨', r:180, color:'#38bdf8'},
  {label:'API',  icon:'🔌', r:180, color:'#00d4ff'},
];

const innerTechs = techs.filter(t=>t.r===100);
const outerTechs = techs.filter(t=>t.r===180);
const wrap = document.getElementById('orbitWrap');
const cx=230, cy=230;

techs.forEach((t,i)=>{
  const group = t.r===100 ? innerTechs : outerTechs;
  const idx   = group.indexOf(t);
  const total = group.length;
  const angle = (idx/total)*Math.PI*2;
  const x = cx + t.r*Math.cos(angle) - 25;
  const y = cy + t.r*Math.sin(angle) - 25;

  const div = document.createElement('div');
  div.className = 'tech-dot';
  div.style.left = x+'px';
  div.style.top  = y+'px';
  div.innerHTML  = `<span class="ti">${t.icon}</span>${t.label}`;
  div.style.color = t.color;
  div.dataset.r   = t.r;
  div.dataset.idx = group.indexOf(t);
  div.dataset.total = total;
  div.dataset.speed = t.r===100 ? '0.35' : '-0.2';
  wrap.appendChild(div);
});

// Animate dots
let startT = null;
function animOrbit(ts){
  if(!startT) startT = ts;
  const elapsed = (ts-startT)/1000;
  const dots = wrap.querySelectorAll('.tech-dot');
  dots.forEach(d=>{
    const r     = parseFloat(d.dataset.r);
    const idx   = parseFloat(d.dataset.idx);
    const total = parseFloat(d.dataset.total);
    const speed = parseFloat(d.dataset.speed);
    const base  = (idx/total)*Math.PI*2;
    const angle = base + elapsed*speed;
    d.style.left = cx + r*Math.cos(angle) - 25 + 'px';
    d.style.top  = cy + r*Math.sin(angle) - 25 + 'px';
  });
  requestAnimationFrame(animOrbit);
}
requestAnimationFrame(animOrbit);

// ── HOW TO ADD YOUR PHOTO ──
// To add your real photo, replace the content of #photoEl:
// document.getElementById('photoEl').innerHTML = '<img src="YOUR_PHOTO_URL_OR_BASE64" alt="Fradrick">';
// Or drop a <img> tag directly in the .orbit-photo div above.
