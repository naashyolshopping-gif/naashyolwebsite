// ============================================================
// NAASHYOL — shared front-end behaviour
// ============================================================

document.addEventListener('DOMContentLoaded', function () {

  /* ---------------- Mobile nav toggle ---------------- */
  var navToggle = document.querySelector('.nav-toggle');
  var mainNav = document.querySelector('.main-nav');
  if (navToggle && mainNav) {
    navToggle.addEventListener('click', function () {
      var isOpen = mainNav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  }

  /* ---------------- Search panel toggle ---------------- */
  var searchToggle = document.querySelector('[data-search-toggle]');
  var searchPanel = document.querySelector('.search-panel');
  if (searchToggle && searchPanel) {
    searchToggle.addEventListener('click', function () {
      var isOpen = searchPanel.classList.toggle('open');
      if (isOpen) {
        var input = searchPanel.querySelector('input');
        if (input) setTimeout(function () { input.focus(); }, 150);
      }
    });
  }

  /* ---------------- Toast notification ---------------- */
  var toast = document.querySelector('.toast');
  var toastTimer = null;

  function showToast(message) {
    if (!toast) return;
    toast.querySelector('span').textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toast.classList.remove('show');
    }, 2600);
  }

  /* ---------------- Add to cart ---------------- */
  var cartCount = document.querySelector('.cart-count');
  var itemsInCart = 0;

  document.querySelectorAll('.product-add').forEach(function (btn) {
    btn.addEventListener('click', function () {
      itemsInCart += 1;
      if (cartCount) cartCount.textContent = itemsInCart;
      showToast('Product added to cart!');
    });
  });

  /* ---------------- Placeholder links (Login / Cart / Men / Women) ---------------- */
  document.querySelectorAll('[data-placeholder]').forEach(function (el) {
    el.addEventListener('click', function (e) {
      e.preventDefault();
      showToast('This is a demo — no live page here yet.');
    });
  });

  /* ---------------- Contact form validation ---------------- */
  var contactForm = document.querySelector('#contact-form');
  if (contactForm) {
    var successBox = document.querySelector('.form-success');

    var validators = {
      name: function (v) { return v.trim().length >= 2 ? '' : 'Please enter your full name.'; },
      email: function (v) {
        var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(v.trim()) ? '' : 'Please enter a valid email address.';
      },
      phone: function (v) {
        var re = /^[0-9+\-\s()]{7,}$/;
        return re.test(v.trim()) ? '' : 'Please enter a valid phone number.';
      },
      subject: function (v) { return v.trim().length >= 2 ? '' : 'Please enter a subject.'; },
      message: function (v) { return v.trim().length >= 10 ? '' : 'Message should be at least 10 characters.'; }
    };

    function setFieldError(fieldName, message) {
      var field = contactForm.querySelector('[name="' + fieldName + '"]');
      var wrap = field.closest('.field');
      var errorEl = wrap.querySelector('.field-error');
      if (message) {
        wrap.classList.add('error');
        errorEl.textContent = message;
      } else {
        wrap.classList.remove('error');
        errorEl.textContent = '';
      }
    }

    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var isValid = true;

      Object.keys(validators).forEach(function (fieldName) {
        var field = contactForm.querySelector('[name="' + fieldName + '"]');
        var message = validators[fieldName](field.value);
        setFieldError(fieldName, message);
        if (message) isValid = false;
      });

      if (isValid) {
        if (successBox) successBox.classList.add('show');
        contactForm.reset();
        if (successBox) {
          successBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
          setTimeout(function () { successBox.classList.remove('show'); }, 6000);
        }
      } else if (successBox) {
        successBox.classList.remove('show');
      }
    });

    // Clear individual field errors as the user corrects them
    Object.keys(validators).forEach(function (fieldName) {
      var field = contactForm.querySelector('[name="' + fieldName + '"]');
      if (!field) return;
      field.addEventListener('input', function () {
        var wrap = field.closest('.field');
        if (wrap.classList.contains('error')) {
          var message = validators[fieldName](field.value);
          if (!message) setFieldError(fieldName, '');
        }
      });
    });
  }

});
