/* eslint-disable */
import fs from 'fs';
import genDiff from 'src/..';

const expected = fs.readFileSync('__tests__/__fixtures__/expected.txt', 'utf-8');

test('first test', () => {
  expect(genDiff('before.json', 'after.json')).toBe(expected);
});

