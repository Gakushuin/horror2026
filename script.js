const EVENT_START=new Date('2026-11-01T09:00:00+09:00');
const EVENT_END=new Date('2026-11-03T18:00:00+09:00');
const $=s=>document.querySelector(s);
const body=document.body,opening=$('#opening'),enterBtn=$('#enterBtn'),skipBtn=$('#skipBtn'),header=$('#header'),menuBtn=$('#menuBtn'),nav=$('#nav'),ghost=$('#ghostFigure');
function closeOpening(){if(!opening)return;body.classList.remove('locked');opening.classList.add('hidden');setTimeout(()=>opening.remove(),900)}
if(opening){body.classList.add('locked');enterBtn?.addEventListener('click',closeOpening);skipBtn?.addEventListener('click',closeOpening);document.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key==='Escape')closeOpening()});setTimeout(()=>{if(body.classList.contains('locked'))closeOpening()},9000)}
function pad(n){return String(n).padStart(2,'0')}
function updateCountdown(){const now=new Date();let diff=EVENT_START-now,label='準備中';if(now>=EVENT_START&&now<=EVENT_END){diff=EVENT_END-now;label='開催中'}else if(now>EVENT_END){diff=0;label='終了'}diff=Math.max(0,diff);$('#days').textContent=Math.floor(diff/86400000);$('#hours').textContent=pad(Math.floor(diff/3600000)%24);$('#mins').textContent=pad(Math.floor(diff/60000)%60);$('#secs').textContent=pad(Math.floor(diff/1000)%60);$('#statusText').textContent=label}
updateCountdown();setInterval(updateCountdown,1000);
menuBtn?.addEventListener('click',()=>nav?.classList.toggle('open'));document.querySelectorAll('.nav a').forEach(a=>a.addEventListener('click',()=>nav?.classList.remove('open')));
const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('in')}),{threshold:.16});document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
let gt;addEventListener('scroll',()=>{header?.classList.toggle('scrolled',scrollY>16);if(ghost&&scrollY>700&&scrollY<2500){ghost.classList.add('show');clearTimeout(gt);gt=setTimeout(()=>ghost.classList.remove('show'),1000)}},{passive:true});
const KEY='zan_e_horror_comments';const samples=[{name:'前作参加者',body:'残穢の続編って時点でかなり行きたい。前作の整理券番号を使う演出、好き。',time:'sample'},{name:'匿名',body:'池のビジュアルが普通に怖い。夜の目白キャンパスで見たら絶対雰囲気出る。',time:'sample'},{name:'???',body:'まだ、洗い終わっていない。',time:'sample'}];
function esc(t){return String(t).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function load(){try{return JSON.parse(localStorage.getItem(KEY))||samples}catch{return samples}}
function save(c){try{localStorage.setItem(KEY,JSON.stringify(c))}catch{}}
function render(){const list=$('#commentList');if(!list)return;list.innerHTML=load().map(c=>`<article class="voice-item"><p>${esc(c.body)}</p><div class="voice-meta"><span>${esc(c.name||'匿名')}</span><span>${esc(c.time)}</span></div></article>`).join('')}
$('#commentForm')?.addEventListener('submit',e=>{e.preventDefault();const name=$('#name').value.trim()||'匿名',text=$('#body').value.trim(),status=$('#formStatus');if(!text){status.textContent='コメントを入力してください。';return}const comments=load();comments.unshift({name,body:text,time:new Date().toLocaleDateString('ja-JP')});save(comments.slice(0,24));$('#body').value='';status.textContent='声を残しました。';render()});render();