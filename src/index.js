import { log } from './utils';
import Mode from './Mode';
import './fullscreen-patcher';
import './styles';
import Command from './Command';

window.addEventListener('load', () => {
  log('Current MODE:', Mode.getCurrentMode());

  const command = new Command(Mode.getCurrentMode());

  Mode.onChange((mode) => {
    log('Changed MODE to', mode);
    command.setMode(mode);
  });
});
