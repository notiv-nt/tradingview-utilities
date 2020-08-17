import { isAnyMetaKey, runInWindow } from './utils';

export const TOOLBAR_COMMANDS = {
  // Horizontal line
  KeyA: '.tv-floating-toolbar__widget:nth-child(1) span',
  // Horizontal ray
  KeyS: '.tv-floating-toolbar__widget:nth-child(2) span',
  // Rectangle
  KeyD: '.tv-floating-toolbar__widget:nth-child(3) span',
  // Expanded channel
  KeyF: '.tv-floating-toolbar__widget:nth-child(4) span',
  // Vertical line
  KeyG: '.tv-floating-toolbar__widget:nth-child(5) span',
  // Trend line
  KeyZ: '.tv-floating-toolbar__widget:nth-child(6) span',
};

export const OBJECT_COMMANDS = {
  KeyQ: '[data-name="remove"]',
};

export const UI_COMMANDS = [
  // Reset scale
  {
    check: (e) => e.code === 'KeyR' && !isAnyMetaKey(e),
    fn: () => document.querySelector('.chart-container.active .js-btn-group-reset-scale > div').click(),
  },

  // Remove all shapes
  {
    check: (e) => e.code === 'KeyQ' && e.shiftKey,
    fn: () => runInWindow('TradingViewApi.activeChart().removeAllShapes()'),
  },
];

export const REPLY_COMMANDS = [
  {
    check: (e) => e.code === 'KeyW' && !isAnyMetaKey(e),
    fn: () => document.querySelector(`.tv-floating-toolbar.tv-replay-toolbar .tv-floating-toolbar__widget:nth-child(1) > div`).click(),
  },
  {
    check: (e) => e.code === 'KeyE' && !isAnyMetaKey(e),
    fn: () => document.querySelector(`.tv-floating-toolbar.tv-replay-toolbar .tv-floating-toolbar__widget:nth-child(3) > div`).click(),
  },
  {
    check: (e) => e.code === 'KeyT' && !isAnyMetaKey(e),
    fn: () => document.querySelector(`.tv-floating-toolbar.tv-replay-toolbar .tv-floating-toolbar__widget:nth-child(2) > div`).click(),
  },
];
