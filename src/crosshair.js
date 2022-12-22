import { injectScript } from './utils';

let price = null;

export function getCrosshairPrice() {
  return price;
}

export function initCrosshair() {
  const scriptSrc = chrome.runtime.getURL('static/static.js');
  injectScript(scriptSrc, 'body');

  window.addEventListener('message', (e) => {
    if (e?.data?.type === '__crosshair_price') {
      price = e.data.price;
    }
  });
}
