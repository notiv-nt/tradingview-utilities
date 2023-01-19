import { clickOnElement, openDrawingToolbarDropdownByIndex, withoutAnyMetaKey } from './utils';
import Mode, { MODES } from './Mode';
import { getCrosshairPrice } from './crosshair';

export const UI_COMMANDS = [
  // Select Horizontal Line
  {
    check: (e) => e.code === 'KeyA' && withoutAnyMetaKey(e),
    exec: () => {
      openDrawingToolbarDropdownByIndex(2);
      clickOnElement('[data-name="LineToolHorzLine"]');
    },
  },

  // Select Horizontal Ray
  {
    check: (e) => e.code === 'KeyS' && withoutAnyMetaKey(e),
    exec: () => {
      openDrawingToolbarDropdownByIndex(2);
      clickOnElement('[data-name="LineToolHorzRay"]');
    },
  },

  // Select Rectangle
  {
    check: (e) => e.code === 'KeyD' && withoutAnyMetaKey(e),
    exec: () => {
      openDrawingToolbarDropdownByIndex(4);
      clickOnElement('[data-name="LineToolRectangle"]');
    },
  },

  // Select Parallel Channel
  {
    check: (e) => e.code === 'KeyF' && withoutAnyMetaKey(e),
    exec: () => {
      openDrawingToolbarDropdownByIndex(2);
      clickOnElement('[data-name="LineToolParallelChannel"]');
    },
  },

  // Select Vertical line
  {
    check: (e) => e.code === 'KeyG' && withoutAnyMetaKey(e),
    exec: () => {
      openDrawingToolbarDropdownByIndex(2);
      clickOnElement('[data-name="LineToolVertLine"]');
    },
  },

  // Select Ray
  {
    check: (e) => e.code === 'KeyZ' && withoutAnyMetaKey(e),
    exec: () => {
      openDrawingToolbarDropdownByIndex(2);
      clickOnElement('[data-name="LineToolRay"]');
    },
  },

  // Select Trend line
  {
    check: (e) => e.code === 'KeyX' && withoutAnyMetaKey(e),
    exec: () => {
      openDrawingToolbarDropdownByIndex(2);
      clickOnElement('[data-name="LineToolTrendLine"]');
    },
  },

  // Select Long Position
  {
    check: (e) => e.code === 'KeyV' && withoutAnyMetaKey(e),
    exec: () => {
      openDrawingToolbarDropdownByIndex(7);
      clickOnElement('[data-name="LineToolRiskRewardLong"]');
    },
  },

  // Select Short Position
  {
    check: (e) => e.code === 'KeyB' && withoutAnyMetaKey(e),
    exec: () => {
      openDrawingToolbarDropdownByIndex(7);
      clickOnElement('[data-name="LineToolRiskRewardShort"]');
    },
  },

  // Select Fib Retracement
  {
    check: (e) => e.code === 'KeyC' && withoutAnyMetaKey(e),
    exec: () => {
      openDrawingToolbarDropdownByIndex(3);
      clickOnElement('[data-name="LineToolFibRetracement"]');
    },
  },

  // Reset scale
  {
    check: (e) => e.code === 'KeyR' && withoutAnyMetaKey(e),
    exec: () => clickOnElement('.chart-container.active .js-btn-group-reset-scale > div'),
  },

  // Remove all shapes
  {
    check: (e) => e.code === 'KeyQ' && e.shiftKey,
    exec: () => {
      clickOnElement(`#drawing-toolbar > div > div > div > div > div:nth-child(4) [data-role="menu-handle"]`);
      clickOnElement('[data-name="remove-drawing-tools"]');
    },
  },

  // Remove selected shapes
  {
    check: (e) => e.code === 'KeyQ' && withoutAnyMetaKey(e),
    exec: () => clickOnElement('.tv-floating-toolbar [data-name="remove"]'),
  },

  // Symbol switch menu
  {
    check: (e) => e.code === 'Backquote',
    exec: () => clickOnElement('#header-toolbar-symbol-search'),
  },

  // Jump to ... (backward)
  {
    check: (e) => e.code === 'KeyW' && withoutAnyMetaKey(e) && Mode.getCurrentMode() === MODES.DEFAULT,
    exec: () => clickOnElement('#header-toolbar-replay'),
  },

  // Copy crosshair price to clipboard
  {
    check: (e) => e.code === 'KeyN' && withoutAnyMetaKey(e),
    exec: () => navigator.clipboard.writeText(getCrosshairPrice()),
  },

  // Jump to ... (backward)
  {
    check: (e) => e.code === 'KeyW' && withoutAnyMetaKey(e) && Mode.getCurrentMode() === MODES.REPLY,
    exec: () => clickOnElement(`[class*="replayToolbar"] > [class*="controlsPanel"] > div:nth-child(1) span`),
  },

  // Start / Pause
  {
    check: (e) => e.code === 'KeyT' && withoutAnyMetaKey(e) && Mode.getCurrentMode() === MODES.REPLY,
    exec: () => clickOnElement(`[class*="replayToolbar"] > [class*="controlsPanel"] > div:nth-child(3) span`),
  },

  // Forward (by a candle)
  {
    check: (e) => e.code === 'KeyE' && withoutAnyMetaKey(e) && Mode.getCurrentMode() === MODES.REPLY,
    exec: () => clickOnElement(`[class*="replayToolbar"] > [class*="controlsPanel"] > div:nth-child(4) span`),
  },
];
