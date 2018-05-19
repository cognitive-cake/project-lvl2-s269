import _ from 'lodash';
import processData from './model';

const tab = '  ';

const stringify = (val, tabLvl) => {
  if (_.isPlainObject(val)) {
    const result = Object.keys(val)
      .map(k => `${_.repeat(tab, tabLvl + 2)}  ${k}: ${val[k]}`);
    return `{\n${result.join('\n')}\n${_.repeat(tab, tabLvl + 1)}}`;
  }
  return val;
};

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
    if (_.isPlainObject(valBefore) && _.isPlainObject(valAfter)) {
      return `${_.repeat(tab, tabLvl)}  ${key}: {\n${_.flatten(render(children, tabLvl + 2)).join('\n')}\n${_.repeat(tab, tabLvl + 1)}}`;
    }
    return [`${_.repeat(tab, tabLvl)}+ ${key}: ${stringify(valAfter, tabLvl)}`, `${_.repeat(tab, tabLvl)}- ${key}: ${stringify(valBefore, tabLvl)}`];
  }
  if (keyStatus === 'added') {
    return `${_.repeat(tab, tabLvl)}+ ${key}: ${stringify(valAfter, tabLvl)}`;
  }
  return `${_.repeat(tab, tabLvl)}- ${key}: ${stringify(valBefore, tabLvl)}`;
});

const renderDiff = (pathToFile1, pathToFile2) => {
  const ast = processData(pathToFile1, pathToFile2);
  return `{\n${_.flatten(render(ast, 1)).join('\n')}\n}`;
};

export default renderDiff;
