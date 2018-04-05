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

  const diffs = Object
    .keys(obj1)
    .reduce((arr, k) => [...arr, (_.has(obj2, k) ? getDiffOfVal(k, obj1, obj2) : `  - ${k}: ${obj1[k]}\n`)], ['{\n']);

  const obj2NewProps = Object
    .keys(obj2)
    .filter(k => !(_.has(obj1, k)))
    .map(k => `  + ${k}: ${obj2[k]}\n`)
    .concat('}');

  const result = diffs.concat(obj2NewProps).join('');

  // console.log('obj1 = ', obj1);
  // console.log('obj2 = ', obj2);
  // console.log(result);
  return result;
};

export default genDiff;
