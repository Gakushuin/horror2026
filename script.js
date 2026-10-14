(() => {
  'use strict';
  const menu = document.querySelector('#menuBtn');
  const nav = document.querySelector('#nav');
  function setMenu(open) {
    nav.classList.toggle('open', open);
    menu.classList.toggle('open', open);
    menu.setAttribute('aria-expanded', String(open));
    menu.setAttribute('aria-label', open ? 'メニューを閉じる' : 'メニューを開く');
  }
  menu.addEventListener('click', () => setMenu(menu.getAttribute('aria-expanded') !== 'true'));
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', e => { if(e.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') {setMenu(false);menu.focus();} });
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  if (!motion.matches && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {if(entry.isIntersecting){entry.target.classList.add('in');observer.unobserve(entry.target);}});
    }, {threshold: .08});
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  }
})();
