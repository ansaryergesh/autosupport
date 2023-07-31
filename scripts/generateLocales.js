import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import kz from '../src/locales/kz.js';
import en from '../src/locales/en.js';
import ru from '../src/locales/ru.js';

const filesData = {
  ru,
  kz,
  en,
};

const __dirname = fileURLToPath(new URL('.', import.meta.url));

// JSON stringify and write to file
export const writeLocale = (locale, data) => {
  const filePath = path.join(__dirname, `../src/locales/${locale}/translation.json`);

  // remove old file
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
  // write new file
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

// Generate locales
export const generateLocales = () => {
  Object.keys(filesData).forEach((locale) => {
    writeLocale(locale, filesData[locale]);
  });
};

generateLocales();
