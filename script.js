const toggle=document.querySelector('.menu-toggle'),menu=document.querySelector('#menu');toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')!=='true';toggle.setAttribute('aria-expanded',String(open));menu.classList.toggle('open',open)});menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{menu.classList.remove('open');toggle.setAttribute('aria-expanded','false')}));const modal=document.querySelector('#lightbox');document.querySelectorAll('.photo').forEach(b=>b.addEventListener('click',()=>{modal.querySelector('img').src=b.querySelector('img').src;modal.querySelector('img').alt=b.querySelector('img').alt;modal.querySelector('p').textContent=b.querySelector('img').alt;modal.showModal()}));modal.querySelector('button').addEventListener('click',()=>modal.close());modal.addEventListener('click',e=>{if(e.target===modal)modal.close()});

// Reveal each element once, without hiding content when scripting is unavailable.
(() => {
  const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (preference.matches || !('IntersectionObserver' in window)) return;
  const targets = document.querySelectorAll('.hero-logo, .hero-inner > div, .section > .eyebrow, .section > h2, .two-col > div:not(.portrait), .portrait, .experience, .cards article, .note, .photo, .clients > div, .client-note, .steps > li');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('revealed');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -24px 0px' });
  targets.forEach(element => {
    if (element.parentElement.matches('.cards, .gallery, .clients, .steps')) {
      const index = Array.from(element.parentElement.children).indexOf(element);
      element.style.setProperty('--reveal-delay', `${(index % 4) * 85}ms`);
    }
    element.classList.add('reveal');
    observer.observe(element);
  });
  const revealFocused = event => {
    const element = event.target.closest('.reveal');
    if (element) { element.classList.add('revealed'); observer.unobserve(element); }
  };
  document.addEventListener('focusin', revealFocused);
  preference.addEventListener('change', event => {
    if (!event.matches) return;
    observer.disconnect();
    targets.forEach(element => element.classList.add('revealed'));
  });
})();
