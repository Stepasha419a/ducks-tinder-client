import { applyEnv, EnvModes } from './apply-env';

import { Command, Option } from 'commander';

const program = new Command();

program.name('dtc').description('Ducks Tinder Client CLI').version('1.0.0');
