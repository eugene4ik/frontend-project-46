import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import gendiff from '../src/index.js';

const filename = fileURLToPath(import.meta.url);
const currentDir = dirname(filename);

describe('gendiff', () => {
  it('Compare JSON files in Stylish format', () => {
    const filepath1 = './__fixtures__/file1.json';
    const filepath2 = './__fixtures__/file2.json';

    const expectedFilePath = path.join(
      currentDir,
      '../__fixtures__/testForStylish.txt',
    );
    const expected = fs.readFileSync(expectedFilePath, 'utf8').trim();

    const result = gendiff(filepath1, filepath2, 'stylish').trim();

    expect(result).toBe(expected);
  });
});
describe('gendiff', () => {
  it('Compare YAML files in Stylish format', () => {
    const filepath1 = './__fixtures__/file1.yaml';
    const filepath2 = './__fixtures__/file2.yaml';

    const expectedFilePath = path.join(
      currentDir,
      '../__fixtures__/testForStylish.txt',
    );
    const expected = fs.readFileSync(expectedFilePath, 'utf8').trim();

    const result = gendiff(filepath1, filepath2, 'stylish').trim();

    expect(result).toBe(expected);
  });
});
describe('gendiff', () => {
  it('Compare JSON files in Plain format', () => {
    const filepath1 = './__fixtures__/file1.json';
    const filepath2 = './__fixtures__/file2.json';

    const expectedFilePath = path.join(
      currentDir,
      '../__fixtures__/testForPlain.txt',
    );
    const expected = fs.readFileSync(expectedFilePath, 'utf8').trim();

    const result = gendiff(filepath1, filepath2, 'plain').trim();

    expect(result).toBe(expected);
  });
});
describe('gendiff', () => {
  it('Compare YAML files in Plain format', () => {
    const filepath1 = './__fixtures__/file1.yaml';
    const filepath2 = './__fixtures__/file2.yaml';

    const expectedFilePath = path.join(
      currentDir,
      '../__fixtures__/testForPlain.txt',
    );
    const expected = fs.readFileSync(expectedFilePath, 'utf8').trim();

    const result = gendiff(filepath1, filepath2, 'plain').trim();

    expect(result).toBe(expected);
  });
});

describe('gendiff', () => {
  it('Compare different files in JSON format', () => {
    const filepath1 = './__fixtures__/file1.json';
    const filepath2 = './__fixtures__/file2.json';

    const expectedFilePath = path.join(
      currentDir,
      '../__fixtures__/testForJSON.txt',
    );
    const expected = fs.readFileSync(expectedFilePath, 'utf8').trim();

    const result = gendiff(filepath1, filepath2, 'json').trim();

    expect(result).toBe(expected);
  });
});
