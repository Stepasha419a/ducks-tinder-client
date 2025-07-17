import { applyEnv, EnvModes } from './apply-env';

import { Command, Option } from 'commander';

interface ApplyEnvOptions {
  mode: EnvModes;
}

const program = new Command();

program.name('dtc').description('Ducks Tinder Client CLI').version('1.0.0');

program
  .command('apply-env')
  .description('Apply env from env-file to browser window')
  .addOption(
    new Option('-m, --mode <mode>', 'Env mode')
      .choices([EnvModes.Dev, EnvModes.Prod, EnvModes.Demo])
      .default(EnvModes.Dev)
  )
  .action((options: ApplyEnvOptions) => {
    applyEnv(options.mode);
  });
