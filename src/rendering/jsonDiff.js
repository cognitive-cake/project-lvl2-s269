import _ from 'lodash';

const diffStyles = {

  nested: (key, type, oldValue, newValue, parent, renderFunc, children) =>
    renderFunc(children, `${parent}${key}.`),

  added: (key, type, oldValue, newValue, parent) => [{
    key: `${parent}${key}`,
    type,
    newValue,
  }],

  deleted: (key, type, oldValue, newValue, parent) => [{
    key: `${parent}${key}`,
    type,
    oldValue,
  }],

  updated: (key, type, oldValue, newValue, parent) => [{
    key: `${parent}${key}`,
    type,
    oldValue,
    newValue,
  }],

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
    }) => diffStyles[type](key, type, oldValue, newValue, parent, renderPlainDiff, children));

  return _.flatten(getDiffStyle(ast));
};

export default renderPlainDiff;
