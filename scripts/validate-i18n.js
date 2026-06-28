import fs from 'fs';
import path from 'path';
import { globSync } from 'glob';

const BASE_LANG = 'en';
const MFEs_PATH = 'apps';

let hasErrors = false;

function getDeepKeys(obj, prefix = '') {
  return Object.keys(obj).reduce((res, el) => {
    if (Array.isArray(obj[el])) return res;
    if (typeof obj[el] === 'object' && obj[el] !== null) {
      res.push(...getDeepKeys(obj[el], prefix + el + '.'));
    } else {
      res.push(prefix + el);
    }
    return res;
  }, []);
}

const localesPaths = globSync(`${MFEs_PATH}/*/public/locales`);

localesPaths.forEach((localesPath) => {
  const baseDir = path.join(localesPath, BASE_LANG);
  if (!fs.existsSync(baseDir)) return;

  const namespaces = fs.readdirSync(baseDir).filter((f) => f.endsWith('.json'));
  const otherLangs = fs.readdirSync(localesPath).filter((l) => l !== BASE_LANG);

  namespaces.forEach((ns) => {
    const baseContent = JSON.parse(
      fs.readFileSync(path.join(baseDir, ns), 'utf-8'),
    );
    const baseKeys = getDeepKeys(baseContent);

    otherLangs.forEach((lang) => {
      const targetPath = path.join(localesPath, lang, ns);

      if (!fs.existsSync(targetPath)) {
        console.error(`Missing namespace file: ${targetPath}`);
        hasErrors = true;
      }

      const targetContent = JSON.parse(fs.readFileSync(targetPath, 'utf-8'));
      const targetKeys = getDeepKeys(targetContent);

      const missingKeys = baseKeys.filter((k) => !targetKeys.includes(k));
      if (missingKeys.length > 0) {
        console.error(
          `[${lang}/${ns}] Missing keys in ${localesPath}:`,
          missingKeys,
        );
        hasErrors = true;
      }

      const extraKeys = targetKeys.filter((k) => !baseKeys.includes(k));
      if (extraKeys.length > 0) {
        console.error(
          `[${lang}/${ns}] Extra keys found (not in EN):`,
          extraKeys,
        );
        hasErrors = true;
      }
    });
  });
});

if (hasErrors) process.exit(1);
console.log('i18n validation passed');
