import gendiff from '../src/index.js';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

describe('gendiff', () => {
  it('Compare different files', () => {
    const filepath1 = './__fixtures__/file1.json';
    const filepath2 = './__fixtures__/file2.json';

    const expectedFilePath = path.join(__dirname, '../__fixtures__/testForJson.txt');
    const expected = fs.readFileSync(expectedFilePath, 'utf8').trim();

    const result = gendiff(filepath1, filepath2).trim();

    expect(result).toBe(expected);
  });
});
