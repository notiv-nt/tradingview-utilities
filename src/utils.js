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

export const openDrawingToolbarDropdownByIndex = (index) => {
  clickOnElement(
    `#drawing-toolbar > div > div > div > div > div > span:nth-child(${index}) [data-role="menu-handle"]`,
  );
};

export function injectScript(file_path, tag) {
  const node = document.getElementsByTagName(tag)[0];
  const script = document.createElement('script');
  script.setAttribute('type', 'text/javascript');
  script.setAttribute('src', file_path);
  node.appendChild(script);
}
