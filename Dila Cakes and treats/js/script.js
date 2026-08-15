/* ===================================================================
   DILA CAKES & TREATS — Script
=================================================================== */

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- Mobile hamburger menu ---------- */
  var hamburger = document.getElementById('hamburgerBtn');
  var mainNav = document.getElementById('mainNav');

  function closeMenu() {
    mainNav.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('nav-open');
  }

  if (hamburger && mainNav) {
    hamburger.addEventListener('click', function () {
      var isOpen = mainNav.classList.toggle('open');
      hamburger.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', String(isOpen));
      document.body.classList.toggle('nav-open', isOpen);
    });

    mainNav.querySelectorAll('.nav-link, .nav-order-btn').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('click', function (e) {
      if (mainNav.classList.contains('open') &&
          !mainNav.contains(e.target) &&
          !hamburger.contains(e.target)) {
        closeMenu();
      }
    });
  }

  /* ---------- Nav logo: show real logo if present, else fallback badge ---------- */
  var navLogoImg = document.getElementById('navLogoImg');
  var navLogoFallback = document.getElementById('navLogoFallback');
  if (navLogoImg) {
    var showRealLogo = function () {
      navLogoImg.classList.add('loaded');
      if (navLogoFallback) navLogoFallback.style.display = 'none';
    };
    navLogoImg.addEventListener('load', showRealLogo);
    if (navLogoImg.complete && navLogoImg.naturalWidth > 0) showRealLogo();
    navLogoImg.addEventListener('error', function () {
      navLogoImg.style.display = 'none';
    });
  }

  /* ---------- Generic placeholder-image fallback ----------
     Any <img data-fallback="true"> that fails to load stays hidden
     (CSS default) and its sibling .media-placeholder shows instead.
     If it loads successfully, add "loaded" so CSS reveals it and
     hides the placeholder. This lets real photos "just work" the
     moment they're added with the expected filename. */
  document.querySelectorAll('img[data-fallback]').forEach(function (img) {
    img.addEventListener('load', function () {
      if (img.naturalWidth > 0) img.classList.add('loaded');
    });
    img.addEventListener('error', function () {
      img.classList.remove('loaded');
    });
    // Handle images already cached/loaded before listeners attached
    if (img.complete && img.naturalWidth > 0) img.classList.add('loaded');
  });

  /* ---------- Smooth scroll for in-page anchors ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var targetId = link.getAttribute('href');
      if (targetId.length > 1) {
        var target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          var headerOffset = 78;
          var top = target.getBoundingClientRect().top + window.pageYOffset - headerOffset;
          window.scrollTo({ top: top, behavior: 'smooth' });
        }
      }
    });
  });

  /* ---------- Scroll reveal animations ---------- */
  var animatedEls = document.querySelectorAll('[data-animate]');
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    animatedEls.forEach(function (el) { observer.observe(el); });
  } else {
    animatedEls.forEach(function (el) { el.classList.add('in-view'); });
  }

  /* ---------- Gallery filtering ---------- */
  var filterBtns = document.querySelectorAll('.filter-btn');
  var galleryItems = document.querySelectorAll('.gallery-item');

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterBtns.forEach(function (b) {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      var filter = btn.getAttribute('data-filter');
      galleryItems.forEach(function (item) {
        var category = item.getAttribute('data-category');
        var show = filter === 'all' || category === filter;
        item.classList.toggle('hidden-item', !show);
      });
    });
  });

  /* ---------- Gallery lightbox ---------- */
  var lightbox = document.getElementById('lightbox');
  var lightboxImg = document.getElementById('lightboxImg');
  var lightboxClose = document.getElementById('lightboxClose');
  var lightboxPrev = document.getElementById('lightboxPrev');
  var lightboxNext = document.getElementById('lightboxNext');

  var galleryButtons = Array.prototype.slice.call(
    document.querySelectorAll('.gallery-item[data-category]:not(.gallery-placeholder)')
  );
  var currentIndex = 0;

  function openLightbox(index) {
    var item = galleryButtons[index];
    if (!item) return;
    var img = item.querySelector('img');
    if (!img) return;
    currentIndex = index;
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt || '';
    lightbox.hidden = false;
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.hidden = true;
    lightboxImg.src = '';
    document.body.style.overflow = '';
  }

  function showRelative(offset) {
    if (!galleryButtons.length) return;
    var next = (currentIndex + offset + galleryButtons.length) % galleryButtons.length;
    openLightbox(next);
  }

  galleryButtons.forEach(function (item, index) {
    item.addEventListener('click', function () { openLightbox(index); });
  });

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxPrev) lightboxPrev.addEventListener('click', function () { showRelative(-1); });
  if (lightboxNext) lightboxNext.addEventListener('click', function () { showRelative(1); });

  if (lightbox) {
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) closeLightbox();
    });
  }

  document.addEventListener('keydown', function (e) {
    if (lightbox && !lightbox.hidden) {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') showRelative(-1);
      if (e.key === 'ArrowRight') showRelative(1);
    }
  });

  /* ---------- Inquiry form -> WhatsApp ---------- */
  var inquiryForm = document.getElementById('inquiryForm');
  if (inquiryForm) {
    inquiryForm.addEventListener('submit', function (e) {
      e.preventDefault();

      var name = document.getElementById('custName').value.trim();
      var phone = document.getElementById('custPhone').value.trim();
      var interest = document.getElementById('custInterest').value;
      var message = document.getElementById('custMessage').value.trim();

      var lines = [
        'Hello Dila Cakes & Treats!',
        '',
        'My name is ' + name + '.'
      ];
      if (phone) lines.push('My phone number is ' + phone + '.');
      lines.push('I am interested in: ' + interest + '.');
      lines.push('');
      lines.push('Message: ' + message);
      lines.push('');
      lines.push('Please share the available options and prices.');

      var text = encodeURIComponent(lines.join('\n'));
      var url = 'https://wa.me/255741425452?text=' + text;
      window.open(url, '_blank', 'noopener');
    });
  }

});
