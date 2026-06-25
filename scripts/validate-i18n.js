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
