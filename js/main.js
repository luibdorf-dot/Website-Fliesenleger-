/* Fliesenleger Roman Delev – Seitenlogik (ohne Frameworks) */
(function () {
  'use strict';

  // ------------------------------------------------------------
  // KONFIGURATION
  // CONTACT_EMAIL: Empfänger der Anfragen (Platzhalter!).
  // FORM_ENDPOINT: Optional die Adresse eines Formular-Dienstes
  //   (z. B. Formspree). Leer = das Formular öffnet das
  //   E-Mail-Programm des Besuchers mit vorausgefüllter Nachricht.
  // ------------------------------------------------------------
  var CONTACT_EMAIL = 'kontakt@fliesenleger-delev-beispiel.de';
  var FORM_ENDPOINT = '';

  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  // Mobilmenü
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('main-nav');

  function setMenu(open) {
    nav.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Menü schließen' : 'Menü öffnen');
  }

  toggle.addEventListener('click', function () {
    setMenu(!nav.classList.contains('open'));
  });
  nav.addEventListener('click', function (e) {
    if (e.target.closest('a')) setMenu(false);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') setMenu(false);
  });

  // Aktiven Menüpunkt beim Scrollen markieren
  var links = nav.querySelectorAll('a[href^="#"]');
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (link) {
          link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    links.forEach(function (link) {
      var section = document.querySelector(link.getAttribute('href'));
      if (section) observer.observe(section);
    });
  }

  // Kontaktformular
  var form = document.getElementById('contact-form');
  var status = form.querySelector('.form-status');

  function showStatus(text, type) {
    status.textContent = text;
    status.className = 'form-status ' + type;
  }

  function validate() {
    var firstInvalid = null;
    form.querySelectorAll('input, textarea').forEach(function (el) {
      var valid = true;
      if (el.type === 'checkbox') valid = !el.required || el.checked;
      else if (el.required && !el.value.trim()) valid = false;
      else if (el.type === 'tel') valid = el.value.replace(/\D/g, '').length >= 6;
      else if (el.type === 'email' && el.value) valid = /^\S+@\S+\.\S+$/.test(el.value);

      (el.type === 'checkbox' ? el.closest('.check') : el).classList.toggle('invalid', !valid);
      el.setAttribute('aria-invalid', String(!valid));
      if (!valid && !firstInvalid) firstInvalid = el;
    });
    if (firstInvalid) firstInvalid.focus();
    return !firstInvalid;
  }

  form.addEventListener('input', function (e) {
    var target = e.target.type === 'checkbox' ? e.target.closest('.check') : e.target;
    target.classList.remove('invalid');
    e.target.removeAttribute('aria-invalid');
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!validate()) {
      showStatus('Bitte füllen Sie die markierten Felder aus.', 'err');
      return;
    }

    var data = {
      name: form.elements.name.value.trim(),
      telefon: form.elements.telefon.value.trim(),
      email: form.elements.email.value.trim(),
      nachricht: form.elements.nachricht.value.trim()
    };

    if (!FORM_ENDPOINT) {
      var body = 'Name: ' + data.name + '\nTelefon: ' + data.telefon +
        (data.email ? '\nE-Mail: ' + data.email : '') + '\n\n' + data.nachricht;
      window.location.href = 'mailto:' + CONTACT_EMAIL +
        '?subject=' + encodeURIComponent('Anfrage über die Website – ' + data.name) +
        '&body=' + encodeURIComponent(body);
      showStatus('Ihr E-Mail-Programm wurde geöffnet – bitte senden Sie die Nachricht dort ab.', 'ok');
      return;
    }

    var button = form.querySelector('button[type=submit]');
    button.disabled = true;
    fetch(FORM_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(data)
    }).then(function (res) {
      if (!res.ok) throw new Error(res.status);
      form.reset();
      showStatus('Vielen Dank! Wir melden uns innerhalb von 24 Stunden bei Ihnen.', 'ok');
    }).catch(function () {
      showStatus('Das hat leider nicht geklappt. Bitte rufen Sie uns an: 0355 123 456 78.', 'err');
    }).finally(function () {
      button.disabled = false;
    });
  });
})();
