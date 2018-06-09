// import _ from 'lodash';

const diffStyles = {

  nested: (key, oldValue, newValue, tabLvl, renderFunc, children) =>
    `${tabulate(tabLvl)}  ${key}: ${renderFunc(children, tabLvl + 1)}`,

  added: (key, oldValue, newValue, tabLvl) =>
    `${tabulate(tabLvl)}+ ${key}: ${stringify(newValue, tabLvl)}`,

  deleted: (key, oldValue, newValue, tabLvl) =>
    `${tabulate(tabLvl)}- ${key}: ${stringify(oldValue, tabLvl)}`,

  updated: (key, oldValue, newValue, tabLvl) => [`${tabulate(tabLvl)}+ ${key}: ${stringify(newValue, tabLvl)}`, `${tabulate(tabLvl)}- ${key}: ${stringify(oldValue, tabLvl)}`],

  unchanged: (key, oldValue, newValue, tabLvl) =>
    `${tabulate(tabLvl)}  ${key}: ${stringify(oldValue, tabLvl)}`,

};

const renderPlainDiff = (ast) => {};

export default renderPlainDiff;
