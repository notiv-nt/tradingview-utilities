const styles = `
#overlap-manager-root [data-id="Change Interval"],
#overlap-manager-root [data-name="load-layout-dialog"]
{
  display: none !important;
}
`;

const el = document.createElement('style');
el.innerHTML = styles;

document.body.appendChild(el);

// Patch for KeyW (. on dvorak)
(() => {
  const selector = '[data-name="load-layout-dialog"]';

  function check() {
    const el = document.querySelector(selector);

    if (el) {
      console.log('removed');
      el.parentElement.parentElement.parentElement.remove();
    }

    requestAnimationFrame(check);
  }

  check();
})();
