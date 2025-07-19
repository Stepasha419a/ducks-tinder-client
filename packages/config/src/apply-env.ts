import * as fs from 'fs';
import * as path from 'path';

export enum EnvModes {
  Dev = 'dev',
  Demo = 'demo',
  Prod = 'prod',
}

export function applyEnv(mode: EnvModes) {
  console.log(`Env mode: ${mode}`);

  const envPath = path.resolve(process.cwd(), `.env.${mode}`);

  const envFile = fs.readFileSync(envPath, 'utf-8');

  const lines = envFile
    .split('\n')
    .filter((line) => line.trim() !== '' && !line.trim().startsWith('#'));

  const result: Record<string, string> = {};

  for (const line of lines) {
    const [key, ...rest] = line.split('=');
    const envKey = key.trim();
    const envValueFromEnv = process.env[envKey];
    const envValueFromFile = rest.join('=').trim().replace(/^"|"$/g, '');

    result[envKey] = envValueFromEnv || envValueFromFile;
  }

  const output = [
    'window._env_ = {',
    ...Object.entries(result).map(([key, value]) => `  ${key}: "${value}",`),
    '};',
  ].join('\n');

  fs.writeFileSync(path.resolve(process.cwd(), 'env-config.js'), output);

  console.log('Create env-config.js');
}
