/* Fliesen Mustermann – Seitenlogik */
(function () {
  'use strict';

  // ------------------------------------------------------------
  // KONFIGURATION
  // CONTACT_EMAIL: Empfänger der Anfragen (Platzhalter!).
  // FORM_ENDPOINT: Optional die URL eines Formular-Dienstes
  //   (z. B. Formspree oder Web3Forms). Ist sie leer, öffnet das
  //   Formular stattdessen das E-Mail-Programm des Besuchers mit
  //   einer vorausgefüllten Nachricht.
  // ------------------------------------------------------------
  var CONTACT_EMAIL = 'kontakt@fliesenleger-beispiel.de';
  var FORM_ENDPOINT = '';

  // Jahr im Footer
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  // Mobile Navigation
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('main-nav');
  if (toggle && nav) {
    var setOpen = function (open) {
      nav.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Menü schließen' : 'Menü öffnen');
    };
    toggle.addEventListener('click', function () {
      setOpen(!nav.classList.contains('open'));
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) setOpen(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') setOpen(false);
    });
  }

  // Formulare
  var LABELS = {
    leistung: 'Leistung', name: 'Name', telefon: 'Telefon', email: 'E-Mail',
    ort: 'PLZ / Ort', flaeche: 'Fläche (m²)', zeitraum: 'Zeitraum', nachricht: 'Nachricht'
  };

  function validate(form) {
    var ok = true;
    form.querySelectorAll('[required]').forEach(function (el) {
      var valid = el.type === 'checkbox' ? el.checked : el.value.trim() !== '';
      if (valid && el.type === 'tel') valid = el.value.replace(/\D/g, '').length >= 6;
      var target = el.type === 'checkbox' ? el.closest('.check') : el;
      target.classList.toggle('invalid', !valid);
      if (!valid && ok) { el.focus(); ok = false; }
    });
    var email = form.querySelector('input[type=email]');
    if (email && email.value && !/^\S+@\S+\.\S+$/.test(email.value)) {
      email.classList.add('invalid');
      if (ok) email.focus();
      ok = false;
    }
    return ok;
  }

  function collect(form) {
    var data = {};
    new FormData(form).forEach(function (value, key) {
      if (key !== 'datenschutz' && String(value).trim() !== '') data[key] = String(value).trim();
    });
    return data;
  }

  function sendViaMail(data, type) {
    var subject = (type === 'schnellanfrage' ? 'Rückrufbitte' : 'Angebotsanfrage') +
      (data.leistung ? ': ' + data.leistung : '') + (data.name ? ' – ' + data.name : '');
    var body = Object.keys(data).map(function (k) {
      return (LABELS[k] || k) + ': ' + data[k];
    }).join('\n');
    window.location.href = 'mailto:' + CONTACT_EMAIL +
      '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
  }

  document.querySelectorAll('.js-lead-form').forEach(function (form) {
    var status = form.querySelector('.form-status');

    form.addEventListener('input', function (e) {
      e.target.classList.remove('invalid');
      var check = e.target.closest('.check');
      if (check) check.classList.remove('invalid');
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      status.className = 'form-status';
      if (!validate(form)) {
        status.textContent = 'Bitte füllen Sie die markierten Felder aus.';
        status.classList.add('err');
        return;
      }
      var data = collect(form);
      var type = form.getAttribute('data-form');

      if (!FORM_ENDPOINT) {
        sendViaMail(data, type);
        status.textContent = 'Ihr E-Mail-Programm wurde geöffnet – bitte senden Sie die Nachricht dort ab.';
        status.classList.add('ok');
        return;
      }

      var button = form.querySelector('button[type=submit]');
      button.disabled = true;
      data._formular = type;
      fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(data)
      }).then(function (res) {
        if (!res.ok) throw new Error(res.status);
        form.reset();
        status.textContent = 'Vielen Dank! Wir melden uns innerhalb von 24 Stunden bei Ihnen.';
        status.classList.add('ok');
      }).catch(function () {
        status.textContent = 'Das hat leider nicht geklappt. Bitte rufen Sie uns an oder schreiben Sie an ' + CONTACT_EMAIL + '.';
        status.classList.add('err');
      }).finally(function () {
        button.disabled = false;
      });
    });
  });
})();
