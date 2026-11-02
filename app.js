document.documentElement.classList.add('js');
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const motionButton = document.querySelector('#motion');
let motionOff = reduced.matches;
let frame = 0;
const canvas = document.querySelector('#glitter');
const ctx = canvas.getContext('2d');
let width = 0, height = 0, particles = [];
function resize(){width=innerWidth;height=innerHeight;const ratio=Math.min(devicePixelRatio||1,2);canvas.width=width*ratio;canvas.height=height*ratio;ctx?.setTransform(ratio,0,0,ratio,0,0);particles=Array.from({length:width<650?24:50},()=>({x:Math.random()*width,y:Math.random()*height,r:Math.random()*.9+.25,phase:Math.random()*Math.PI*2,speed:Math.random()*.12+.03}));}
let previousTime=0;
function draw(time){if(motionOff||document.hidden||!ctx){frame=0;return;}const delta=Math.min((time-previousTime)/16.67,2);previousTime=time;ctx.clearRect(0,0,width,height);for(const p of particles){p.y-=p.speed*delta;if(p.y<0)p.y=height;const alpha=.12+.6*Math.pow((Math.sin(time*.0008+p.phase)+1)/2,4);ctx.fillStyle=`rgba(220,190,108,${alpha})`;ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fill();if(alpha>.65&&p.r>.9){ctx.strokeStyle=`rgba(240,220,160,${alpha*.5})`;ctx.lineWidth=.5;ctx.beginPath();ctx.moveTo(p.x-3,p.y);ctx.lineTo(p.x+3,p.y);ctx.moveTo(p.x,p.y-3);ctx.lineTo(p.x,p.y+3);ctx.stroke();}}frame=requestAnimationFrame(draw);}
function updateMotion(){document.body.classList.toggle('motion-off',motionOff);motionButton.setAttribute('aria-pressed',String(motionOff));motionButton.setAttribute('aria-label',motionOff?'Enable glitter and animations':'Pause glitter and animations');motionButton.querySelector('span').textContent=motionOff?'Motion off':'Motion on';cancelAnimationFrame(frame);frame=0;if(!motionOff&&!document.hidden){previousTime=performance.now();frame=requestAnimationFrame(draw);}}
resize();updateMotion();addEventListener('resize',resize);document.addEventListener('visibilitychange',updateMotion);motionButton.addEventListener('click',()=>{motionOff=!motionOff;updateMotion();});reduced.addEventListener('change',e=>{motionOff=e.matches;updateMotion();});
const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}}),{threshold:.08});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
const menu=document.querySelector('#menu'),nav=document.querySelector('#navigation');function closeMenu(){nav.classList.remove('open');menu.setAttribute('aria-expanded','false');}menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));document.addEventListener('keydown',e=>{if(e.key==='Escape'&&nav.classList.contains('open')){closeMenu();menu.focus();}});
const photos=[
 [120,'A table worth gathering around.','Layers of greenery, warm candlelight, and gold details set the tone for a generous evening.','Candlelit banquet table with green and gold botanical styling'],
 [119,'Emerald, after dark.','Rich green drapery and intimate pools of light turn a corner of the room into its own little world.','Deep green event drapery with a candlelit drinks display'],
 [113,'Under a canopy of light.','An overhead garden, soft illumination, and just a little theatre.','Lush hanging greenery and chandeliers above an enchanted garden setting'],
 [116,'A room transformed.','Draped ceilings and sparkling details make the whole room part of the occasion.','Elegant ballroom with green drapery and hanging lights'],
 [114,'Let the details glow.','Sculptural florals and golden candlelight bring warmth to every place setting.','Botanical centrepieces and tall candles on a formally set table'],
 [121,'A deeper shade of green.','Layered textures, generous arrangements, and the glow of candles against emerald.','Emerald table setting with foliage and gold candle holders'],
 [117,'A little wonder overhead.','Light falling through a hanging garden. A sense of stepping into somewhere unexpected.','Immersive garden installation with cascading lights'],
 [118,'Stay for one more story.','Tables made for long conversations, with soft light and rich botanical textures.','Intimate banquet styling with greenery and warm candles'],
 [115,'The finishing touches.','A final study in greenery, atmosphere, and the little details that make a night feel special.','Garden-inspired event styling from the original inspiration board']
];
let photo=0,loadId=0;const image=document.querySelector('#gallery-image'),dots=document.querySelector('#gallery-dots');
photos.forEach((p,i)=>{const button=document.createElement('button');button.setAttribute('aria-label',`View inspiration photo ${i+1}: ${p[1]}`);button.setAttribute('aria-pressed',String(i===0));button.addEventListener('click',()=>showPhoto(i));dots.append(button);});
function showPhoto(index){photo=(index+photos.length)%photos.length;const item=photos[photo];const id=++loadId;const preload=new Image();preload.onload=()=>{if(id!==loadId)return;image.src=preload.src;image.alt=item[3];document.querySelector('#gallery-title').textContent=item[1];document.querySelector('#gallery-description').textContent=item[2];document.querySelector('#gallery-count').textContent=`${String(photo+1).padStart(2,'0')} / ${String(photos.length).padStart(2,'0')}`;dots.querySelectorAll('button').forEach((b,i)=>b.setAttribute('aria-pressed',String(i===photo)));};preload.src=`assets/asset-${item[0]}.webp`;}
document.querySelector('#gallery-prev').addEventListener('click',()=>showPhoto(photo-1));document.querySelector('#gallery-next').addEventListener('click',()=>showPhoto(photo+1));document.querySelector('.gallery').addEventListener('keydown',e=>{if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();showPhoto(photo+(e.key==='ArrowRight'?1:-1));}});
let touchX=null;image.addEventListener('touchstart',e=>{touchX=e.changedTouches[0].clientX;},{passive:true});image.addEventListener('touchend',e=>{if(touchX!==null){const dx=e.changedTouches[0].clientX-touchX;if(Math.abs(dx)>45)showPhoto(photo+(dx<0?1:-1));}touchX=null;},{passive:true});

// An intentional first step: choose a society before entering the proposal.
const societyMessages = {
 ISC: ['Why not 2?', 'There are enough Mauja-type events, this would be refreshing'],
 SLA: ['What could be better than Suits n Sarees?', 'This.'],
 PA: ["I'm the treasurer and I approve of this proposal.", "It's a good idea trust me"],
 NC: ['The Nepalese Club deserves a ball too.', 'I have big ambitions for NC'],
 GS: ['Probably the biggest event GS would put on.', 'And I know you guys can do it'],
 TELS: ['Much bigger than Mehendi and Mocktails.', 'An experience to remember']
};
const gate = document.querySelector('#society-gate');
const pageContent = document.querySelector('#page-content');
const intro = document.querySelector('#society-intro');
const siteHeader = document.querySelector('header');
function openSocieties(){
 closeMenu();
 pageContent.inert = true;
 document.body.classList.add('choosing-society');
 if(gate.open) gate.close();
 gate.showModal();
 document.querySelector('#gate-title').focus({preventScroll:true});
}
gate.addEventListener('cancel',event=>event.preventDefault());
// Keep the entry screen available if a browser dismisses the dialog itself.
gate.addEventListener('close',()=>{if(pageContent.inert&&!gate.open){gate.showModal();document.querySelector('#gate-title').focus({preventScroll:true});}});
gate.querySelectorAll('[data-society]').forEach(button=>button.addEventListener('click',()=>{
 const society=button.dataset.society;
 document.querySelector('#intro-society').textContent=`A NOTE FOR ${society}`;
 document.querySelector('#intro-title').textContent=societyMessages[society][0];
 document.querySelector('#intro-subtitle').textContent=societyMessages[society][1];
 gate.close();
 pageContent.inert=false;
 document.body.classList.remove('choosing-society');
 document.body.classList.add('intro-active');
 siteHeader.inert=true;
 intro.scrollIntoView({behavior:'instant',block:'start'});
 document.querySelector('#intro-title').focus({preventScroll:true});
}));
document.querySelector('#change-society').addEventListener('click',openSocieties);
const introObserver=new IntersectionObserver(entries=>{
 const active=entries[0].isIntersecting;
 document.body.classList.toggle('intro-active',active);
 siteHeader.inert=active;
},{threshold:0,rootMargin:'-110px 0px 0px 0px'});
introObserver.observe(intro);
openSocieties();

// Measure every possible caption at the current width, rather than allowing
// different line counts to push the gallery controls up and down.
function reserveGalleryCopy(){
 for(const [selector,column] of [['#gallery-title',1],['#gallery-description',2]]){
  const target=document.querySelector(selector);
  const width=target.getBoundingClientRect().width;
  if(!width)continue;
  const sample=target.cloneNode(false);
  sample.removeAttribute('id');sample.setAttribute('aria-hidden','true');
  Object.assign(sample.style,{position:'absolute',visibility:'hidden',pointerEvents:'none',width:`${width}px`,minHeight:'0',height:'auto',margin:'0'});
  target.after(sample);
  let max=0;
  for(const item of photos){sample.textContent=item[column];max=Math.max(max,sample.getBoundingClientRect().height);}
  sample.remove();target.style.minHeight=`${Math.ceil(max)}px`;
 }
}
reserveGalleryCopy();document.fonts.ready.then(reserveGalleryCopy);
let galleryWidth=0;
new ResizeObserver(entries=>{const width=entries[0].contentRect.width;if(Math.abs(width-galleryWidth)>1){galleryWidth=width;reserveGalleryCopy();}}).observe(document.querySelector('.gallery-side'));

const scriptWord=document.querySelector('#sangam-script');
const scripts=[['සංගමය','si'],['ਸੰਗਮ','pa'],['संगम','hi'],['சங்கம்','ta'],['સંગમ','gu'],['సంఘం','te']];
let scriptTimer=null;
let scriptFlight=null;
const ensemble=document.querySelector('#society-ensemble');
let ensembleAnimations=[];
function finishSequences(){
 clearTimeout(scriptTimer);scriptTimer=null;
 scriptFlight?.cancel();scriptFlight=null;
 scriptWord.textContent='Sangam';scriptWord.removeAttribute('lang');
 ensembleAnimations.forEach(animation=>animation.cancel());ensembleAnimations=[];
 ensemble.dataset.phase='settled';
}
function playScripts(index=0){
 scriptFlight?.cancel();
 const finalWord=index>=scripts.length;
 scriptWord.textContent=finalWord?'Sangam':scripts[index][0];
 if(finalWord)scriptWord.removeAttribute('lang');else scriptWord.lang=scripts[index][1];
 if(motionOff){scriptWord.textContent='Sangam';scriptWord.removeAttribute('lang');return;}
 const frames=[
  {offset:0,transform:'translate(-85px, 8px)',opacity:0,filter:'blur(3px)'},
  {offset:.48,transform:'translate(0, 0)',opacity:1,filter:'blur(0)'},
  {offset:.8,transform:'translate(0, 0)',opacity:1,filter:'blur(0)'},
  {offset:1,transform:finalWord?'translate(0, 0)':'translate(22px, -3px)',opacity:finalWord?1:0,filter:'blur(0)'}
 ];
 scriptFlight=scriptWord.animate(frames,{duration:finalWord?420:550,easing:'cubic-bezier(.2,.7,.3,1)',fill:'none'});
 if(!finalWord)scriptTimer=setTimeout(()=>playScripts(index+1),550);
}
function playEnsemble(){
 if(motionOff)return;
 const bounds=ensemble.getBoundingClientRect();
 const figures=[...ensemble.querySelectorAll('figure')];
 const radius=Math.min(bounds.width*.32,150);
 ensemble.dataset.phase='playing';
 ensembleAnimations=figures.map((figure,i)=>{
  const box=figure.getBoundingClientRect();
  const cx=bounds.left+bounds.width/2-(box.left+box.width/2);
  const cy=bounds.top+bounds.height/2-(box.top+box.height/2);
  const transform=(x,y,scale=1)=>`translate(${x}px,${y}px) scale(${scale})`;
  const centre=transform(cx,cy,1.65);
  const start=i*500/5600,end=(i+1)*500/5600;
  const keys=[{offset:0,opacity:0,transform:centre}];
  if(start>0)keys.push({offset:start,opacity:0,transform:centre});
  keys.push({offset:start+.015,opacity:1,transform:centre},{offset:end-.015,opacity:1,transform:centre},{offset:end,opacity:0,transform:centre});
  // Emerge into a ring, revolve together, then find their final grid positions.
  for(let step=0;step<=4;step++){
   const angle=i*Math.PI/3-Math.PI/2+step*Math.PI/6;
   keys.push({offset:(3100+step*350)/5600,opacity:1,transform:transform(cx+Math.cos(angle)*radius,cy+Math.sin(angle)*radius,.72),easing:'ease-in-out'});
  }
  keys.push({offset:1,opacity:1,transform:'translate(0px,0px) scale(1)'});
  return figure.animate(keys,{duration:5600,easing:'linear',fill:'none'});
 });
 Promise.all(ensembleAnimations.map(a=>a.finished.catch(()=>{}))).then(()=>{ensemble.dataset.phase='settled';});
}
const sequenceObserver=new IntersectionObserver(entries=>{
 for(const entry of entries){if(!entry.isIntersecting||pageContent.inert)continue;
  sequenceObserver.unobserve(entry.target);
  if(entry.target===scriptWord)playScripts();else playEnsemble();
 }
},{threshold:.6});
sequenceObserver.observe(scriptWord);sequenceObserver.observe(ensemble);
motionButton.addEventListener('click',()=>{if(motionOff)finishSequences();});
reduced.addEventListener('change',()=>{if(motionOff)finishSequences();});
let sequenceWidth=innerWidth;
addEventListener('resize',()=>{if(innerWidth!==sequenceWidth){sequenceWidth=innerWidth;if(ensembleAnimations.some(a=>a.playState==='running'))finishSequences();}});

// Native tab semantics with arrow-key navigation for both levels of navigation.
function bindTabs(list,activate){
 const tabs=[...list.querySelectorAll('[role="tab"]')];
 function select(tab){tabs.forEach(item=>{const active=item===tab;item.setAttribute('aria-selected',String(active));item.tabIndex=active?0:-1;document.getElementById(item.getAttribute('aria-controls')).hidden=!active;});activate?.(tab);}
 tabs.forEach((tab,index)=>{
  tab.addEventListener('click',()=>select(tab));
  tab.addEventListener('keydown',event=>{let next;if(event.key==='ArrowRight')next=(index+1)%tabs.length;if(event.key==='ArrowLeft')next=(index+tabs.length-1)%tabs.length;if(event.key==='Home')next=0;if(event.key==='End')next=tabs.length-1;if(next!==undefined){event.preventDefault();select(tabs[next]);tabs[next].focus({preventScroll:true});}});
 });
 return select;
}
const viewSwitch=document.querySelector('.view-switch');
const selectView=bindTabs(viewSwitch,tab=>{
 closeMenu();
 viewSwitch.scrollIntoView({behavior:'instant',block:'start'});
 if(tab.id==='view-vision')reserveGalleryCopy();
});
bindTabs(document.querySelector('.design-tabs'));
// Header/footer chapter links always reveal the vision before following the anchor.
document.addEventListener('click',event=>{
 const anchor=event.target.closest('a[href^="#"]');
 if(!anchor)return;
 const destination=document.querySelector(anchor.getAttribute('href'));
 if(destination?.closest('#vision-panel')&&document.querySelector('#vision-panel').hidden)selectView(document.querySelector('#view-vision'));
});
const executionLinks=[...document.querySelectorAll('.execution-nav a')];
const executionObserver=new IntersectionObserver(entries=>{
 for(const entry of entries)if(entry.isIntersecting)executionLinks.forEach(link=>link.setAttribute('aria-current',String(link.hash===`#${entry.target.id}`)));
},{rootMargin:'-190px 0px -45% 0px',threshold:0});
document.querySelectorAll('.execution-section').forEach(section=>executionObserver.observe(section));
