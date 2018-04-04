/* eslint-disable */
import fs from 'fs';
import genDiff from '..';

const expected = fs.readFileSync('./__fixtures__/expected.txt');

test('first test', () => {
  expect(genDiff('before.json', 'after.json')).toBe(expected);
});

