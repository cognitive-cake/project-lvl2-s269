import _ from 'lodash';

const keyTypes = [

  {
    type: 'nested',
    check: (key, firstConfig, secondConfig) =>
      _.isPlainObject(firstConfig[key]) && _.isPlainObject(secondConfig[key]),
    process: (firstValue, secondValue, genAST) => ({
      value: [firstValue, secondValue],
      children: genAST(firstValue, secondValue),
    }),
  },

  {
    type: 'added',
    check: (key, firstConfig) => !(_.has(firstConfig, key)),
    process: (firstValue, secondValue) => ({
      value: secondValue,
    }),
  },

  {
    type: 'deleted',
    check: (key, firstConfig, secondConfig) => !(_.has(secondConfig, key)),
    process: firstValue => ({
      value: firstValue,
    }),
  },

  {
    type: 'updated',
    check: (key, firstConfig, secondConfig) => !(_.isEqual(firstConfig[key], secondConfig[key])),
    process: (firstValue, secondValue) => ({
      value: [firstValue, secondValue],
    }),
  },

  {
    type: 'unchanged',
    check: (key, firstConfig, secondConfig) => _.isEqual(firstConfig[key], secondConfig[key]),
    process: firstValue => ({
      value: firstValue,
    }),
  },

];

const genAST = (firstConfig, secondConfig) => {
  const firstConfigKeys = Object.keys(firstConfig);
  const secondConfigKeys = Object.keys(secondConfig);
  const allKeys = _.union(firstConfigKeys, secondConfigKeys);

  return allKeys.map((key) => {
    const { type, process } =
      _.find(keyTypes, ({ check }) => check(key, firstConfig, secondConfig));
    const processResult = process(firstConfig[key], secondConfig[key], genAST);
    return {
      key, type, ...processResult,
    };
  });
};

export default genAST;
