// NWKA concept: menu, section dots, enquiry form, no-3D fallback
(() => {
  const root = document.documentElement;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // mobile menu
  const burger = document.querySelector('.burger');
  if (burger) {
    const setOpen = open => {
      root.classList.toggle('nav-open', open);
      burger.setAttribute('aria-expanded', open);
      burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    };
    burger.addEventListener('click', () => setOpen(!root.classList.contains('nav-open')));
    document.querySelectorAll('#nav a').forEach(a => a.addEventListener('click', () => setOpen(false)));
    addEventListener('keydown', e => { if (e.key === 'Escape') setOpen(false); });
  }

  // section dots (diorama.js marks the active one)
  const dots = document.querySelector('.dots');
  if (dots) {
    document.querySelectorAll('[data-shot]').forEach((el, i) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.innerHTML = `<span>${el.dataset.name || ''}</span>`;
      b.setAttribute('aria-label', 'Go to ' + (el.dataset.name || 'section ' + (i + 1)));
      if (i === 0) b.classList.add('on');
      b.addEventListener('click', () => window.__goTo ? window.__goTo(i) : el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' }));
      dots.appendChild(b);
    });
  }

  // enquiry form: CV upload only for careers; concept build does not send anything
  const form = document.getElementById('enquiry');
  if (form) {
    const cv = document.getElementById('cv-field');
    const msgLabel = document.getElementById('f-msg-label');
    const msg = document.getElementById('f-msg');
    const status = document.getElementById('form-status');
    form.addEventListener('change', e => {
      if (e.target.name !== 'type') return;
      const t = e.target.value;
      cv.hidden = t !== 'career';
      msgLabel.textContent = t === 'project' ? 'Tell us about the project' : t === 'career' ? 'Tell us about yourself' : 'Your message';
      msg.placeholder = t === 'project' ? 'Location, building type, size and timeline' : '';
    });
    form.addEventListener('submit', e => {
      e.preventDefault();
      const name = form.elements.name, email = form.elements.email;
      if (!name.value.trim()) { status.hidden = false; status.textContent = 'Please add your name.'; name.focus(); return; }
      if (!email.validity.valid || !email.value) { status.hidden = false; status.textContent = 'Please add a valid email address.'; email.focus(); return; }
      status.hidden = false;
      status.textContent = 'This is a concept preview, so your enquiry was not sent. On the live site this goes straight to info@nwka.com.my.';
    });
  }

  // if the 3D scene has not started after 6 s, show all copy as a normal page
  setTimeout(() => { if (!root.classList.contains('gl')) root.classList.add('no3d'); }, 6000);
})();
