import fs from 'fs';
import path from 'path';
import getParser from './parser';
import genAST from './ast';

const processData = (path1, path2) => {
  const fileContent1 = fs.readFileSync(path1, 'utf-8');
  const fileContent2 = fs.readFileSync(path2, 'utf-8');
  const ext1 = path.extname(path1);
  const ext2 = path.extname(path2);

  const obj1 = getParser(ext1)(fileContent1);
  const obj2 = getParser(ext2)(fileContent2);

  return genAST(obj1, obj2);
};

export default processData;
