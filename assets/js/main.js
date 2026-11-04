
(() => {
  document.addEventListener('click', event => {
    const closeButton = event.target.closest('.close-dialog, [data-close-dialog], #image-close');
    if (closeButton) {
      event.preventDefault();
      event.stopPropagation();
      const modal = closeButton.closest('dialog');
      if (modal && modal.open) modal.close();
      return;
    }
    const trigger = event.target.closest('[data-case]');
    if (trigger) {
      const modal = document.getElementById(trigger.dataset.case);
      if (modal && typeof modal.showModal === 'function') {
        event.preventDefault();
        if (!modal.open) modal.showModal();
      }
    }
  });
  document.querySelectorAll('dialog').forEach(modal => {
    modal.addEventListener('click', event => {
      if (event.target === modal && modal.open) modal.close();
    });
  });
})();



(() => {
  const dialog = document.getElementById('portfolio-image-dialog');
  const image = document.getElementById('portfolio-image-full');
  const title = document.getElementById('portfolio-image-title');
  if (!dialog || !image || !title) return;
  const showImage = element => {
    const src = element.dataset.imageSrc;
    if (!src) return;
    image.src = src;
    image.alt = element.dataset.imageTitle || 'Portfolio image';
    title.textContent = element.dataset.imageTitle || 'Image preview';
    if (!dialog.open) dialog.showModal();
  };
  document.addEventListener('click', event => {
    const trigger = event.target.closest('[data-image-src]');
    if (!trigger) return;
    event.preventDefault();
    showImage(trigger);
  });
  document.addEventListener('keydown', event => {
    const trigger = event.target.closest('img[data-image-src][role="button"]');
    if (trigger && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      showImage(trigger);
    }
  });
})();
