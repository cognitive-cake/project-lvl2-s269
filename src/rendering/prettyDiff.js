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

  nested: (key, oldValue, newValue, tabLvl, renderFunc, children) =>
    `${tabulate(tabLvl)}  ${key}: ${renderFunc(children, tabLvl + 1)}`,

  added: (key, oldValue, newValue, tabLvl) =>
    `${tabulate(tabLvl)}+ ${key}: ${stringify(newValue, tabLvl)}`,

  deleted: (key, oldValue, newValue, tabLvl) =>
    `${tabulate(tabLvl)}- ${key}: ${stringify(oldValue, tabLvl)}`,

  updated: (key, oldValue, newValue, tabLvl) =>
    [`${tabulate(tabLvl)}+ ${key}: ${stringify(newValue, tabLvl)}`, `${tabulate(tabLvl)}- ${key}: ${stringify(oldValue, tabLvl)}`],

  unchanged: (key, oldValue, newValue, tabLvl) =>
    `${tabulate(tabLvl)}  ${key}: ${stringify(oldValue, tabLvl)}`,

};

const renderPrettyDiff = (ast, currentTabLvl = 0) => {
  const getDiffStyle = (node, tabLvl) => node.map(({
    key,
    type,
    oldValue,
    newValue,
    children,
  }) => diffStyles[type](key, oldValue, newValue, tabLvl, renderPrettyDiff, children));

  return `{\n${_.flatten(getDiffStyle(ast, currentTabLvl + 1)).join('\n')}\n${tabulate(currentTabLvl)}}`;
};


export default renderPrettyDiff;
