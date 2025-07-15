const fs = require('fs');
const path = require('path');

const envPath = path.resolve(__dirname, '../.env');

const envFile = fs.readFileSync(envPath, 'utf-8');

const lines = envFile
  .split('\n')
  .filter((line) => line.trim() !== '' && !line.trim().startsWith('#'));

const result = {};

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

fs.writeFileSync(path.resolve(__dirname, '../env-config.js'), output);

console.log('env-config.js создан.');
