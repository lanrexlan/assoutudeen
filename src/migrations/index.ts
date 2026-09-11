import * as migration_20260820_185335_initial from './20260820_185335_initial';
import * as migration_20260911_103731_intake_round from './20260911_103731_intake_round';

export const migrations = [
  {
    up: migration_20260820_185335_initial.up,
    down: migration_20260820_185335_initial.down,
    name: '20260820_185335_initial',
  },
  {
    up: migration_20260911_103731_intake_round.up,
    down: migration_20260911_103731_intake_round.down,
    name: '20260911_103731_intake_round'
  },
];
