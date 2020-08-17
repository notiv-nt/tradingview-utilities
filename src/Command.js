import { prevent, isAnyMetaKey, isOnInput } from './utils';
import { log } from './utils';
import { TOOLBAR_COMMANDS, OBJECT_COMMANDS, UI_COMMANDS, REPLY_COMMANDS } from './commands-list';
import { MODES } from './Mode';

export default class Commands {
  constructor(mode) {
    this.mode = mode;
    this.onKeyDown = this.onKeyDown.bind(this);

    window.addEventListener('keydown', this.onKeyDown, false);
  }

  setMode(mode) {
    this.mode = mode;
  }

  onKeyDown(e) {
    // Skip input
    if (isOnInput(e)) {
      return;
    }

    if (e.code.match('Digit') && !isAnyMetaKey(e)) {
      this.checkDigit(e);
    }

    this.checkElementsToolbar(e);
    this.checkObjectCommands(e);
    this.checkUiCommands(e);

    if (this.mode === MODES.REPLY) {
      this.checkReplyCommands(e);
    }
  }

  checkDigit(e) {
    prevent(e);

    if (!document.querySelector('#header-toolbar-intervals')) {
      return log('#header-toolbar-intervals not found');
    }

    const index = e.code.replace('Digit', '');
    const elem = document.querySelector('#header-toolbar-intervals').children[index - 1];

    if (!elem) {
      return log('Element was not found', index);
    }

    elem.click();
  }

  checkElementsToolbar(e) {
    Object.entries(TOOLBAR_COMMANDS).forEach((cmd) => {
      if (e.code === cmd[0] && !isAnyMetaKey(e)) {
        prevent(e);

        const btn = document.querySelector(`.tv-floating-toolbar ${cmd[1]}`);
        btn && btn.click();
      }
    });
  }

  checkObjectCommands(e) {
    Object.entries(OBJECT_COMMANDS).forEach((cmd) => {
      if (e.code === cmd[0] && !isAnyMetaKey(e)) {
        prevent(e);

        const btn = document.querySelector(`.tv-floating-toolbar.tv-linetool-properties-toolbar .tv-floating-toolbar__widget ${cmd[1]}`);
        btn && btn.click();
      }
    });
  }

  checkUiCommands(e) {
    UI_COMMANDS.forEach((cmd) => {
      if (cmd.check(e)) {
        prevent(e);
        cmd.fn();
      }
    });
  }

  checkReplyCommands(e) {
    REPLY_COMMANDS.forEach((cmd) => {
      if (cmd.check(e)) {
        prevent(e);
        cmd.fn();
      }
    });
  }

  destroy() {
    window.removeEventListener('keydown', this.onKeyDown, false);
  }
}
