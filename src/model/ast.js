import _ from 'lodash';

const genAST = (obj1, obj2) => {
  const obj1Keys = Object.keys(obj1);
  const obj2Keys = Object.keys(obj2);
  const allKeys = _.union(obj1Keys, obj2Keys);

  const keyStatuses = [
    {
      status: 'added',
      check: key => !(obj1Keys.includes(key)),
    },
    {
      status: 'deleted',
      check: key => !(obj2Keys.includes(key)),
    },
    {
      status: 'include',
      check: key => obj1Keys.includes(key) && obj2Keys.includes(key),
    },
  ];

  const getKeyStatus = key => _.find(keyStatuses, ({ check }) => check(key)).status;


  const genNode = (key) => {
    const template = {
      key,
      keyStatus: getKeyStatus(key),
      value: [obj1[key], obj2[key]],
      children: (_.isPlainObject(obj1[key]) && _.isPlainObject(obj2[key])) ?
        genAST(obj1[key], obj2[key]) : [],
    };

    return template;
  };

  return allKeys.map(key => genNode(key));
};

export default genAST;
