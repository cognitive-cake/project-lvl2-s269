import fs from 'fs';
import genDiff from '../src';

test('genDiff test', () => {
  const expectedDiff = fs.readFileSync('__tests__/__fixtures__/expected-diff.txt', 'utf-8');
  return expect(genDiff('before.json', 'after.json')).toEqual(expectedDiff);
});
