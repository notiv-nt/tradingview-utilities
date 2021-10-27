export const MODES = {
  DEFAULT: 'DEFAULT',
  REPLY: 'REPLY',
};

class Mode {
  constructor() {
    this.mode = null;
    this.onChangeEvents = [];
    this.interval = null;
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
    const toolbar = document.querySelector('.tv-replay-toolbar');

    if (toolbar && !toolbar.classList.contains('i-hidden')) {
      return MODES.REPLY;
    } else {
      return MODES.DEFAULT;
    }
  }

  onChange(fn) {
    this.onChangeEvents.push(fn);
  }

  startTimer() {
    this.interval = setInterval(() => {
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
    clearInterval(this.interval);
  }
}

export default new Mode();
