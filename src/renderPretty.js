import _ from 'lodash';

const tab = '  ';

const stringify = (val, tabLvl) => {
  if (!_.isPlainObject(val)) {
    return val;
  }
  const result = Object.keys(val)
    .map(k => `${_.repeat(tab, tabLvl + 2)}  ${k}: ${val[k]}`);
  return `{\n${result.join('\n')}\n${_.repeat(tab, tabLvl + 1)}}`;
};

const renderPrettyDiff = (arr, tabLvl) => arr.map(({
  key,
  keyStatus,
  value: [valBefore, valAfter],
  children,
}) => {
  if (keyStatus === 'not updated') {
    return `${_.repeat(tab, tabLvl)}  ${key}: ${stringify(valBefore, tabLvl)}`;
  }
  if (keyStatus === 'updated') {
    if (_.isPlainObject(valBefore) && _.isPlainObject(valAfter)) {
      return `${_.repeat(tab, tabLvl)}  ${key}: {\n${_.flatten(renderPrettyDiff(children, tabLvl + 2)).join('\n')}\n${_.repeat(tab, tabLvl + 1)}}`;
    }
    return [`${_.repeat(tab, tabLvl)}+ ${key}: ${stringify(valAfter, tabLvl)}`, `${_.repeat(tab, tabLvl)}- ${key}: ${stringify(valBefore, tabLvl)}`];
  }
  if (keyStatus === 'added') {
    return `${_.repeat(tab, tabLvl)}+ ${key}: ${stringify(valAfter, tabLvl)}`;
  }
  return `${_.repeat(tab, tabLvl)}- ${key}: ${stringify(valBefore, tabLvl)}`;
});

export default renderPrettyDiff;
