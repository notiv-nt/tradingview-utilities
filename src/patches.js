import { log } from './utils';

const hideElement = (selector) => {
  function elementWatcher() {
    const element = document.querySelector(selector);

    if (element && element.style.display !== 'none') {
      log(`Hide element with selector "${selector}"`);
      element.style.display = 'none';
    }

    // If (later) there will be a lot of these pathers, move to a separate class with only 1 requestAnimationFrame
    requestAnimationFrame(elementWatcher);
  }

  elementWatcher();
};

// Patch for KeyW (, on dvorak), remove 'change interval' dialog
export const keyWPatcher = () => hideElement('[data-dialog-name="change-interval-dialog"]');

// Patch for KeyE (. on dvorak), remove 'load layout' dialog
export const keyEPatcher = () => hideElement('[data-outside-boundary-for="load-layout-dialog"]');

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

    requestAnimationFrame(elementWatcher);
  })();
}

// Auto hide replay's Confirmation dialog
export function autoHideConfirmationDialog() {
  const text = 'You are in chart replay mode. Do you want to exit this mode?';

  (function elementWatcher() {
    const dialog = document.querySelector('div[data-name="confirm-dialog"]');

    if (dialog && dialog.innerText.includes(text)) {
      const button = dialog.querySelector('button[name="yes"]');

      if (button) {
        button.click();
      }
    }

    requestAnimationFrame(elementWatcher);
  })();
}

export function cleanupSearchInput() {
  (function loop() {
    const input = document.querySelector('[data-name="symbol-search-items-dialog"] input[data-role="search"]');

    if (input && input.value.includes('`')) {
      log(`Cleanup search input"`);
      input.value = input.value.replaceAll('`', '');
    }

    requestAnimationFrame(loop);
  })();
}
