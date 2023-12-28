import { readFileSync } from 'node:fs';
import path from 'path';
import orderBy from 'lodash.orderBy';

const resolveFilePath = (filePath) => {
  return path.isAbsolute(filePath)
    ? filePath
    : path.resolve(process.cwd(), filePath);
};

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
  const absolutePath1 = resolveFilePath(filepath1);
  //console.log(absolutePath1);
  const absolutePath2 = resolveFilePath(filepath2);
  // функция determineFormat определяет формат переданного файла
  // const format1 = determineFormat(absolutePath1);
  // const format2 = determineFormat(absolutePath2);

  const fileOne = parseData(filepath1);
  const fileTwo = parseData(filepath2);
  // Результаты парса файлов

  const compareFiles = (fileOne, fileTwo) => {
    const allKeys = Array.from(
      new Set([...Object.keys(fileOne), ...Object.keys(fileTwo)])
    );
    const sortedKeys = orderBy(allKeys);
    const differences = [];

    sortedKeys.forEach((key) => {
      const value1 = fileOne[key];
      const value2 = fileTwo[key];

      if (value1 !== value2) {
        if (key in fileOne) differences.push(`- ${key}: ${value1}`);
        if (key in fileTwo) differences.push(`+ ${key}: ${value2}`);
      } else if (key in fileOne) {
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
