import { log } from './utils';
import Mode from './Mode';
import Command from './Command';
import * as patches from './patches';
import { initCrosshair } from './crosshair';
import { insertStyles } from './styles';

patches.keyWPatcher();
patches.keyEPatcher();
patches.fullScreenPatcher();
patches.autoHideConfirmationDialog();
patches.cleanupSearchInput();

window.addEventListener('load', () => {
  log('Current MODE:', Mode.getCurrentMode());

  const command = new Command(Mode.getCurrentMode());

  Mode.onChange((mode) => {
    log('Changed MODE to', mode);
    command.setMode(mode);
  });

  initCrosshair();
  insertStyles();
});
