import { delayedClickBySelector, openDrawingToolbarDropdownByIndex, runInWindow, withoutAnyMetaKey } from './utils';

export const UI_COMMANDS = [
  // Select Horizontal Line
  {
    check: (e) => e.code === 'KeyA' && withoutAnyMetaKey(e),
    fn: () => {
      openDrawingToolbarDropdownByIndex(2);
      delayedClickBySelector('[data-name="LineToolHorzLine"]');
    },
  },

  // Select Horizontal Ray
  {
    check: (e) => e.code === 'KeyS' && withoutAnyMetaKey(e),
    fn: () => {
      openDrawingToolbarDropdownByIndex(2);
      delayedClickBySelector('[data-name="LineToolHorzRay"]');
    },
  },

  // Select Rectangle
  {
    check: (e) => e.code === 'KeyD' && withoutAnyMetaKey(e),
    fn: () => {
      openDrawingToolbarDropdownByIndex(4);
      delayedClickBySelector('[data-name="LineToolRectangle"]');
    },
  },

  // Select Parallel Channel
  {
    check: (e) => e.code === 'KeyF' && withoutAnyMetaKey(e),
    fn: () => {
      openDrawingToolbarDropdownByIndex(2);
      delayedClickBySelector('[data-name="LineToolParallelChannel"]');
    },
  },

  // Select Vertical line
  {
    check: (e) => e.code === 'KeyG' && withoutAnyMetaKey(e),
    fn: () => {
      openDrawingToolbarDropdownByIndex(2);
      delayedClickBySelector('[data-name="LineToolVertLine"]');
    },
  },

  // Select Ray
  {
    check: (e) => e.code === 'KeyZ' && withoutAnyMetaKey(e),
    fn: () => {
      openDrawingToolbarDropdownByIndex(2);
      delayedClickBySelector('[data-name="LineToolRay"]');
    },
  },

  // Select Trend line
  {
    check: (e) => e.code === 'KeyX' && withoutAnyMetaKey(e),
    fn: () => {
      openDrawingToolbarDropdownByIndex(2);
      delayedClickBySelector('[data-name="LineToolTrendLine"]');
    },
  },

  // Select Long Position
  {
    check: (e) => e.code === 'KeyV' && withoutAnyMetaKey(e),
    fn: () => {
      openDrawingToolbarDropdownByIndex(7);
      delayedClickBySelector('[data-name="LineToolRiskRewardLong"]');
    },
  },

  // Select Short Position
  {
    check: (e) => e.code === 'KeyB' && withoutAnyMetaKey(e),
    fn: () => {
      openDrawingToolbarDropdownByIndex(7);
      delayedClickBySelector('[data-name="LineToolRiskRewardShort"]');
    },
  },

  // Select Fib Retracement
  {
    check: (e) => e.code === 'KeyC' && withoutAnyMetaKey(e),
    fn: () => {
      openDrawingToolbarDropdownByIndex(3);
      delayedClickBySelector('[data-name="LineToolFibRetracement"]');
    },
  },

  // Reset scale
  {
    check: (e) => e.code === 'KeyR' && withoutAnyMetaKey(e),
    fn: () => document.querySelector('.chart-container.active .js-btn-group-reset-scale > div').click(),
  },

  // Remove all shapes
  {
    check: (e) => e.code === 'KeyQ' && e.shiftKey,
    fn: () => runInWindow('TradingViewApi.activeChart().removeAllShapes()'),
  },

  // Remove selected shapes
  {
    check: (e) => e.code === 'KeyQ' && withoutAnyMetaKey(e),
    fn: () => delayedClickBySelector('.tv-floating-toolbar [data-name="remove"]'),
  },

  // Symbol switch menu
  {
    check: (e) => e.code === 'Backquote',
    fn: () => document.querySelector('#header-toolbar-symbol-search').click(),
  },
];

export const REPLY_COMMANDS = [
  // Jump to ... (backward)
  {
    check: (e) => e.code === 'KeyW' && withoutAnyMetaKey(e),
    fn: () => delayedClickBySelector(`.tv-floating-toolbar.tv-replay-toolbar .tv-floating-toolbar__widget:nth-child(1) > div`),
  },

  // Forward (by a candle)
  {
    check: (e) => e.code === 'KeyE' && withoutAnyMetaKey(e),
    fn: () => delayedClickBySelector(`.tv-floating-toolbar.tv-replay-toolbar .tv-floating-toolbar__widget:nth-child(3) > div`),
  },

  // Start / Pause
  {
    check: (e) => e.code === 'KeyT' && withoutAnyMetaKey(e),
    fn: () => delayedClickBySelector(`.tv-floating-toolbar.tv-replay-toolbar .tv-floating-toolbar__widget:nth-child(2) > div`),
  },
];
