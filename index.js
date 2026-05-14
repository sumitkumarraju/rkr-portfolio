/* ═══════════════════════════════════════════════
   KINETIC TYPOGRAPHY — Interactive Engine
   Scroll reveals • Canvas placeholders • Counters
   ═══════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  // ── Mobile Nav Toggle ──
  const toggle = document.getElementById('navToggle');
  const navbar = document.getElementById('navbar');
  if (toggle) {
    toggle.addEventListener('click', () => navbar.classList.toggle('open'));
    document.querySelectorAll('.nav-link').forEach(link =>
      link.addEventListener('click', () => navbar.classList.remove('open'))
    );
  }

  // ── Active Nav Link on Scroll ──
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY + 120;
    sections.forEach(sec => {
      const top = sec.offsetTop;
      const h = sec.offsetHeight;
      const id = sec.getAttribute('id');
      const link = document.querySelector(`.nav-link[href="#${id}"]`);
      if (link) {
        if (scrollY >= top && scrollY < top + h) link.classList.add('active');
        else link.classList.remove('active');
      }
    });
  });

  // ── Scroll Reveal (IntersectionObserver) ──
  const revealEls = document.querySelectorAll('.reveal, .reveal-left');
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  revealEls.forEach((el, i) => {
    el.style.setProperty('--i', i % 6);
    revealObs.observe(el);
  });

  // ── Skill Bars Animation ──
  const skillFills = document.querySelectorAll('.skill-fill');
  const skillObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.width = entry.target.dataset.width + '%';
        skillObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  skillFills.forEach(fill => skillObs.observe(fill));

  // ── Counter Animation ──
  const counters = document.querySelectorAll('[data-target]');
  const counterObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = +el.dataset.target;
      let current = 0;
      const step = Math.max(1, Math.floor(target / 40));
      const timer = setInterval(() => {
        current += step;
        if (current >= target) { current = target; clearInterval(timer); }
        el.textContent = current;
      }, 35);
      counterObs.unobserve(el);
    });
  }, { threshold: 0.5 });
  counters.forEach(c => counterObs.observe(c));

  // ── Video Autoplay Assurance ──
  document.querySelectorAll('video.project-image').forEach(video => {
    video.play().catch(() => {});
    // Restart on visibility change for mobile browsers
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) video.play().catch(() => {});
    });
  });

  // ── Canvas Fallback (PLGRM only) ──
  document.querySelectorAll('canvas.project-image').forEach(canvas => {
    const key = canvas.dataset.project || 'plgrm';
    const dpr = window.devicePixelRatio || 1;
    const w = 800, h = 500;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = '100%';
    canvas.style.height = 'auto';

    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);
    ctx.fillStyle = '#09090B';
    ctx.fillRect(0, 0, w, h);

    // Grid
    ctx.strokeStyle = 'rgba(63,63,70,0.3)';
    ctx.lineWidth = 1;
    for (let x = 0; x < w; x += 40) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke(); }
    for (let y = 0; y < h; y += 40) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke(); }

    // Background text
    ctx.fillStyle = 'rgba(39,39,42,0.4)';
    ctx.font = 'bold 120px "Space Grotesk", system-ui';
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText(key.toUpperCase(), w / 2, h / 2);

    // Accent block
    ctx.fillStyle = '#DFE104';
    ctx.fillRect(60, 60, 180, 50);
    ctx.fillStyle = '#09090B';
    ctx.font = 'bold 14px "Space Grotesk", system-ui';
    ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
    ctx.fillText(key.toUpperCase(), 72, 85);

    // Border + corners
    ctx.strokeStyle = '#DFE104'; ctx.lineWidth = 3;
    ctx.strokeRect(20, 20, w - 40, h - 40);
    const cs = 12;
    ctx.fillStyle = '#DFE104';
    ctx.fillRect(16, 16, cs, cs);
    ctx.fillRect(w - 16 - cs, 16, cs, cs);
    ctx.fillRect(16, h - 16 - cs, cs, cs);
    ctx.fillRect(w - 16 - cs, h - 16 - cs, cs, cs);
  });

  // ── Smooth Scroll for Anchor Links ──
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ── Nav Background on Scroll ──
  window.addEventListener('scroll', () => {
    navbar.style.borderBottomColor = window.scrollY > 50 ? 'var(--border)' : 'transparent';
  });

});
