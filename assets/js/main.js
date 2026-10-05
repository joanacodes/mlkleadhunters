(function () {
  var root = document.documentElement;
  root.classList.remove('no-js');
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var store = { get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } }, set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) {} } };
  var session = { get: function (k) { try { return sessionStorage.getItem(k); } catch (e) { return null; } }, set: function (k, v) { try { sessionStorage.setItem(k, v); } catch (e) {} } };
  function headerH() { var h = document.getElementById('header'); return h ? h.offsetHeight : 72; }
  function update() {
    var header = document.getElementById('header');
    var dock = document.getElementById('dock');
    var hero = document.querySelector('.glass--hero');
    var anchor = hero || document.querySelector('.page-head');
    var hh = headerH();
    if (header && hero) { header.classList.toggle('header--over-dark', hero.getBoundingClientRect().bottom > hh); }
    if (dock) { var past = anchor ? (anchor.getBoundingClientRect().bottom < hh) : ((window.scrollY || window.pageYOffset) > 320); dock.classList.toggle('is-visible', past); }
  }

  function init() {
    // Preloader: once per session, 2 s
    var pre = document.getElementById('preloader');
    if (pre) {
      if (session.get('mlk-preloaded') || reduce) { pre.classList.add('is-done'); }
      else { session.set('mlk-preloaded', '1'); setTimeout(function () { pre.classList.add('is-done'); }, 2100); }
    }

    // Page entrance
    var page = document.querySelector('.page');
    if (page && !reduce) {
      page.classList.add('is-entering');
      requestAnimationFrame(function () { requestAnimationFrame(function () { page.classList.remove('is-entering'); }); });
    }

    // Hero entrance
    var glass = document.querySelector('.glass--hero');
    if (glass) {
      var delay = (pre && !pre.classList.contains('is-done')) ? 1800 : 80;
      var ready = function () { glass.classList.add('is-ready'); };
      if (reduce) { ready(); } else { setTimeout(ready, delay); }
    }

    // Header glass state + bottom dock, driven by scroll (listener registered once, elements looked up each time)
    if (document.getElementById('dock')) { document.body.classList.add('dock-space'); } else { document.body.classList.remove('dock-space'); }
    if (!window.__mlkScroll) {
      window.__mlkScroll = true;
      var ticking = false;
      var onScroll = function () { if (!ticking) { ticking = true; requestAnimationFrame(function () { update(); ticking = false; }); } };
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onScroll);
    }
    update();

    // Subtitles and blocks reveal on scroll
    var targets = document.querySelectorAll('.section-head, .reveal');
    if ('IntersectionObserver' in window && !reduce) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } });
      }, { rootMargin: '0px 0px -12% 0px', threshold: 0.12 });
      targets.forEach(function (t) { io.observe(t); });
    } else { targets.forEach(function (t) { t.classList.add('is-in'); }); }

    // Counting numbers
    var counters = document.querySelectorAll('[data-count]');
    var runCount = function (el) {
      var text = el.textContent;
      var m = text.match(/(\d[\d\s\u00a0\u202f]*)([.,]\d+)?/);
      if (!m) { return; }
      var intPart = parseInt(m[1].replace(/[\s\u00a0\u202f]/g, ''), 10);
      var decStr = m[2] || '';
      var decimals = decStr ? decStr.length - 1 : 0;
      var target = parseFloat(intPart + (decStr ? decStr.replace(',', '.') : ''));
      var sep = decStr ? decStr.charAt(0) : '';
      var before = text.slice(0, m.index), after = text.slice(m.index + m[0].length);
      var start = null, dur = 1200;
      var fmt = function (v) { var f = v.toFixed(decimals); return decimals ? f.replace('.', sep) : f; };
      var step = function (ts) {
        if (!start) { start = ts; }
        var t = Math.min(1, (ts - start) / dur); var e = 1 - Math.pow(1 - t, 3);
        el.textContent = before + fmt(target * e) + after;
        if (t < 1) { requestAnimationFrame(step); } else { el.textContent = text; }
      };
      requestAnimationFrame(step);
    };
    if (counters.length) {
      if ('IntersectionObserver' in window && !reduce) {
        var co = new IntersectionObserver(function (entries) {
          entries.forEach(function (e) { if (e.isIntersecting) { runCount(e.target); co.unobserve(e.target); } });
        }, { threshold: 0.4 });
        counters.forEach(function (c) { co.observe(c); });
      }
    }

    // Contents box: open on desktop, collapsed on phones
    var toc = document.querySelector('[data-toc]');
    if (toc) { var wide = window.matchMedia('(min-width: 1000px)'); var sync = function () { toc.open = wide.matches; }; sync(); if (wide.addEventListener) { wide.addEventListener('change', sync); } }

    // Mobile menu
    var burger = document.querySelector('.nav__burger');
    var menu = document.getElementById('menu');
    if (burger && menu) {
      var closeBtn = menu.querySelector('.menu__close');
      var open = function (state) {
        menu.classList.toggle('is-open', state);
        burger.setAttribute('aria-expanded', state ? 'true' : 'false');
        document.body.style.overflow = state ? 'hidden' : '';
        if (state && closeBtn) { closeBtn.focus(); } else { burger.focus(); }
      };
      burger.addEventListener('click', function () { open(!menu.classList.contains('is-open')); });
      if (closeBtn) { closeBtn.addEventListener('click', function () { open(false); }); }
      menu.addEventListener('click', function (e) { var a = e.target.closest('a'); if (a && a.hash && a.pathname === location.pathname && a.search === location.search) { open(false); } });
      if (!window.__mlkKeys) { window.__mlkKeys = true; document.addEventListener('keydown', function (e) { var m = document.getElementById('menu'); if (e.key === 'Escape' && m && m.classList.contains('is-open')) { m.classList.remove('is-open'); document.body.style.overflow = ''; var b = document.querySelector('.nav__burger'); if (b) { b.setAttribute('aria-expanded', 'false'); } } }); }
    }

    // Language prompt: browser language vs page language, once
    var lp = document.getElementById('langprompt');
    if (lp && !store.get('mlk-lang-choice')) {
      var pageLang = lp.getAttribute('data-page-lang');
      var langs = navigator.languages || [navigator.language || ''];
      var wantsFr = langs.some(function (l) { return (l || '').toLowerCase().indexOf('fr') === 0; });
      var mismatch = (pageLang === 'en' && wantsFr) || (pageLang === 'fr' && !wantsFr);
      if (mismatch) {
        setTimeout(function () { lp.hidden = false; requestAnimationFrame(function () { lp.classList.add('is-visible'); }); }, 1600);
        lp.querySelector('.langprompt__close').addEventListener('click', function () { store.set('mlk-lang-choice', pageLang); lp.classList.remove('is-visible'); setTimeout(function () { lp.hidden = true; }, 450); });
        lp.querySelector('.langprompt__go').addEventListener('click', function () { store.set('mlk-lang-choice', lp.getAttribute('data-other')); });
      }
    }
    document.querySelectorAll('.lang a').forEach(function (a) { a.addEventListener('click', function () { store.set('mlk-lang-choice', a.getAttribute('lang')); }); });

    // Page exit: a barely visible fade before the next page (registered once)
    if (!reduce && !window.__mlkExit && !window.__mlkPreview) {
      window.__mlkExit = true;
      document.addEventListener('click', function (e) {
        var a = e.target.closest('a'); if (!a) { return; }
        var href = a.getAttribute('href') || '';
        if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || a.target === '_blank' || a.hasAttribute('download')) { return; }
        if (!href || href.charAt(0) === '#' || /^(mailto|tel):/i.test(href) || (/^https?:/i.test(href) && a.host !== location.host)) { return; }
        if (href === location.pathname) { return; }
        if (a.hash && a.pathname === location.pathname && a.search === location.search) { return; }
        var pg = document.querySelector('.page'); if (!pg) { return; }
        e.preventDefault();
        var inMenu = !!a.closest('.menu__links');
        if (inMenu) { a.classList.add('is-going'); }
        var wait = inMenu ? 400 : 180;
        setTimeout(function () { pg.classList.add('is-leaving'); }, inMenu ? 220 : 0);
        setTimeout(function () { location.href = a.href; }, wait);
      });
    }
  }

  window.MLKInit = init;
  if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', init); } else { init(); }
})();
