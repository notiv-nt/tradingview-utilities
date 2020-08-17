export const log = (...args) => {
  console.log.apply(console, ['\x1b[34m%s\x1b[0m', `--> [TW Utilities]`, ...args]);
};

export const runInWindow = (str) => {
  const script = document.createElement('script');
  script.innerText = str;
  document.body.appendChild(script);

  setTimeout(() => {
    document.body.removeChild(script);
  }, 400);
};

export const prevent = (e) => {
  e.stopPropagation();
  e.preventDefault();
  e.stopImmediatePropagation();
};

export const isAnyMetaKey = (e) => e.altKey || e.ctrlKey || e.metaKey || e.shiftKey;

export const isOnInput = (e) => e.target && ['INPUT', 'TEXTAREA'].includes(e.target.tagName);
