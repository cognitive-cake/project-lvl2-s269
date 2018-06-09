import _ from 'lodash';

const stylesForValues = [
  {
    check: val => typeof val === 'number',
    process: _.identity
  },
  {
    check: val => typeof val === 'string',
    process: val => `'${val}'`
  },
  {
    check: val => typeof val === 'boolean',
    process: _.identity
  }
];

const stringify = (val) => {
  if (_.isPlainObject(val)) {
    return 'complex value';
  }
  const { process } =_.find(stylesForValues, ({ check }) => check(val));
  return process(val);
};

const diffStyles = {

  nested: (key, oldValue, newValue, parent, renderFunc, children) =>
    renderFunc(children, `${parent}${key}.`),

  added: (key, oldValue, newValue, parent) =>
    `Property '${parent}${key}' was added with value: ${stringify(newValue)}`,

  deleted: (key, oldValue, newValue, parent) =>
    `Property '${parent}${key}' was deleted`,

  updated: (key, oldValue, newValue, parent) => 
    `Property '${parent}${key}' was updated. From ${stringify(oldValue)} to ${stringify(newValue)}`,

  unchanged: () => ''

};

const renderPlainDiff = (ast, parent = '') => {
  const getDiffStyle = (node) => node.map(({
    key,
    type,
    oldValue,
    newValue,
    children,
  }) => diffStyles[type](key, oldValue, newValue, parent, renderPlainDiff, children));

  return getDiffStyle(ast)
    .filter(diff => diff !== '')
    .join('\n');
};

export default renderPlainDiff;
