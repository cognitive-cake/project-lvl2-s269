import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import parse from './parse';

const genDiff = (pathToFile1, pathToFile2) => {
  const fileContent1 = fs.readFileSync(pathToFile1);
  const fileContent2 = fs.readFileSync(pathToFile2);
  const ext1 = path.extname(pathToFile1);
  const ext2 = path.extname(pathToFile2);

  const obj1 = parse(ext1)(fileContent1);
  const obj2 = parse(ext2)(fileContent2);

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  const diff = _.union(keys1, keys2)
    .map((k) => {
      if (_.has(obj1, k) && _.has(obj2, k)) {
        if (obj1[k] === obj2[k]) {
          return `    ${k}: ${obj1[k]}`;
        }
        return [`  + ${k}: ${obj2[k]}`, `  - ${k}: ${obj1[k]}`];
      }
      if (!(_.has(obj1, k))) {
        return `  + ${k}: ${obj2[k]}`;
      }
      return `  - ${k}: ${obj1[k]}`;
    });

  const result = `{\n${_.flatten(diff).join('\n')}\n}`;

  return result;
};

export default genDiff;
