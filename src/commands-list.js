import Mode, { MODES } from './Mode';
import { getCrosshairPrice } from './crosshair';
import { clickOnElement, flagCurrentSymbol, rotateChartType, selectDrawingTool, withoutAnyMetaKey } from './utils';

export const UI_COMMANDS = [
  // Select Horizontal Line
  {
    check: (e) => e.code === 'KeyA' && withoutAnyMetaKey(e),
    exec: () => selectDrawingTool(2, 'LineToolHorzLine'),
  },

  // Flag current symbol
  {
    check: (e) => e.code === 'KeyE' && withoutAnyMetaKey(e) && Mode.getCurrentMode() === MODES.DEFAULT,
    exec: () => flagCurrentSymbol(),
  },

  // Select Horizontal Ray
  {
    check: (e) => e.code === 'KeyS' && withoutAnyMetaKey(e),
    exec: () => selectDrawingTool(2, 'LineToolHorzRay'),
  },

  // Select Rectangle
  {
    check: (e) => e.code === 'KeyD' && withoutAnyMetaKey(e),
    exec: () => selectDrawingTool(6, 'LineToolRectangle'),
  },

  // Select Parallel Channel
  {
    check: (e) => e.code === 'KeyF' && withoutAnyMetaKey(e),
    exec: () => selectDrawingTool(2, 'LineToolParallelChannel'),
  },

  // Select Vertical line
  {
    check: (e) => e.code === 'KeyG' && withoutAnyMetaKey(e),
    exec: () => selectDrawingTool(2, 'LineToolVertLine'),
  },

  // Select Ray
  {
    check: (e) => e.code === 'KeyZ' && withoutAnyMetaKey(e),
    exec: () => selectDrawingTool(2, 'LineToolRay'),
  },

  // Select Trend line
  {
    check: (e) => e.code === 'KeyX' && withoutAnyMetaKey(e),
    exec: () => selectDrawingTool(2, 'LineToolTrendLine'),
  },

  // Select Long Position
  {
    check: (e) => e.code === 'KeyV' && withoutAnyMetaKey(e),
    exec: () => selectDrawingTool(5, 'LineToolRiskRewardLong'),
  },

  // Select Short Position
  {
    check: (e) => e.code === 'KeyB' && withoutAnyMetaKey(e),
    exec: () => selectDrawingTool(5, 'LineToolRiskRewardShort'),
  },

  // Select Fib Retracement
  {
    check: (e) => e.code === 'KeyC' && withoutAnyMetaKey(e),
    exec: () => selectDrawingTool(3, 'LineToolFibRetracement'),
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
      clickOnElement(`#drawing-toolbar > div > div > div > div > div:nth-child(4) > div > div > button`);
      clickOnElement('[data-name="remove-drawing-tools"]');
    },
  },

  // Remove selected shapes
  {
    check: (e) => e.code === 'KeyQ' && withoutAnyMetaKey(e),
    exec: () => clickOnElement('.tv-floating-toolbar [data-name="remove"]'),
  },

  // Remove selected shapes
  {
    check: (e) => e.code === 'KeyT' && withoutAnyMetaKey(e),
    exec: () => rotateChartType(),
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
