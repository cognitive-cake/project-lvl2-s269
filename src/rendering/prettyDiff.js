import _ from 'lodash';

const tab = '  ';

const tabulate = (tabLvl, shift = 0) => _.repeat(tab, tabLvl + shift);

const stringify = (val, tabLvl) => {
  if (!_.isPlainObject(val)) {
    return val;
  }
  const result = Object.keys(val)
    .map(k => `${tabulate(tabLvl, 2)}  ${k}: ${val[k]}`);
  return `{\n${result.join('\n')}\n${tabulate(tabLvl, 1)}}`;
};

const diffStyles = {

  nested: (key, valueOld, valueNew, tabLvl, renderFunc, children) =>
    `${tabulate(tabLvl)}  ${key}: ${renderFunc(children, tabLvl + 1)}`,

  added: (key, valueOld, valueNew, tabLvl) =>
    `${tabulate(tabLvl)}+ ${key}: ${stringify(valueNew, tabLvl)}`,

  deleted: (key, valueOld, valueNew, tabLvl) =>
    `${tabulate(tabLvl)}- ${key}: ${stringify(valueOld, tabLvl)}`,

  updated: (key, valueOld, valueNew, tabLvl) =>
    [`${tabulate(tabLvl)}+ ${key}: ${stringify(valueNew, tabLvl)}`, `${tabulate(tabLvl)}- ${key}: ${stringify(valueOld, tabLvl)}`],

  unchanged: (key, valueOld, valueNew, tabLvl) =>
    `${tabulate(tabLvl)}  ${key}: ${stringify(valueOld, tabLvl)}`,

};

const renderPrettyDiff = (ast, currentTabLvl) => {
  const getDiffStyle = (node, tabLvl) => node.map(({
    key,
    type,
    valueOld,
    valueNew,
    children,
  }) => diffStyles[type](key, valueOld, valueNew, tabLvl, renderPrettyDiff, children));

  return `{\n${_.flatten(getDiffStyle(ast, currentTabLvl + 1)).join('\n')}\n${tabulate(currentTabLvl)}}`;
};


export default renderPrettyDiff;
