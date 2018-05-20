import _ from 'lodash';

const isPlainObject = (val) => {
  if (!(val instanceof Object)) {
    return false;
  }
  if ((val instanceof Object) && !(val instanceof Array)) {
    return true;
  }
  return false;
};

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
      status: 'updated',
      check: key => !(_.isEqual(obj1[key], obj2[key])),
    },
    {
      status: 'not updated',
      check: key => _.isEqual(obj1[key], obj2[key]),
    },
  ];

  const getKeyStatus = key => _.find(keyStatuses, ({ check }) => check(key)).status;


  const genNode = (key) => {
    const template = {
      key,
      keyStatus: getKeyStatus(key),
      value: [obj1[key], obj2[key]],
      children: (isPlainObject(obj1[key]) && isPlainObject(obj2[key])) ?
        genAST(obj1[key], obj2[key]) : [],
    };

    return template;
  };

  return allKeys.map(key => genNode(key));
};

export default genAST;