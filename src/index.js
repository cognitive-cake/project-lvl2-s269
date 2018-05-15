import fs from 'fs';
import _ from 'lodash';

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
