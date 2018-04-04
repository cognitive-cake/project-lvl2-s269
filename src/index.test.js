/* eslint-disable */
import genDiff from './index';

const expected = `{
    host: hexlet.io
  + timeout: 20
  - timeout: 50
  - proxy: 123.234.53.22
  + verbose: true
}`;

test('first test', () => {
  expect(genDiff('before.json', 'after.json')).toBe(expected);
});

