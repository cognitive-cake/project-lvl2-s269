import fs from 'fs';
import path from 'path';
import _ from 'lodash';

const adapter = (pathToFile1, pathToFile2) => {
  const fileExtension = path.extname(pathToFile1);
  const mapping = {
    .json: JSON.parse(fileContent1),
    .yml: JSON.parse(fileContent1),
    .yaml: JSON.parse(fileContent1),
  };
  return mapping[fileExtension];
};

// На вход принимаются два файла. Нужно: определить формат, на основе формата выбрать правильный парсер.

const genDiff = (pathToFile1, pathToFile2) => {
  const fileContent1 = fs.readFileSync(pathToFile1);
  const fileContent2 = fs.readFileSync(pathToFile2);
  const obj1 = JSON.parse(fileContent1);
  const obj2 = JSON.parse(fileContent2);

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  const diff = _.union(keys1, keys2)
    .map((k) => {
      if (_.has(obj1, k) && _.has(obj2, k)) {
        if (obj1[k] === obj2[k]) {
          return `    ${k}: ${obj1[k]}\n`;
        }
        return `  + ${k}: ${obj2[k]}\n  - ${k}: ${obj1[k]}\n`;
      }
      if (!(_.has(obj1, k))) {
        return `  + ${k}: ${obj2[k]}\n`;
      }
      return `  - ${k}: ${obj1[k]}\n`;
    });

  const result = `{\n${diff.join('')}}`;

  return result;
};

export default genDiff;
