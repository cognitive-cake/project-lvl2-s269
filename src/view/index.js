import _ from 'lodash';
import processData from '../model';
import renderJsonDiff from './renderJson';

const genDiff = (pathToFile1, pathToFile2) => {
  const ast = processData(pathToFile1, pathToFile2);
  return `{\n${_.flatten(renderJsonDiff(ast, 1)).join('\n')}\n}`;
};

export default genDiff;

