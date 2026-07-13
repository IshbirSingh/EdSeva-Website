// EdSeva — shared site behaviour

document.addEventListener('DOMContentLoaded', function () {
  // Initialise scroll animations (AOS). Kept subtle: short distance,
  // quick duration, animates once so it doesn't feel gimmicky on re-scroll.
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 600,
      easing: 'ease-out-quad',
      once: true,
      offset: 80,
      anchorPlacement: 'top-bottom'
    });
  }

  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');

  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var isOpen = links.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    links.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        links.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Partner carousel: prev/next buttons scroll the track by one card.
  document.querySelectorAll('.partner-carousel').forEach(function (carousel) {
    var track = carousel.querySelector('.scroller');
    var prev = carousel.querySelector('.carousel-btn--prev');
    var next = carousel.querySelector('.carousel-btn--next');
    if (!track || !prev || !next) return;

    function step() {
      var card = track.querySelector('.partner-card');
      var gap = parseFloat(getComputedStyle(track).columnGap || getComputedStyle(track).gap) || 0;
      return card ? card.getBoundingClientRect().width + gap : track.clientWidth * 0.8;
    }

    function updateButtons() {
      var maxScroll = track.scrollWidth - track.clientWidth - 1;
      prev.disabled = track.scrollLeft <= 0;
      next.disabled = track.scrollLeft >= maxScroll;
    }

    prev.addEventListener('click', function () {
      track.scrollBy({ left: -step(), behavior: 'smooth' });
    });
    next.addEventListener('click', function () {
      track.scrollBy({ left: step(), behavior: 'smooth' });
    });

    track.addEventListener('scroll', updateButtons, { passive: true });
    window.addEventListener('resize', updateButtons);
    updateButtons();
  });

  // Set current year in footer
  var yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
});
