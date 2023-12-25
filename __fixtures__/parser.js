#!/usr/bin/env node
import { readFileSync } from 'node:fs';
import path from 'path';
import orderBy from 'lodash.orderBy';

const resolveFilePath = (filePath) => {
  return path.isAbsolute(filePath)
    ? filePath
    : path.resolve(process.cwd(), filePath);
};

const determineFormat = (filepath) => {
  return path.extname(filepath).slice(1);
};

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
const gendiff = (filepath1, filepath2, options) => {
  console.log('Текущая рабочая директория:', process.cwd());
  // определяем абсолютный путь к файлу
  const absolutePath1 = resolveFilePath(filepath1);
  //console.log(absolutePath1);
  const absolutePath2 = resolveFilePath(filepath2);
  //функция determineFormat определяет формат переданного файла
  const format1 = determineFormat(absolutePath1);
  const format2 = determineFormat(absolutePath2);

  const data1 = parseData(filepath1);
  const data2 = parseData(filepath2);
  // Результаты парса файлов

  const compareFiles = (data1, data2) => {
    const allKeys = Array.from(
      new Set([...Object.keys(data1), ...Object.keys(data2)])
    );
    const sortedKeys = orderBy(allKeys);
    const differences = {};

    sortedKeys.forEach((key) => {
      const value1 = data1[key];
      const value2 = data2[key];

      if (value1 !== value2) {
        if (key in data1) differences[`- ${key}`] = value1;
        if (key in data2) differences[`+ ${key}`] = value2;
      } else {
        if (key in data1) differences[`  ${key}`] = value1;
      }
    });

    return differences;
  };
  console.log(compareFiles(data1, data2));
};
export default gendiff;

// absolute path: gendiff /Users/mac/vs_code/hexlet-git/frontend-project-46/__fixtures__/file1.json /Users/mac/vs_code/hexlet-git/frontend-project-46/__fixtures__/file2.json
