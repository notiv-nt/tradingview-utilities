import { prevent, isOnInputField, withoutAnyMetaKey } from './utils';
import { log } from './utils';
import { UI_COMMANDS } from './commands-list';
import { MODES } from './Mode';

export default class Command {
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
  }

  checkDigit(event) {
    const toolbarId = '#header-toolbar-intervals > div';

    prevent(event);

    if (!document.querySelector(toolbarId)) {
      return log(`${toolbarId} not found`);
    }

    const index = parseInt(event.code.replace('Digit', ''), 10);
    const element = document.querySelector(toolbarId).children[index - 1];

    if (!element) {
      return log(`Element "${toolbarId} children [${index}]" was not found`);
    }

    element.click();
  }

  destroy() {
    window.removeEventListener('keydown', this.onKeyDown, false);
  }
}
