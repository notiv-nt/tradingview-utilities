import { log } from './utils';
import Mode from './Mode';
import Command from './Command';
import * as patches from './patches';

patches.keyWPatcher();
patches.keyEPatcher();
patches.fullScreenPatcher();

window.addEventListener('load', () => {
  log('Current MODE:', Mode.getCurrentMode());

  const command = new Command(Mode.getCurrentMode());

  Mode.onChange((mode) => {
    log('Changed MODE to', mode);
    command.setMode(mode);
  });
});
