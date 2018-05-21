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

const diffStyles = {

  nested: (name, value, tabLvl, renderFunc) =>
    `${_.repeat(tab, tabLvl)}  ${name}: {\n${_.flatten(renderFunc(value, tabLvl + 2)).join('\n')}\n${_.repeat(tab, tabLvl + 1)}}`,


  added: (name, value, tabLvl) =>
    `${_.repeat(tab, tabLvl)}+ ${name}: ${stringify(value, tabLvl)}`,


  deleted: (name, value, tabLvl) =>
    `${_.repeat(tab, tabLvl)}- ${name}: ${stringify(value, tabLvl)}`,


  updated: (name, { oldValue, newValue }, tabLvl) =>
    [`${_.repeat(tab, tabLvl)}+ ${name}: ${stringify(newValue, tabLvl)}`, `${_.repeat(tab, tabLvl)}- ${name}: ${stringify(oldValue, tabLvl)}`],


  unchanged: (name, value, tabLvl) =>
    `${_.repeat(tab, tabLvl)}  ${name}: ${stringify(value, tabLvl)}`,

};

const renderPrettyDiff = (ast, tabLvl) => ast.map(({ name, type, value }) =>
  diffStyles[type](name, value, tabLvl, renderPrettyDiff));

export default renderPrettyDiff;
