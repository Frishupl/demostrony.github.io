/* ═══════════════════════════════════════════
   BISTRO MELUZYNA — script.js
═══════════════════════════════════════════ */

(function () {
  'use strict';

  /* ─── NAVBAR: scroll class ─── */
  const navbar = document.getElementById('navbar');
  const scrollTop = document.getElementById('scrollTop');

  function onScroll() {
    const y = window.scrollY;
    navbar.classList.toggle('scrolled', y > 60);
    scrollTop.classList.toggle('visible', y > 400);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ─── SCROLL TO TOP ─── */
  scrollTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ─── MOBILE MENU ─── */
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close on link click
  navLinks.querySelectorAll('.nav-link, .nav-cta').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // Close on outside click
  document.addEventListener('click', e => {
    if (!navbar.contains(e.target)) {
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
      document.body.style.overflow = '';
    }
  });

  /* ─── SMOOTH SCROLL for anchor links ─── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = parseInt(getComputedStyle(document.documentElement)
        .getPropertyValue('--nav-h')) || 76;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  /* ─── INTERSECTION OBSERVER: fade-up ─── */
  const fadeEls = document.querySelectorAll('.fade-up');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  fadeEls.forEach(el => observer.observe(el));

  /* ─── MENU TABS ─── */
  const tabs   = document.querySelectorAll('.menu-tab');
  const panels = document.querySelectorAll('.menu-panel');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;

      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));

      tab.classList.add('active');
      const panel = document.getElementById('tab-' + target);
      if (panel) panel.classList.add('active');
    });
  });

  /* ─── ACTIVE NAV LINK on scroll ─── */
  const sections = document.querySelectorAll('section[id]');

  function updateActiveLink() {
    const scrollPos = window.scrollY + 120;
    let current = '';

    sections.forEach(sec => {
      if (sec.offsetTop <= scrollPos) current = sec.id;
    });

    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.remove('active-nav');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active-nav');
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink, { passive: true });

  /* ─── ADD active-nav style dynamically ─── */
  const style = document.createElement('style');
  style.textContent = `.active-nav { color: var(--gold) !important; }`;
  document.head.appendChild(style);

  /* ─── LAZY LOAD polyfill for older browsers ─── */
  if ('loading' in HTMLImageElement.prototype === false) {
    document.querySelectorAll('img[loading="lazy"]').forEach(img => {
      img.src = img.dataset.src || img.src;
    });
  }

  /* ─── GALLERY: image hover scale fix on mobile ─── */
  if ('ontouchstart' in window) {
    document.querySelectorAll('.gallery-item').forEach(item => {
      item.addEventListener('touchstart', () => {
        item.querySelector('.gallery-overlay').style.opacity = '1';
      }, { passive: true });
      item.addEventListener('touchend', () => {
        setTimeout(() => {
          item.querySelector('.gallery-overlay').style.opacity = '0';
        }, 600);
      }, { passive: true });
    });
  }

  /* ─── DISH CARDS: staggered animation ─── */
  const dishCards = document.querySelectorAll('.dish-card');
  const dishObs = new IntersectionObserver(
    entries => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          entry.target.style.transitionDelay = `${i * 80}ms`;
          entry.target.classList.add('visible');
          dishObs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );
  dishCards.forEach(card => {
    card.classList.add('fade-up');
    dishObs.observe(card);
  });

  /* ─── WHY CARDS: staggered ─── */
  const whyCards = document.querySelectorAll('.why-card');
  const whyObs = new IntersectionObserver(
    entries => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }, i * 100);
          whyObs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );
  whyCards.forEach(card => {
    card.style.transition = 'opacity .6s ease, transform .6s ease, box-shadow .35s cubic-bezier(.4,0,.2,1), transform .35s cubic-bezier(.4,0,.2,1)';
    whyObs.observe(card);
  });

  /* ─── PHONE CTA: pulse animation ─── */
  const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
  phoneLinks.forEach(link => {
    link.addEventListener('mouseenter', () => {
      link.style.animation = 'none';
    });
  });

  console.log('%cBistro Meluzyna 🍽️', 'font-size:18px; font-family:serif; color:#C4A35A; font-weight:bold;');
  console.log('%cStrona stworzona z ❤️', 'color:#7A1E2E; font-size:12px;');
})();
