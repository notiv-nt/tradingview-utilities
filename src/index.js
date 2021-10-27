import { log } from './utils';
import Mode from './Mode';
import Command from './Command';
import { fullScreenPatcher, keyEPatcher, keyWPatcher } from './patches';

keyWPatcher();
keyEPatcher();
fullScreenPatcher();

window.addEventListener('load', () => {
  log('Current MODE:', Mode.getCurrentMode());

  const command = new Command(Mode.getCurrentMode());

  Mode.onChange((mode) => {
    log('Changed MODE to', mode);
    command.setMode(mode);
  });
});
