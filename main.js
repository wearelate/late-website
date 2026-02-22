/* ============================================
   $LATE — Global Scripts
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ---- ACTIVE NAV LINK ----
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .nav-mobile a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // ---- PAGE TRANSITION ----
  document.body.classList.add('page-enter');

  // Intercept internal links for smooth transitions
  document.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href');
    if (!href.startsWith('#') && !href.startsWith('http') && !href.startsWith('mailto')) {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.3s ease';
        setTimeout(() => { window.location.href = href; }, 300);
      });
    }
  });

  // ---- MOBILE NAV ----
  const burger = document.querySelector('.nav-burger');
  const mobileNav = document.querySelector('.nav-mobile');
  if (burger && mobileNav) {
    burger.addEventListener('click', () => {
      mobileNav.classList.toggle('open');
      // Animate burger
      const spans = burger.querySelectorAll('span');
      if (mobileNav.classList.contains('open')) {
        spans[0].style.transform = 'rotate(45deg) translate(4.5px, 4.5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(4.5px, -4.5px)';
      } else {
        spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
      }
    });
    // Close on link click
    mobileNav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => mobileNav.classList.remove('open'));
    });
  }

  // ---- SCROLL REVEAL ----
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const delay = entry.target.dataset.delay || 0;
          setTimeout(() => entry.target.classList.add('visible'), Number(delay));
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    revealEls.forEach(el => obs.observe(el));
  }

  // ---- FAQ ACCORDION ----
  document.querySelectorAll('.faq-q').forEach(q => {
    q.addEventListener('click', () => {
      const item = q.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });

  // ---- STAGGER CHILDREN ----
  document.querySelectorAll('[data-stagger]').forEach(parent => {
    const children = parent.querySelectorAll('.reveal');
    children.forEach((child, i) => {
      child.dataset.delay = i * 100;
    });
  });

  // ---- CURSOR DOT ----
  const cursor = document.getElementById('cursor');
  if (cursor) {
    document.addEventListener('mousemove', (e) => {
      cursor.style.left = e.clientX - 3 + 'px';
      cursor.style.top = e.clientY - 3 + 'px';
    });
    document.querySelectorAll('a, button').forEach(el => {
      el.addEventListener('mouseenter', () => cursor.style.transform = 'scale(3)');
      el.addEventListener('mouseleave', () => cursor.style.transform = 'scale(1)');
    });
  }

});
