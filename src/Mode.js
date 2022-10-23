export const MODES = {
  DEFAULT: 'DEFAULT',
  REPLY: 'REPLY',
};

class Mode {
  constructor() {
    this.mode = null;
    this.onChangeEvents = [];
    this.setModeInterval = null;
    this.checkModeInterval = 200;

    this.setMode();
    this.startTimer();
  }

  setMode(mode) {
    this.mode = mode || this.getCurrentMode();

    this.onChangeEvents.forEach((event) => event(this.mode));

    return this.mode;
  }

  getCurrentMode() {
    const toolbar = document.querySelector('[class*="replayToolbar"]');

    if (toolbar) {
      return MODES.REPLY;
    } else {
      return MODES.DEFAULT;
    }
  }

  onChange(fn) {
    this.onChangeEvents.push(fn);
  }

  startTimer() {
    this.setModeInterval = setInterval(() => {
      const newMode = this.getCurrentMode();

      if (this.mode === MODES.DEFAULT && newMode === MODES.REPLY) {
        this.setMode(MODES.REPLY);
      }

      if (this.mode === MODES.REPLY && newMode === MODES.DEFAULT) {
        this.setMode(MODES.DEFAULT);
      }
    }, this.checkModeInterval);
  }

  destroy() {
    clearInterval(this.setModeInterval);
  }
}

export default new Mode();
