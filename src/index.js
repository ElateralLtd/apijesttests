import path from 'path';
import { generateTestCode } from './support/generateResourcesCode';
const fs = require('fs');
const fileName = path.resolve('config.json');
const config = require(fileName);

if (process.env.apiFQDN) {
  config.apiFQDN = process.env.apiFQDN;
  config.accountFQDN = process.env.accountFQDN;
  config.webAppFQDN = process.env.webAppFQDN;

  fs.writeFile(fileName, JSON.stringify(config, null, 2), err => {
    if (err) throw err;
  });
}

generateTestCode();
