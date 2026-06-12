const EVENT_START = new Date('2026-11-01T09:00:00+09:00');
const EVENT_END = new Date('2026-11-03T18:00:00+09:00');

const $ = (selector) => document.querySelector(selector);
const body = document.body;
const opening = $('#opening');
const enterBtn = $('#enterBtn');
const skipBtn = $('#skipBtn');
const header = $('#header');
const menuBtn = $('#menuBtn');
const nav = $('#nav');

function closeOpening() {
  if (!opening) return;
  body.classList.remove('locked');
  opening.classList.add('hidden');
  setTimeout(() => opening.remove(), 800);
}

if (opening) {
  body.classList.add('locked');
  enterBtn?.addEventListener('click', closeOpening);
  skipBtn?.addEventListener('click', closeOpening);
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === 'Escape') closeOpening();
  });
  setTimeout(() => {
    if (document.body.classList.contains('locked')) closeOpening();
  }, 6000);
}

function pad(value) {
  return String(value).padStart(2, '0');
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

menuBtn?.addEventListener('click', () => {
  const isOpen = nav?.classList.toggle('open');
  menuBtn.classList.toggle('open', Boolean(isOpen));
  menuBtn.setAttribute('aria-expanded', String(Boolean(isOpen)));
});

document.querySelectorAll('.nav a').forEach((link) => {
  link.addEventListener('click', () => {
    nav?.classList.remove('open');
    menuBtn?.classList.remove('open');
    menuBtn?.setAttribute('aria-expanded', 'false');
  });
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('in');
  });
}, { threshold: 0.16 });

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

window.addEventListener('scroll', () => {
  header?.classList.toggle('scrolled', window.scrollY > 16);
}, { passive: true });
