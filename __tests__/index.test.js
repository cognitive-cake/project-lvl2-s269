/* eslint-disable */
import fs from 'fs';
import genDiff, { getDiffOfVal } from '../src';

test('genDiffOfVal test', () => {
  expect(getDiffOfVal('key1', { key1: 1 }, { key1: 1 })).toBe(`    key1: 1\n`);
  expect(getDiffOfVal('key1', { key1: 1 }, { key1: 2 })).toBe(`  + key1: 2\n  - key1: 1\n`);
});

test('genDiff test', () => {
  const expectedDiff = fs.readFileSync('__tests__/__fixtures__/expected-diff.txt', 'utf-8');
  expect(genDiff('before.json', 'after.json')).toEqual(expectedDiff);
});

