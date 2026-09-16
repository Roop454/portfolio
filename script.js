// ===== Theme Toggle =====
(function () {
  const root = document.documentElement;
  const toggle = document.getElementById('themeToggle');
  const saved = (function () { try { return localStorage.getItem('theme'); } catch (e) { return null; } })();
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  root.setAttribute('data-theme', saved || (prefersDark ? 'dark' : 'light'));

  toggle.addEventListener('click', function () {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch (e) {}
  });
})();

// ===== Mobile Nav =====
(function () {
  const burger = document.getElementById('navBurger');
  const links = document.getElementById('navLinks');
  burger.addEventListener('click', function () {
    burger.classList.toggle('open');
    links.classList.toggle('open');
  });
  links.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () {
      burger.classList.remove('open');
      links.classList.remove('open');
    });
  });
})();

// ===== Nav shadow + scroll progress =====
(function () {
  const nav = document.getElementById('nav');
  const progress = document.getElementById('scrollProgress');
  function onScroll() {
    const scrolled = window.scrollY;
    nav.classList.toggle('scrolled', scrolled > 30);
    const h = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = (h > 0 ? (scrolled / h) * 100 : 0) + '%';
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

// ===== Typing effect =====
(function () {
  const el = document.getElementById('typed');
  if (!el) return;
  const roles = [
    'Full-Stack Developer',
    'Cloud & AI Certified',
    'Machine Learning Explorer',
    'Data Science Enthusiast',
    'Problem Solver'
  ];
  let r = 0, c = 0, deleting = false;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) { el.textContent = roles[0]; return; }

  function tick() {
    const word = roles[r];
    el.textContent = deleting ? word.slice(0, c--) : word.slice(0, c++);
    let delay = deleting ? 45 : 90;
    if (!deleting && c === word.length + 1) { deleting = true; delay = 1600; }
    else if (deleting && c === 0) { deleting = false; r = (r + 1) % roles.length; delay = 400; }
    setTimeout(tick, delay);
  }
  tick();
})();

// ===== Reveal on scroll =====
(function () {
  const items = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    items.forEach(function (i) { i.classList.add('visible'); });
    return;
  }
  const io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  items.forEach(function (i) { io.observe(i); });
})();

// ===== Count-up stats =====
(function () {
  const nums = document.querySelectorAll('.stat__num');
  if (!nums.length) return;
  const io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.count, 10);
      const suffix = el.dataset.suffix || '';
      let cur = 0;
      const step = Math.max(1, Math.ceil(target / 30));
      const timer = setInterval(function () {
        cur += step;
        if (cur >= target) { cur = target; clearInterval(timer); }
        el.textContent = cur + suffix;
      }, 40);
      io.unobserve(el);
    });
  }, { threshold: 0.5 });
  nums.forEach(function (n) { io.observe(n); });
})();

// ===== Footer year =====
document.getElementById('year').textContent = new Date().getFullYear();
