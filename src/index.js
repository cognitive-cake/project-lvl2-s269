import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import getParser, { genAST } from './parser';
import renderPrettyDiff from './renderPretty';

const genDiff = (pathToFile1, pathToFile2) => {
  const fileContent1 = fs.readFileSync(pathToFile1, 'utf-8');
  const fileContent2 = fs.readFileSync(pathToFile2, 'utf-8');
  const ext1 = path.extname(pathToFile1);
  const ext2 = path.extname(pathToFile2);

  const obj1 = getParser(ext1)(fileContent1);
  const obj2 = getParser(ext2)(fileContent2);

  const ast = genAST(obj1, obj2);

  return `{\n${_.flatten(renderPrettyDiff(ast, 1)).join('\n')}\n}`;
};

export default genDiff;

