/* ============================================
   Hiyab Teklu — Portfolio Interactions
   ============================================ */

(function () {
  'use strict';

  /* Progress bar */
  const progress = document.getElementById('progress');
  window.addEventListener('scroll', () => {
    const max = document.body.scrollHeight - window.innerHeight;
    if (progress) {
      progress.style.width = max > 0 ? (window.scrollY / max * 100) + '%' : '0%';
    }
  }, { passive: true });

  /* Nav scroll state */
  const nav = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 24);
  }, { passive: true });

  /* Mobile menu */
  const mob = document.getElementById('mob');
  const ham = document.getElementById('ham');
  const mobClose = document.getElementById('mob-close');

  if (ham) ham.addEventListener('click', () => mob && mob.classList.add('open'));
  if (mobClose) mobClose.addEventListener('click', closeMob);

  window.closeMob = function () {
    if (mob) mob.classList.remove('open');
  };

  /* Lightbox */
  window.openLb = function (src) {
    const lb = document.getElementById('lb');
    const lbImg = document.getElementById('lb-img');
    if (lbImg) lbImg.src = src;
    if (lb) lb.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  const lb = document.getElementById('lb');
  const lbX = document.getElementById('lb-x');

  if (lbX) {
    lbX.addEventListener('click', () => {
      if (lb) lb.classList.remove('open');
      document.body.style.overflow = '';
    });
  }

  if (lb) {
    lb.addEventListener('click', (e) => {
      if (e.target.id === 'lb') {
        lb.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lb && lb.classList.contains('open')) {
      lb.classList.remove('open');
      document.body.style.overflow = '';
    }
  });

  /* Scroll reveal */
  const revealEls = document.querySelectorAll('.reveal');
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach((el) => revealObs.observe(el));

  /* Trigger hero reveals immediately */
  document.querySelectorAll('.hero .reveal').forEach((el, i) => {
    setTimeout(() => el.classList.add('visible'), 80 + i * 100);
  });

  /* Count-up animation */
  function animateCount(el) {
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const decimals = parseInt(el.dataset.decimals || '0', 10);
    const duration = 1600;
    const start = performance.now();

    function frame(now) {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 4);
      const value = target * eased;
      el.innerHTML = (decimals ? value.toFixed(decimals) : Math.round(value)) +
        (suffix ? '<span>' + suffix + '</span>' : '');
      if (t < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  const countObs = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        countObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  document.querySelectorAll('[data-count]').forEach((el) => countObs.observe(el));
})();
