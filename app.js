/* OneCoach Marketing Site — app.js */

(function () {
  'use strict';

  // Initialize Lucide icons
  if (window.lucide) {
    lucide.createIcons();
  }

  // — Header scroll behavior —
  const header = document.getElementById('header');
  let lastScroll = 0;

  function onScroll() {
    const y = window.scrollY;
    if (y > 20) {
      header.classList.add('header--scrolled');
    } else {
      header.classList.remove('header--scrolled');
    }
    lastScroll = y;
  }
  window.addEventListener('scroll', onScroll, { passive: true });

  // — Mobile nav —
  const menuBtn = document.querySelector('.header__menu-btn');
  const mobileNav = document.getElementById('mobile-nav');
  const mobileClose = document.querySelector('.mobile-nav__close');

  function openMobileNav() {
    mobileNav.classList.add('is-open');
    mobileNav.setAttribute('aria-hidden', 'false');
    menuBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileNav() {
    mobileNav.classList.remove('is-open');
    mobileNav.setAttribute('aria-hidden', 'true');
    menuBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (menuBtn) menuBtn.addEventListener('click', openMobileNav);
  if (mobileClose) mobileClose.addEventListener('click', closeMobileNav);

  // Close mobile nav on link click
  mobileNav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', closeMobileNav);
  });

  // Close on Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && mobileNav.classList.contains('is-open')) {
      closeMobileNav();
    }
  });


  // — Pricing toggle —
  const toggleBtns = document.querySelectorAll('.pricing__toggle-btn');
  const amounts = document.querySelectorAll('.pricing-card__amount');

  toggleBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      const interval = this.getAttribute('data-interval');

      // Update active state
      toggleBtns.forEach(function (b) { b.classList.remove('pricing__toggle-btn--active'); });
      this.classList.add('pricing__toggle-btn--active');

      // Update prices
      amounts.forEach(function (el) {
        var price = interval === 'annual' ? el.getAttribute('data-annual') : el.getAttribute('data-monthly');
        el.textContent = '$' + price;
      });
    });
  });


  // — Smooth scroll for anchor links —
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

})();
