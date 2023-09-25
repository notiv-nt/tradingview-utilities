const LOG_MESSAGE_PREFIX = `--> [TW Utilities]`;

export const log = (...args) => {
  console.log.apply(console, ['\x1b[34m%s\x1b[0m', LOG_MESSAGE_PREFIX, ...args]);
};

export const prevent = (e) => {
  e.stopPropagation();
  e.preventDefault();
  e.stopImmediatePropagation();
};

export const withoutAnyMetaKey = (e) => !e.altKey && !e.ctrlKey && !e.metaKey && !e.shiftKey;

export const isOnInputField = (e) => e.target && ['INPUT', 'TEXTAREA'].includes(e.target.tagName);

export const clickOnElement = (selector) => {
  let element = document.querySelector(`${selector}`);

  if (!element) {
    console.log(`${LOG_MESSAGE_PREFIX}: Selector not found ${selector}`);
    return;
  }

  element.click();
};

export const selectDrawingTool = (index, name) => {
  // document.querySelectorAll('#drawing-toolbar [class*=group] span [class*=control] > button[data-tooltip]').forEach((i) => { i.click(); });
  clickOnElement(
    `#drawing-toolbar [class*=group] span:nth-child(${index}) [class*=control]> button[data-tooltip]`,
  );
  clickOnElement(`[data-name="${name}"]`);
};

export function injectScript(file_path, tag) {
  const node = document.getElementsByTagName(tag)[0];
  const script = document.createElement('script');
  script.setAttribute('type', 'text/javascript');
  script.setAttribute('src', file_path);
  node.appendChild(script);
}

export function waitFor(t, i) {
  const n = () => {
    if (t()) return i();
    requestAnimationFrame(n);
  };
  n();
}

export function flagCurrentSymbol() {
  clickOnElement('[data-name="legend-flag-action"][title*="flag symbol" i] [class*="uiMarker"]');
  requestAnimationFrame(() => {
    const popups = document.querySelectorAll('#overlap-manager-root > div');
    for (const popup of popups) {
      if (popup.querySelector('label[class*="colorSelectButton"] input[name="color-selector"]')) {
        popup.remove();
      }
    }
  });
}
