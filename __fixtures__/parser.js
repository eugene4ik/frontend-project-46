import { readFileSync } from 'node:fs';
import path from 'path';
import _ from 'lodash';

const resolveFilePath = (filePath) => (
  path.isAbsolute(filePath)
    ? filePath
    : path.resolve(process.cwd(), filePath)
);
const determineFormat = (filepath) => path.extname(filepath).slice(1);
const parseData = (filepath) => {
  const absolutePath = resolveFilePath(filepath);
  const format = determineFormat(absolutePath);
  const data = readFileSync(absolutePath, 'utf8');

  switch (format) {
    case 'json':
      return JSON.parse(data);
    // Добавить обработку других форматов кроме json
    default:
      throw new Error(`Unsupported file format: ${format}`);
  }
};
const gendiff = (filepath1, filepath2) => {
  // определяем абсолютный путь к файлу
  resolveFilePath(filepath1);
  resolveFilePath(filepath2);

  const fileOne = parseData(filepath1);
  const fileTwo = parseData(filepath2);
  // Результаты парса файлов

  const compareFiles = (fileData1, fileData2) => {
    const allKeys = Array.from(
      new Set([...Object.keys(fileData1), ...Object.keys(fileData2)]),
    );
    const sortedKeys = _.orderBy(allKeys);
    const differences = [];

    sortedKeys.forEach((key) => {
      const value1 = fileData1[key];
      const value2 = fileData2[key];

      if (value1 !== value2) {
        if (key in fileData1) differences.push(`- ${key}: ${value1}`);
        if (key in fileData2) differences.push(`+ ${key}: ${value2}`);
      } else if (key in fileData1) {
        differences.push(`  ${key}: ${value1}`);
      }
    });
    return differences.join('\n');
  };
  const result = compareFiles(fileOne, fileTwo);
  // eslint-disable-next-line no-console
  console.log(result);
  return result;
};
export default gendiff;
