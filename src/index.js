import fs from 'fs';
// import _ from 'lodash';

const genDiff = (pathToFile1, pathToFile2) => {
  const fileContent1 = fs.readFileSync(pathToFile1);
  const fileContent2 = fs.readFileSync(pathToFile2);
  const obj1 = JSON.parse(fileContent1);
  const obj2 = JSON.parse(fileContent2);


  console.log('obj1 = ', obj1);
  console.log('obj2 = ', obj2);
};

export default genDiff;
