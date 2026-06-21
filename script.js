(function(){
  const canvas = document.getElementById('bg-canvas');
  const ctx = canvas.getContext('2d');
  let W,H,particles=[];
  function resize(){W=canvas.width=window.innerWidth;H=canvas.height=window.innerHeight;}
  resize();window.addEventListener('resize',resize);
  class Particle{
    constructor(){this.reset();}
    reset(){
      this.x=Math.random()*W;this.y=Math.random()*H;
      this.r=Math.random()*1.5+0.3;
      this.vx=(Math.random()-.5)*0.22;this.vy=(Math.random()-.5)*0.22;
      this.alpha=Math.random()*0.4+0.05;
      this.color=Math.random()<0.5?'79,142,247':'0,212,255';
    }
    update(){
      this.x+=this.vx;this.y+=this.vy;
      if(this.x<0||this.x>W||this.y<0||this.y>H)this.reset();
    }
    draw(){
      ctx.beginPath();ctx.arc(this.x,this.y,this.r,0,Math.PI*2);
      ctx.fillStyle=`rgba(${this.color},${this.alpha})`;ctx.fill();
    }
  }
  for(let i=0;i<140;i++)particles.push(new Particle());
  function drawLines(){
    const maxDist=120;
    for(let i=0;i<particles.length;i++){
      for(let j=i+1;j<particles.length;j++){
        const dx=particles[i].x-particles[j].x,dy=particles[i].y-particles[j].y;
        const dist=Math.sqrt(dx*dx+dy*dy);
        if(dist<maxDist){
          ctx.beginPath();
          ctx.moveTo(particles[i].x,particles[i].y);
          ctx.lineTo(particles[j].x,particles[j].y);
          ctx.strokeStyle=`rgba(79,142,247,${0.06*(1-dist/maxDist)})`;
          ctx.lineWidth=0.5;ctx.stroke();
        }
      }
    }
  }
  function loop(){
    ctx.clearRect(0,0,W,H);
    particles.forEach(p=>{p.update();p.draw();});
    drawLines();
    requestAnimationFrame(loop);
  }
  loop();
})();

/* MARQUEE DUPLICATE for infinite loop */
['track1','track2'].forEach(id=>{
  const t=document.getElementById(id);
  if(t){t.innerHTML+=t.innerHTML;}
});

/* NAV TOGGLE */
function toggleNav(){document.getElementById('navLinks').classList.toggle('open');}
function closeNav(){document.getElementById('navLinks').classList.remove('open');}

/* SCROLL REVEAL */
const obs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible');});
},{threshold:0.1});
document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));

/* ACTIVE NAV */
const secs=document.querySelectorAll('section[id]');
const navAs=document.querySelectorAll('.nav-links a');
window.addEventListener('scroll',()=>{
  let cur='';
  secs.forEach(s=>{if(window.scrollY>=s.offsetTop-80)cur=s.id;});
  navAs.forEach(a=>{
    a.style.color=a.getAttribute('href')==='#'+cur?'var(--cyan)':'';
  });
},{passive:true});