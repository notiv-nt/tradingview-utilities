let interval = setInterval(() => {
  const el = document.querySelector('div[data-name="fullscreen"]');

  if (!el) {
    return;
  }

  clearInterval(interval);

  if (el && !el.className.toLowerCase().includes('isactive')) {
    el.click(0);
  }
}, 20);
