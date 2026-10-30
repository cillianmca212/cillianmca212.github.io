/* ---------------------------------------------------------------------------
   Cillian McArdle — portfolio behaviour
   Everything here is progressive enhancement: with JS disabled the page is
   fully readable, all links work, and nothing stays hidden.
   --------------------------------------------------------------------------- */
(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- current year in footer ---- */
  var yr = document.getElementById('yr');
  if (yr) yr.textContent = new Date().getFullYear();

  /* ---- sticky bar state ---- */
  var bar = document.getElementById('topbar');
  function onScroll() {
    if (bar) bar.classList.toggle('is-stuck', window.scrollY > 40);
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---- mobile menu ---- */
  var toggle = document.getElementById('navToggle');
  var list   = document.getElementById('navList');

  function closeMenu() {
    if (!toggle || !list) return;
    toggle.setAttribute('aria-expanded', 'false');
    list.classList.remove('is-open');
    bar.classList.remove('is-open');
  }

  if (toggle && list) {
    toggle.addEventListener('click', function () {
      var open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      list.classList.toggle('is-open', !open);
      bar.classList.toggle('is-open', !open);
    });

    list.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') closeMenu();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeMenu();
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 900) closeMenu();
    });
  }

  /* ---- reveal project figures once, on first entry ----
     Safety matters more than the effect here: anything that reveals content
     must never be able to leave content hidden. Hence the failsafe below. */
  var reveals = document.querySelectorAll('[data-reveal]');
  function revealAll() {
    Array.prototype.forEach.call(reveals, function (el) { el.classList.add('is-in'); });
  }

  if (reduced || !('IntersectionObserver' in window)) {
    revealAll();
  } else {
    /* Only now is it safe to let CSS hide them: this branch always reveals. */
    document.documentElement.classList.add('js-reveal');

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.12 });

    Array.prototype.forEach.call(reveals, function (el) { io.observe(el); });

    /* Failsafe: if anything is still hidden after 2.5s — an archival
       screenshot tool, a stalled observer, a printed page — show it. */
    window.setTimeout(revealAll, 2500);
    window.addEventListener('beforeprint', revealAll);
  }

  /* ---- highlight the section currently in view ---- */
  var links = Array.prototype.slice.call(document.querySelectorAll('.nav__list a'));
  var targets = links
    .map(function (a) { return document.querySelector(a.getAttribute('href')); })
    .filter(Boolean);

  if (targets.length && 'IntersectionObserver' in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (a) {
          a.classList.toggle('is-current', a.getAttribute('href') === '#' + entry.target.id);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });

    targets.forEach(function (t) { spy.observe(t); });
  }

  /* ---- placeholder links: tell the truth instead of going nowhere ----
     These are the project links Cillian has not supplied yet. Replace the
     href in index.html with a real URL and delete data-placeholder.        */
  Array.prototype.forEach.call(
    document.querySelectorAll('[data-placeholder]'),
    function (a) {
      a.setAttribute('aria-disabled', 'true');
      a.addEventListener('click', function (e) { e.preventDefault(); });
    }
  );
})();
