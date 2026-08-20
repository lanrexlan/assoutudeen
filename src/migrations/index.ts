import * as migration_20260820_185335_initial from './20260820_185335_initial';

export const migrations = [
  {
    up: migration_20260820_185335_initial.up,
    down: migration_20260820_185335_initial.down,
    name: '20260820_185335_initial'
  },
];
