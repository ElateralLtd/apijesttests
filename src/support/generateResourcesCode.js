import path from 'path';
const fs = require('fs');
import { fileHeader, getMethod, postMethod, putMethod, deleteMethod } from './codeSnippets';
import { getSwaggerJson } from '../getSwaggerJson';

function getFilesInFolder(folder) {
  return fs.readdirSync(folder)
    .filter(file => file.endsWith('.js'))
    .map(file => file.replace('.js', ''));
}

function createFunctionName(resourcePath, method) {
  let name;
  switch (method) {
    case 'post':
      name = 'create';
      break;
    case 'put':
      name = 'modify';
      break;
    case 'delete':
      name = 'delete';
      break;
    default:
      name = 'get';
      break;
  }
  const words = resourcePath.split('/');
  words.forEach((w, i) => {
    let word = w.replace(/(\}|\{)/gm, '');
    word = word.charAt(0).toUpperCase() + word.slice(1);
    name += word;
  });
  return name;
}

function getResources(allRequests) {
  const resources = {};
  Object.keys(allRequests).forEach(node => {
    const name = node.split('/')[1];
    if (!resources[name]) {
      resources[name] = [];
    }
    Object.keys(allRequests[node]).forEach((method, index) => {
      resources[name].push({ method, node });
    });
  });
  return resources;
}

function generateResourcesFiles(allResources, actualResourcesFolder, newResourcesFolder) {
  const actualResources = getFilesInFolder(actualResourcesFolder);

  if (!fs.existsSync(newResourcesFolder)) {
    fs.mkdirSync(newResourcesFolder);
  }

  Object.keys(allResources).forEach(res => {
    if (!actualResources.includes(res)) {
      let fileSource = fileHeader();
      allResources[res].forEach(item => {
        const methodName = createFunctionName(item.node, item.method);
        switch (item.method) {
          case 'post':
            fileSource += postMethod(methodName, item.node);
            break;
          case 'put':
            fileSource += putMethod(methodName, item.node);
            break;
          case 'delete':
            fileSource += deleteMethod(methodName, item.node);
            break;
          case 'get':
            fileSource += getMethod(methodName, item.node);
            break;
          default:
            Error('Method is not defined');
            break;
        }
      });

      const fileName = path.join(newResourcesFolder, `${res}.js`);

      fs.writeFile(fileName, fileSource, err => {
        if (err) throw err;
      });
    }
  });
}

export function generateTestCode() {
  getSwaggerJson()
    .then(response => {
      generateResourcesFiles(
        getResources(response.body.paths),
        './src/resources',
        './src/resources/not_tested');
    })
    .catch(err => {
      Error('Swagger Json not found');
      Error(err);
    });
}
