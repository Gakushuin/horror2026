const EVENT_START = new Date('2026-11-01T09:00:00+09:00');
const EVENT_END = new Date('2026-11-03T18:00:00+09:00');
const COMMENT_KEY = 'zan_e_horror_comments';

const $ = (s) => document.querySelector(s);
const body = document.body;
const opening = $('#opening');
const enterBtn = $('#enterBtn');
const skipBtn = $('#skipBtn');
const header = $('#header');
const menuBtn = $('#menuBtn');
const nav = $('#nav');
const ghost = $('#ghost');

function closeOpening() {
  if (!opening) return;
  body.classList.remove('locked');
  opening.classList.add('hidden');
  setTimeout(() => opening.remove(), 900);
}

if (opening) {
  body.classList.add('locked');
  enterBtn?.addEventListener('click', closeOpening);
  skipBtn?.addEventListener('click', closeOpening);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === 'Escape') closeOpening();
  });
  setTimeout(() => {
    if (document.body.classList.contains('locked')) closeOpening();
  }, 9000);
}

function pad(n) {
  return String(n).padStart(2, '0');
}
function updateCountdown() {
  const now = new Date();
  let diff = EVENT_START - now;
  let label = '準備中';
  if (now >= EVENT_START && now <= EVENT_END) {
    diff = EVENT_END - now;
    label = '開催中';
  } else if (now > EVENT_END) {
    diff = 0;
    label = '終了';
  }
  diff = Math.max(0, diff);
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor(diff / 3600000) % 24;
  const mins = Math.floor(diff / 60000) % 60;
  const secs = Math.floor(diff / 1000) % 60;
  $('#days').textContent = days;
  $('#hours').textContent = pad(hours);
  $('#mins').textContent = pad(mins);
  $('#secs').textContent = pad(secs);
  $('#statusText').textContent = label;
}
updateCountdown();
setInterval(updateCountdown, 1000);

menuBtn?.addEventListener('click', () => nav?.classList.toggle('open'));
document.querySelectorAll('.nav a').forEach((link) => {
  link.addEventListener('click', () => nav?.classList.remove('open'));
});

const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('in');
  });
}, { threshold: 0.16 });
document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

let ghostTimer;
window.addEventListener('scroll', () => {
  header?.classList.toggle('scrolled', window.scrollY > 16);
  if (ghost && window.scrollY > 700 && window.scrollY < 2500) {
    ghost.classList.add('show');
    clearTimeout(ghostTimer);
    ghostTimer = setTimeout(() => ghost.classList.remove('show'), 1000);
  }
}, { passive: true });

const sampleComments = [
  { name: '前作参加者', body: '残穢の続編って時点でかなり行きたい。前作の整理券番号を使う演出、好き。', time: 'sample' },
  { name: '匿名', body: '池のビジュアルが普通に怖い。夜の目白キャンパスで見たら絶対雰囲気出る。', time: 'sample' },
  { name: '???', body: 'まだ、洗い終わっていない。', time: 'sample' }
];

function escapeHtml(text) {
  return String(text).replace(/[&<>"']/g, (c) => ({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
  }[c]));
}
function loadComments() {
  try {
    return JSON.parse(localStorage.getItem(COMMENT_KEY)) || sampleComments;
  } catch {
    return sampleComments;
  }
}
function saveComments(comments) {
  try {
    localStorage.setItem(COMMENT_KEY, JSON.stringify(comments));
  } catch {}
}
function renderComments() {
  const list = $('#commentList');
  if (!list) return;
  const comments = loadComments();
  list.innerHTML = comments.map(c => `
    <article class="voice-item">
      <p>${escapeHtml(c.body)}</p>
      <div class="voice-meta"><span>${escapeHtml(c.name || '匿名')}</span><span>${escapeHtml(c.time)}</span></div>
    </article>
  `).join('');
}
$('#commentForm')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = $('#name').value.trim() || '匿名';
  const text = $('#body').value.trim();
  const status = $('#formStatus');
  if (!text) {
    status.textContent = 'コメントを入力してください。';
    return;
  }
  const comments = loadComments();
  comments.unshift({ name, body: text, time: new Date().toLocaleDateString('ja-JP') });
  saveComments(comments.slice(0, 24));
  $('#body').value = '';
  status.textContent = '声を残しました。';
  renderComments();
});
renderComments();
