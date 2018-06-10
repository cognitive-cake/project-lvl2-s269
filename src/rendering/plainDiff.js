import _ from 'lodash';

const stringify = (val) => {
  if (_.isPlainObject(val)) {
    return 'complex value';
  }
  return `'${val}'`;
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

};

const renderPlainDiff = (ast, parent = '') => {
  const getDiffStyle = node => node
    .filter(({ type }) => type !== 'unchanged')
    .map(({
      key,
      type,
      oldValue,
      newValue,
      children,
    }) => diffStyles[type](key, oldValue, newValue, parent, renderPlainDiff, children));

  return getDiffStyle(ast).join('\n');
};

export default renderPlainDiff;
