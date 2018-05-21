import fs from 'fs';
import path from 'path';
import parseFileContent from './parser';
import genAST from './ast';
import renderDiff from './rendering';

const genDiff = (pathToFile1, pathToFile2, options) => {
  const fileContent1 = fs.readFileSync(pathToFile1, 'utf-8');
  const fileContent2 = fs.readFileSync(pathToFile2, 'utf-8');
  const ext1 = path.extname(pathToFile1);
  const ext2 = path.extname(pathToFile2);

  const obj1 = parseFileContent(ext1)(fileContent1);
  const obj2 = parseFileContent(ext2)(fileContent2);

  const ast = genAST(obj1, obj2);

  return renderDiff(ast, options);
};

export default genDiff;

