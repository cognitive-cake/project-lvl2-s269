// import _ from 'lodash';

const renderPlainDiff = ast => ast
  .filter(obj => obj.keyStatus !== 'not updated')
  .map(({
    key,
    keyStatus,
    value: [valBefore, valAfter],
  }) => {
    if (keyStatus === 'updated') {
      return `Property '${key}' was updated. From '${valBefore}' to '${valAfter}'`;
    }
    if (keyStatus === 'added') {
      return `Property '${key}' was added with value: ${valAfter}`;
    }
    return `Property '${key}' was deleted.`;
  });

export default renderPlainDiff;
