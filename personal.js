// personal.js — handles 第 4 页 PPT 复刻：image-replacement slots and deck mode
(function () {
  document.body.classList.add('deck-page');

  // For each .slide that contains a slide-NN slot, attempt to load
  // assets/personal-slides/slide-NN.png. On success, fade the CSS
  // fallback out and show the image instead.
  document.querySelectorAll('.slide[data-slide]').forEach(slide => {
    const num = slide.getAttribute('data-slide');
    const padded = String(num).padStart(2, '0');
    const url = `assets/personal-slides/slide-${padded}.png`;

    const probe = new Image();
    probe.onload = () => {
      // Avoid replacing if image looks like a 0-byte placeholder
      if (probe.naturalWidth < 8 || probe.naturalHeight < 8) return;
      const img = slide.querySelector('.slide__img');
      if (!img) return;
      img.src = url;
      img.alt = `Slide ${padded}`;
      slide.classList.add('has-img');
    };
    probe.onerror = () => { /* keep CSS fallback */ };
    probe.src = url;
  });
})();
