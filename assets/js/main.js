
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
        history.replaceState(null, '', '#' + modal.id);
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

(() => {
  const openFromHash = () => {
    const modal = location.hash ? document.getElementById(location.hash.slice(1)) : null;
    if (modal && modal.matches('dialog.case-dialog') && !modal.open) modal.showModal();
  };
  document.querySelectorAll('dialog.case-dialog').forEach(modal => {
    modal.addEventListener('close', () => {
      if (location.hash === '#' + modal.id) history.replaceState(null, '', location.pathname + location.search);
    });
  });
  window.addEventListener('hashchange', openFromHash);
  openFromHash();
})();

(() => {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('site-nav');
  if (!toggle || !nav) return;
  const setOpen = open => {
    nav.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  };
  toggle.addEventListener('click', () => setOpen(!nav.classList.contains('open')));
  nav.addEventListener('click', event => {
    if (event.target.closest('a')) setOpen(false);
  });
  document.addEventListener('click', event => {
    if (nav.classList.contains('open') && !event.target.closest('.topbar')) setOpen(false);
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && nav.classList.contains('open')) {
      setOpen(false);
      toggle.focus();
    }
  });
  window.matchMedia('(min-width: 621px)').addEventListener('change', event => {
    if (event.matches) setOpen(false);
  });
})();
