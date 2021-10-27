import { prevent, isOnInputField, withoutAnyMetaKey } from './utils';
import { log } from './utils';
import { UI_COMMANDS, REPLY_COMMANDS } from './commands-list';
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

  onKeyDown(event) {
    // Skip input
    if (isOnInputField(event)) {
      return;
    }

    if (event.code.match('Digit') && withoutAnyMetaKey(event)) {
      this.checkDigit(event);
    }

    const checkAndExecCommand = (command) => {
      if (command.check(event)) {
        prevent(event);
        command.exec();
      }
    };

    UI_COMMANDS.forEach((command) => checkAndExecCommand(command));

    if (this.mode === MODES.REPLY) {
      REPLY_COMMANDS.forEach((command) => checkAndExecCommand(command));
    }
  }

  checkDigit(event) {
    prevent(event);

    if (!document.querySelector('#header-toolbar-intervals')) {
      return log('#header-toolbar-intervals not found');
    }

    const index = event.code.replace('Digit', '');
    const element = document.querySelector('#header-toolbar-intervals').children[index - 1];

    if (!element) {
      return log('Element was not found', index);
    }

    element.click();
  }

  destroy() {
    window.removeEventListener('keydown', this.onKeyDown, false);
  }
}
