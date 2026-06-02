const EVENT_START = new Date('2026-11-01T09:00:00+09:00');
const EVENT_END = new Date('2026-11-03T18:00:00+09:00');
const $ = (selector) => document.querySelector(selector);
const pad = (number) => String(number).padStart(2, '0');

const body = document.body;
const gate = $('#gate');
const enterBtn = $('#enterBtn');
const skipBtn = $('#skipBtn');
const navToggle = $('#navToggle');
const nav = $('#nav');
const header = $('#siteHeader');
const apparition = $('#apparition');

body.classList.add('locked');

function closeGate() {
  gate.classList.add('is-hidden');
  body.classList.remove('locked');
  setTimeout(() => gate.remove(), 1000);
}

enterBtn?.addEventListener('click', closeGate);
skipBtn?.addEventListener('click', closeGate);

setTimeout(() => {
  if (gate && !gate.classList.contains('is-hidden')) {
    skipBtn.textContent = '入場する';
  }
}, 2600);

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
  $('#statusLabel').textContent = label;
}

updateCountdown();
setInterval(updateCountdown, 1000);

navToggle?.addEventListener('click', () => nav.classList.toggle('open'));
document.querySelectorAll('.nav a').forEach((link) => {
  link.addEventListener('click', () => nav.classList.remove('open'));
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('in');
  });
}, { threshold: 0.16 });

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

let apparitionTimer;
window.addEventListener('scroll', () => {
  document.documentElement.style.setProperty('--scroll', String(window.scrollY));
  header.classList.toggle('is-scrolled', window.scrollY > 24);

  if (window.scrollY > 760 && window.scrollY < 2200) {
    apparition.classList.add('show');
    clearTimeout(apparitionTimer);
    apparitionTimer = setTimeout(() => apparition.classList.remove('show'), 980);
  }
}, { passive: true });

const COMMENT_KEY = 'horror2026_deep_highquality_comments';
const sampleComments = [
  { name: '前作参加者', body: '残穢の続きなら絶対行く。高等科編を知ってる人だけ分かる仕掛けがあったら熱い。', time: 'sample' },
  { name: '匿名', body: '目白キャンパスって夜になると普通に怖いから、大学編かなり雰囲気出そう。', time: 'sample' },
  { name: '???', body: '池を見たら、呼ばれる。', time: 'sample' }
];

function escapeHtml(text) {
  return String(text).replace(/[&<>'"]/g, (char) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;'
  }[char]));
}

function loadComments() {
  try {
    return JSON.parse(localStorage.getItem(COMMENT_KEY)) || sampleComments;
  } catch {
    return sampleComments;
  }
}

function saveComments(comments) {
  localStorage.setItem(COMMENT_KEY, JSON.stringify(comments));
}

function renderComments() {
  const list = $('#commentList');
  const comments = loadComments();
  list.innerHTML = comments.map((comment) => `
    <article class="voice-item">
      <p>${escapeHtml(comment.body)}</p>
      <div class="voice-meta"><span>${escapeHtml(comment.name || '匿名')}</span><span>${escapeHtml(comment.time)}</span></div>
    </article>
  `).join('');
}

$('#commentForm')?.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = $('#name').value.trim() || '匿名';
  const bodyText = $('#body').value.trim();
  const status = $('#formStatus');

  if (!bodyText) {
    status.textContent = 'コメントを入力してください。';
    return;
  }

  const comments = loadComments();
  comments.unshift({
    name,
    body: bodyText,
    time: new Date().toLocaleDateString('ja-JP')
  });
  saveComments(comments.slice(0, 24));
  $('#body').value = '';
  status.textContent = '声を残しました。';
  renderComments();
});

renderComments();
