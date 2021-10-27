const LOG_MESSAGE_PREFIX = `--> [TW Utilities]`;

export const log = (...args) => {
  console.log.apply(console, ['\x1b[34m%s\x1b[0m', LOG_MESSAGE_PREFIX, ...args]);
};

export const runInWindow = (str) => {
  const script = document.createElement('script');
  script.innerText = str;
  document.body.appendChild(script);

  // Just cleanup, idk why, but let it be
  setTimeout(() => {
    document.body.removeChild(script);
  }, 400);
};

export const prevent = (e) => {
  e.stopPropagation();
  e.preventDefault();
  e.stopImmediatePropagation();
};

export const withoutAnyMetaKey = (e) => !e.altKey && !e.ctrlKey && !e.metaKey && !e.shiftKey;

export const isOnInput = (e) => e.target && ['INPUT', 'TEXTAREA'].includes(e.target.tagName);

export const openDrawingToolbarDropdownByIndex = (index) => {
  const command = `
    document.querySelector('#drawing-toolbar > div > div > div > div > div > span:nth-child(${index}) [data-role="menu-handle"]').click();
  `;

  runInWindow(command);
};

export const delayedClickBySelector = (selector) => {
  const command = `
    requestAnimationFrame(() => {
      let element = document.querySelector('${selector}');

      if (!element) {
        return console.warn('${LOG_MESSAGE_PREFIX}: Selector not found ${selector}')
      }

      element.click();
    });
  `;

  runInWindow(command);
};
