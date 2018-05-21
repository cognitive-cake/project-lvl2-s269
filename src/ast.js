import _ from 'lodash';

const keyTypes = [
  {
    type: 'nested',
    check: (key, firstConfig, secondConfig) =>
      _.isPlainObject(firstConfig[key]) && _.isPlainObject(secondConfig[key]),
    process: (firstConfig, secondConfig, genAST) => genAST(firstConfig, secondConfig),
  },
  {
    type: 'added',
    check: (key, firstConfig) => !(_.has(firstConfig, key)),
    process: (firstConfig, secondConfig) => _.identity(secondConfig),
  },
  {
    type: 'deleted',
    check: (key, firstConfig, secondConfig) => !(_.has(secondConfig, key)),
    process: firstConfig => _.identity(firstConfig),
  },
  {
    type: 'updated',
    check: (key, firstConfig, secondConfig) => !(_.isEqual(firstConfig[key], secondConfig[key])),
    process: (firstConfig, secondConfig) => ({ oldValue: firstConfig, newValue: secondConfig }),
  },
  {
    type: 'unchanged',
    check: (key, firstConfig, secondConfig) => _.isEqual(firstConfig[key], secondConfig[key]),
    process: firstConfig => _.identity(firstConfig),
  },
];

const genAST = (firstConfig, secondConfig) => {
  const firstConfigKeys = Object.keys(firstConfig);
  const secondConfigKeys = Object.keys(secondConfig);
  const allKeys = _.union(firstConfigKeys, secondConfigKeys);

  return allKeys.map((key) => {
    const { type, process } =
      _.find(keyTypes, ({ check }) => check(key, firstConfig, secondConfig));
    const value = process(firstConfig[key], secondConfig[key], genAST);
    return { name: key, type, value };
  });
};

export default genAST;
