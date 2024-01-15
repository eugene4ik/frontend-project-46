import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import gendiff from '../src/index.js';

const filename = fileURLToPath(import.meta.url);
const currentDir = dirname(filename);

const testCases = [
  [
    'JSON files in Stylish format',
    './__fixtures__/file1.json',
    './__fixtures__/file2.json',
    'stylish',
    '../__fixtures__/testForStylish.txt',
  ],
  [
    'YAML files in Stylish format',
    './__fixtures__/file1.yaml',
    './__fixtures__/file2.yaml',
    'stylish',
    '../__fixtures__/testForStylish.txt',
  ],
  [
    'JSON files in Plain format',
    './__fixtures__/file1.json',
    './__fixtures__/file2.json',
    'plain',
    '../__fixtures__/testForPlain.txt',
  ],
  [
    'YAML files in Plain format',
    './__fixtures__/file1.yaml',
    './__fixtures__/file2.yaml',
    'plain',
    '../__fixtures__/testForPlain.txt',
  ],
  [
    'different files in JSON format',
    './__fixtures__/file1.json',
    './__fixtures__/file2.json',
    'json',
    '../__fixtures__/testForJSON.txt',
  ],
];

describe.each(testCases)(
  'gendiff tests',
  (description, filepath1, filepath2, format, expectedFilePath) => {
    it(`Compare ${description}`, () => {
      const expected = fs
        .readFileSync(path.join(currentDir, expectedFilePath), 'utf8')
        .trim();
      const result = gendiff(filepath1, filepath2, format).trim();
      expect(result).toBe(expected);
    });
  },
);
