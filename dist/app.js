const main = document.querySelector('main');
const links = document.querySelector('#chapter-links');
let current = 0;
const cropSets = [
 ['inset(0 45% 78% 0)','inset(22% 45% 34% 0)','inset(66% 45% 0 0)','inset(0 0 0 55%)'],
 ['inset(0 70% 0 0)','inset(0 23% 66% 30%)','inset(34% 23% 0 30%)','inset(0 0 0 77%)'],
 ['inset(0 0 69% 0)','inset(31% 0 35% 0)','inset(65% 0 0 0)']
];
slides.forEach((slide, i) => {
 const section = document.createElement('section');
 section.className = 'slide'; section.id = `slide-${i+1}`;
 section.setAttribute('aria-label', `${i+1}. ${slide.title}`);
 const artwork = document.createElement('div'); artwork.className = 'artwork';
 const base = document.createElement('img'); base.className = 'base'; base.src = slide.image;
 base.alt = slide.text; base.width = 1920; base.height = 1080;
 base.loading = i < 2 ? 'eager' : 'lazy'; base.decoding = 'async';
 artwork.append(base);
 (cropSets[i === 0 ? 0 : i === 1 ? 1 : 2]).forEach((crop,j)=>{
  const piece = base.cloneNode(); piece.alt='';piece.setAttribute('aria-hidden','true');piece.className='piece';
  piece.style.clipPath=crop;piece.style.setProperty('--i',j);artwork.append(piece);
 });
 section.append(artwork); main.append(section);
 const a=document.createElement('a');a.href=`#slide-${i+1}`;
 const count=document.createElement('span');count.textContent=String(i+1).padStart(2,'0');
 a.append(count,slide.title);a.addEventListener('click',()=>setMenu(false));links.append(a);
});
const menu=document.querySelector('#menu');const chapters=document.querySelector('#chapters');
function setMenu(open){chapters.hidden=!open;menu.setAttribute('aria-expanded',String(open));document.body.classList.toggle('overlay-open',open);if(open)links.querySelector('a').focus();}
menu.addEventListener('click',()=>setMenu(chapters.hidden));
function go(index){index=Math.max(0,Math.min(slides.length-1,index));document.querySelector(`#slide-${index+1}`).scrollIntoView({behavior:document.body.classList.contains('motion-off')?'instant':'smooth'});}
document.querySelector('#previous').addEventListener('click',()=>go(current-1));
document.querySelector('#next').addEventListener('click',()=>go(current+1));
const reading=document.querySelector('#reading');const read=document.querySelector('#read');
function updateReading(){document.querySelector('#reading-title').textContent=slides[current].title;document.querySelector('#reading-text').textContent=slides[current].text;}
function setReading(open){reading.hidden=!open;read.setAttribute('aria-expanded',String(open));updateReading();if(open)document.querySelector('#close-reading').focus();else read.focus();}
read.addEventListener('click',()=>setReading(reading.hidden));
document.querySelector('#close-reading').addEventListener('click',()=>setReading(false));
const observer=new IntersectionObserver(entries=>{for(const entry of entries){if(entry.isIntersecting){entry.target.classList.add('seen');current=Number(entry.target.id.split('-')[1])-1;document.querySelector('#number').textContent=String(current+1).padStart(2,'0');document.querySelector('#chapter-name').textContent=slides[current].title;document.querySelector('#progress-fill').style.width=`${(current+1)/slides.length*100}%`;document.querySelector('#previous').disabled=current===0;document.querySelector('#next').disabled=current===slides.length-1;document.body.classList.toggle('scrolled',current>0);links.querySelectorAll('a').forEach((a,i)=>a.setAttribute('aria-current',String(i===current)));updateReading();document.querySelector('#announcement').textContent=`Slide ${current+1} of ${slides.length}: ${slides[current].title}`;}}},{threshold:.55});
document.querySelectorAll('.slide').forEach(section=>observer.observe(section));
const motion=document.querySelector('#motion');
function setMotion(off){document.body.classList.toggle('motion-off',off);motion.setAttribute('aria-pressed',String(off));motion.setAttribute('aria-label',off?'Enable animations':'Pause animations');document.querySelector('#motion-status').textContent=off?'off':'on';}
setMotion(matchMedia('(prefers-reduced-motion: reduce)').matches);
motion.addEventListener('click',()=>setMotion(!document.body.classList.contains('motion-off')));
document.addEventListener('keydown',event=>{
 if(event.key==='Escape'){if(!chapters.hidden){setMenu(false);menu.focus();}if(!reading.hidden)setReading(false);return;}
 if(!chapters.hidden||!reading.hidden||event.target.closest('button,a,input,textarea,select'))return;
 if(['ArrowDown','ArrowRight','PageDown',' '].includes(event.key)){event.preventDefault();go(current+1);}
 if(['ArrowUp','ArrowLeft','PageUp'].includes(event.key)){event.preventDefault();go(current-1);}
 if(event.key==='Home'){event.preventDefault();go(0);}if(event.key==='End'){event.preventDefault();go(slides.length-1);}
});
