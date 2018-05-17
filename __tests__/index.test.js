import fs from 'fs';
import genDiff from '../src';

test('genDiff test - JSON', () => {
  const expectedDiff = fs.readFileSync('__tests__/__fixtures__/expected-diff-flat.txt', 'utf-8');
  const exampleBefore = '__tests__/__fixtures__/flat/before.json';
  const exampleAfter = '__tests__/__fixtures__/flat/after.json';

  return expect(genDiff(exampleBefore, exampleAfter)).toEqual(expectedDiff);
});

test('genDiff test - YAML', () => {
  const expectedDiff = fs.readFileSync('__tests__/__fixtures__/expected-diff-flat.txt', 'utf-8');
  const exampleBefore = '__tests__/__fixtures__/flat/before.yml';
  const exampleAfter = '__tests__/__fixtures__/flat/after.yml';

  return expect(genDiff(exampleBefore, exampleAfter)).toEqual(expectedDiff);
});

test('genDiff test - INI', () => {
  const expectedDiff = fs.readFileSync('__tests__/__fixtures__/expected-diff-flat.txt', 'utf-8');
  const exampleBefore = '__tests__/__fixtures__/flat/before.ini';
  const exampleAfter = '__tests__/__fixtures__/flat/after.ini';

  return expect(genDiff(exampleBefore, exampleAfter)).toEqual(expectedDiff);
});
