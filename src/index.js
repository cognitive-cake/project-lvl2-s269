import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import getParser, { genAST, isObject } from './model';

const renderDiff = (pathToFile1, pathToFile2) => {
  const fileContent1 = fs.readFileSync(pathToFile1, 'utf-8');
  const fileContent2 = fs.readFileSync(pathToFile2, 'utf-8');
  const ext1 = path.extname(pathToFile1);
  const ext2 = path.extname(pathToFile2);

  const obj1 = getParser(ext1)(fileContent1);
  const obj2 = getParser(ext2)(fileContent2);

  const ast = genAST(obj1, obj2);

  const render = arr => arr.map(({ key, keyStatus, value }) => {
    if (keyStatus === 'include' && _.isEqual(value[0], value[1])) {
      return `    ${key}: ${value[0]}`;
    }
    if (keyStatus === 'include' && !(_.isEqual(value[0], value[1]))) {
      if ()
      return [`  + ${key}: ${value[1]}`, `  - ${key}: ${value[0]}`];
    }
    if (keyStatus === 'added') {
      return `  + ${key}: ${value[1]}`;
    }
    return `  - ${key}: ${value[0]}`;
  });

  const result = `{\n${_.flatten(render(ast)).join('\n')}\n}`;

  // const diff = _.union(keys1, keys2)
  //   .map((k) => {
  //     if (_.has(obj1, k) && _.has(obj2, k)) {
  //       if (obj1[k] === obj2[k]) {
  //         return `    ${k}: ${obj1[k]}`;
  //       }
  //       return [`  + ${k}: ${obj2[k]}`, `  - ${k}: ${obj1[k]}`];
  //     }
  //     if (!(_.has(obj1, k))) {
  //       return `  + ${k}: ${obj2[k]}`;
  //     }
  //     return `  - ${k}: ${obj1[k]}`;
  //   });

  // const result = `{\n${_.flatten(render).join('\n')}\n}`;

  return result;
};

export default renderDiff;
