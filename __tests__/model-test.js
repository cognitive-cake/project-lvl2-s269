// import fs from 'fs';
// import genAST from '../src/model/ast';

// test('genDiff test - JSON nested', () => {
//   const expectedDiff = fs.readFileSync('__tests__/__fixtures__/expected-diff-nested.txt', 'utf-8');
//   const exampleBefore = '__tests__/__fixtures__/nested/before.json';
//   const exampleAfter = '__tests__/__fixtures__/nested/after.json';
//   const fileContent1 = fs.readFileSync(exampleBefore, 'utf-8');
//   const fileContent2 = fs.readFileSync(exampleAfter, 'utf-8');
//   const obj1 = JSON.parse(fileContent1);
//   const obj2 = JSON.parse(fileContent2);

//   return expect(genAST(obj1, obj2)).toEqual(expectedDiff);
// });
