import { log } from './utils';

const elementRemoveInterval = (selector) => {
  function elementWatcher() {
    const element = document.querySelector(selector);

    if (element) {
      log(`Remove element with selector "${selector}"`);
      element.remove();
    }

    requestAnimationFrame(elementWatcher);
  }

  elementWatcher();
};

// Patch for KeyW (, on dvorak), remove 'change interval' dialog
export const keyWPatcher = () => elementRemoveInterval('[data-dialog-name="change-interval-dialog"]');

// Patch for KeyE (. on dvorak), remove 'load layout' dialog
export const keyEPatcher = () => elementRemoveInterval('[data-outside-boundary-for="load-layout-dialog"]');

// Click on 'Toggle Maximize chart' on load
export function fullScreenPatcher() {
  if (document.querySelector('.chart-container')?.classList.contains('single-visible')) {
    log('Only 1 chart layout, skipping fullscreen patcher');
    return;
  }

  (function elementWatcher() {
    const element = document.querySelector('div[data-name="fullscreen"]');

    if (element && !element.className.toLowerCase().includes('isactive')) {
      log('Patch fullscreen chart layout');
      return element.click(0);
    }

    console.log('fullScreenPatcher', 'in loop');

    requestAnimationFrame(elementWatcher);
  })();
}
