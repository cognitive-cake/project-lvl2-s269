import fs from 'fs';
import genDiff from '../src';

test('genDiff test', () => {
  const expectedDiff = fs.readFileSync('__tests__/__fixtures__/expected-diff.txt', 'utf-8');
  const exampleBefore = '__tests__/__fixtures__/before.json';
  const exampleAfter = '__tests__/__fixtures__/after.json';

  return expect(genDiff(exampleBefore, exampleAfter)).toEqual(expectedDiff);
});
