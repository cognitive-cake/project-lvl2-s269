import fs from 'fs';
import _ from 'lodash';

export const getDiffOfVal = (key, obj1, obj2) => {
  if (obj1[key] === obj2[key]) {
    return `    ${key}: ${obj1[key]}\n`;
  }
  return `  + ${key}: ${obj2[key]}\n  - ${key}: ${obj1[key]}\n`;
};


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
        return getDiffOfVal(k, obj1, obj2);
      }
      if (!(_.has(obj1, k))) {
        return `  + ${k}: ${obj2[k]}\n`;
      }
      return `  - ${k}: ${obj1[k]}\n`;
    });

  const result = ['{\n'].concat(diff).concat('}').join('');

  return result;
};

export default genDiff;
