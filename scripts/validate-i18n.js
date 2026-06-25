import fs from 'fs';
import path from 'path';
import { globSync } from 'glob';

const BASE_LANG = 'en';
const MFEs_PATH = 'apps';

let hasErrors = false;
