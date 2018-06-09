import fs from 'fs';
import genDiff from '../src';

const categorys = {
  expected: '__tests__/__fixtures__/expected-diff-',
  example: '__tests__/__fixtures__/',
};

const types = {
  flat: 'flat',
  nested: 'nested',
  plain: 'plain',
};

const positions = {
  before: '/before',
  after: '/after',
  none: '',
};

const formats = {
  json: '.json',
  yaml: '.yml',
  ini: '.ini',
  txt: '.txt',
};

const genPathToFixture = category => type => (position = 'none') => format =>
  `${categorys[category]}${types[type]}${positions[position]}${formats[format]}`;


test('genDiff test - JSON', () => {
  const expectedDiff = fs.readFileSync(genPathToFixture('expected')('flat')()('txt'), 'utf-8');
  const exampleBefore = genPathToFixture('example')('flat')('before')('json');
  const exampleAfter = genPathToFixture('example')('flat')('after')('json');

  return expect(genDiff(exampleBefore, exampleAfter)).toEqual(expectedDiff);
});

test('genDiff test - YAML', () => {
  const expectedDiff = fs.readFileSync(genPathToFixture('expected')('flat')()('txt'), 'utf-8');
  const exampleBefore = genPathToFixture('example')('flat')('before')('yaml');
  const exampleAfter = genPathToFixture('example')('flat')('after')('yaml');

  return expect(genDiff(exampleBefore, exampleAfter)).toEqual(expectedDiff);
});

test('genDiff test - INI', () => {
  const expectedDiff = fs.readFileSync(genPathToFixture('expected')('flat')()('txt'), 'utf-8');
  const exampleBefore = genPathToFixture('example')('flat')('before')('ini');
  const exampleAfter = genPathToFixture('example')('flat')('after')('ini');

  return expect(genDiff(exampleBefore, exampleAfter)).toEqual(expectedDiff);
});


test('genDiff test - JSON nested', () => {
  const expectedDiff = fs.readFileSync(genPathToFixture('expected')('nested')()('txt'), 'utf-8');
  const exampleBefore = genPathToFixture('example')('nested')('before')('json');
  const exampleAfter = genPathToFixture('example')('nested')('after')('json');

  return expect(genDiff(exampleBefore, exampleAfter)).toEqual(expectedDiff);
});

test('genDiff test - YAML nested', () => {
  const expectedDiff = fs.readFileSync(genPathToFixture('expected')('nested')()('txt'), 'utf-8');
  const exampleBefore = genPathToFixture('example')('nested')('before')('yaml');
  const exampleAfter = genPathToFixture('example')('nested')('after')('yaml');

  return expect(genDiff(exampleBefore, exampleAfter)).toEqual(expectedDiff);
});

test('genDiff test - INI nested', () => {
  const expectedDiff = fs.readFileSync(genPathToFixture('expected')('nested')()('txt'), 'utf-8');
  const exampleBefore = genPathToFixture('example')('nested')('before')('ini');
  const exampleAfter = genPathToFixture('example')('nested')('after')('ini');

  return expect(genDiff(exampleBefore, exampleAfter)).toEqual(expectedDiff);
});


test('genDiff test - JSON nested plain', () => {
  const expectedDiff = fs.readFileSync(genPathToFixture('expected')('plain')()('txt'), 'utf-8');
  const exampleBefore = genPathToFixture('example')('plain')('before')('json');
  const exampleAfter = genPathToFixture('example')('plain')('after')('json');

  return expect(genDiff(exampleBefore, exampleAfter, 'plain')).toEqual(expectedDiff);
});
