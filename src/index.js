import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import getParser, { genAST, isObject } from './model';

const tab = '  ';

const stringify = (val, tabLvl) => {
  if (isObject(val)) {
    const result = Object.keys(val)
      .map(k => `${_.repeat(tab, tabLvl + 2)}  ${k}: ${val[k]}`);
    return `{\n${result.join('\n')}\n${_.repeat(tab, tabLvl + 1)}}`;
  }
  return val;
};

const renderDiff = (pathToFile1, pathToFile2) => {
  const fileContent1 = fs.readFileSync(pathToFile1, 'utf-8');
  const fileContent2 = fs.readFileSync(pathToFile2, 'utf-8');
  const ext1 = path.extname(pathToFile1);
  const ext2 = path.extname(pathToFile2);

  const obj1 = getParser(ext1)(fileContent1);
  const obj2 = getParser(ext2)(fileContent2);

  const ast = genAST(obj1, obj2);

  const render = (arr, tabLvl) => arr.map(({
    key,
    keyStatus,
    value: [valBefore, valAfter],
    children,
  }) => {
    if (keyStatus === 'include' && _.isEqual(valBefore, valAfter)) {
      return `${_.repeat(tab, tabLvl)}  ${key}: ${stringify(valBefore, tabLvl)}`;
    }
    if (keyStatus === 'include' && !(_.isEqual(valBefore, valAfter))) {
      if (isObject(valBefore) && isObject(valAfter)) {
        return `${_.repeat(tab, tabLvl)}  ${key}: {\n${_.flatten(render(children, tabLvl + 2)).join('\n')}\n${_.repeat(tab, tabLvl + 1)}}`;
      }
      return [`${_.repeat(tab, tabLvl)}+ ${key}: ${stringify(valAfter, tabLvl)}`, `${_.repeat(tab, tabLvl)}- ${key}: ${stringify(valBefore, tabLvl)}`];
    }
    if (keyStatus === 'added') {
      return `${_.repeat(tab, tabLvl)}+ ${key}: ${stringify(valAfter, tabLvl)}`;
    }
    return `${_.repeat(tab, tabLvl)}- ${key}: ${stringify(valBefore, tabLvl)}`;
  });

  const result = `{\n${_.flatten(render(ast, 1)).join('\n')}\n}`;

  return result;
};

export default renderDiff;
