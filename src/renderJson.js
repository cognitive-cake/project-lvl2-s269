import _ from 'lodash';

const tab = '  ';

const isPlainObject = (val) => {
  if (!(val instanceof Object)) {
    return false;
  }
  if ((val instanceof Object) && !(val instanceof Array)) {
    return true;
  }
  return false;
};

const stringify = (val, tabLvl) => {
  if (!isPlainObject(val)) {
    return val;
  }
  const result = Object.keys(val)
    .map(k => `${_.repeat(tab, tabLvl + 2)}  ${k}: ${val[k]}`);
  return `{\n${result.join('\n')}\n${_.repeat(tab, tabLvl + 1)}}`;
};

const renderJsonDiff = (arr, tabLvl) => arr.map(({
  key,
  keyStatus,
  value: [valBefore, valAfter],
  children,
}) => {
  if (keyStatus === 'not updated') {
    return `${_.repeat(tab, tabLvl)}  ${key}: ${stringify(valBefore, tabLvl)}`;
  }
  if (keyStatus === 'updated') {
    if (isPlainObject(valBefore) && isPlainObject(valAfter)) {
      return `${_.repeat(tab, tabLvl)}  ${key}: {\n${_.flatten(renderJsonDiff(children, tabLvl + 2)).join('\n')}\n${_.repeat(tab, tabLvl + 1)}}`;
    }
    return [`${_.repeat(tab, tabLvl)}+ ${key}: ${stringify(valAfter, tabLvl)}`, `${_.repeat(tab, tabLvl)}- ${key}: ${stringify(valBefore, tabLvl)}`];
  }
  if (keyStatus === 'added') {
    return `${_.repeat(tab, tabLvl)}+ ${key}: ${stringify(valAfter, tabLvl)}`;
  }
  return `${_.repeat(tab, tabLvl)}- ${key}: ${stringify(valBefore, tabLvl)}`;
});

export default renderJsonDiff;
