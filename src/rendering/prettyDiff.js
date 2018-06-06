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

  nested: (key, value, tabLvl, renderFunc, children) =>
    `${tabulate(tabLvl)}  ${key}: ${renderFunc(children, tabLvl + 1)}`,

  added: (key, value, tabLvl) =>
    `${tabulate(tabLvl)}+ ${key}: ${stringify(value, tabLvl)}`,

  deleted: (key, value, tabLvl) =>
    `${tabulate(tabLvl)}- ${key}: ${stringify(value, tabLvl)}`,

  updated: (key, { oldValue, newValue }, tabLvl) =>
    [`${tabulate(tabLvl)}+ ${key}: ${stringify(newValue, tabLvl)}`, `${tabulate(tabLvl)}- ${key}: ${stringify(oldValue, tabLvl)}`],

  unchanged: (key, value, tabLvl) =>
    `${tabulate(tabLvl)}  ${key}: ${stringify(value, tabLvl)}`,

};

const renderPrettyDiff = (ast, currentTabLvl) => {
  const getDiffStyle = (node, tabLvl) => node.map(({
    key,
    type,
    value,
    children,
  }) => diffStyles[type](key, value, tabLvl, renderPrettyDiff, children));

  return `{\n${_.flatten(getDiffStyle(ast, currentTabLvl + 1)).join('\n')}\n${tabulate(currentTabLvl)}}`;
};


export default renderPrettyDiff;
