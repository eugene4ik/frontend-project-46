import gendiff from '../src/index.js';

describe('gendiff', () => {
  it('Compare different files', () => {
    const filepath1 = './__fixtures__/file1.json';
    const filepath2 = './__fixtures__/file2.json';

    const expected = `
- follow: false
  host: hexlet.io
- proxy: 123.234.53.22
- timeout: 50
+ timeout: 20
+ verbose: true`.trim();

    const result = gendiff(filepath1, filepath2).trim();

    expect(result).toBe(expected);
  });
});
