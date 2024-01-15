import { readFileSync } from 'node:fs';
import _ from 'lodash';
import path from 'path';
import parseData from './parser.js';
import selectedFormatter from '../formatters/index.js';

const resolveFilePath = (filePath) => {
  if (path.isAbsolute(filePath)) {
    return filePath;
  }
  return path.resolve(process.cwd(), filePath);
};

const compareFiles = (fileData1, fileData2) => {
  const allKeys = _.union(Object.keys(fileData1), Object.keys(fileData2));

  return _.orderBy(allKeys).reduce((acc, key) => {
    const value1 = fileData1[key];
    const value2 = fileData2[key];

    if (_.isObject(value1) && _.isObject(value2)) {
      return [
        ...acc,
        {
          key,
          type: 'nested',
          children: compareFiles(value1, value2),
        },
      ];
    }

    if (value1 !== value2) {
      if (key in fileData1 && key in fileData2) {
        return [
          ...acc,
          {
            key,
            type: 'updated',
            oldValue: value1,
            newValue: value2,
          },
        ];
      }

      if (key in fileData1) {
        return [
          ...acc,
          {
            key,
            type: 'removed',
            value: value1,
          },
        ];
      }

      if (key in fileData2) {
        return [
          ...acc,
          {
            key,
            type: 'added',
            value: value2,
          },
        ];
      }
    }

    return [
      ...acc,
      {
        key,
        type: 'unchanged',
        value: value1,
      },
    ];
  }, []);
};

const getFormat = (filepath) => path.extname(filepath).slice(1);
const readFile = (filepath) => {
  const absolutePath = resolveFilePath(filepath);
  return readFileSync(absolutePath, 'utf8');
};

const gendiff = (filepath1, filepath2, format = 'stylish') => {
  const fileOneData = readFile(filepath1);
  const fileTwoData = readFile(filepath2);

  const fileOneParsed = parseData(fileOneData, getFormat(filepath1));
  const fileTwoParsed = parseData(fileTwoData, getFormat(filepath2));
  const difference = compareFiles(fileOneParsed, fileTwoParsed);
  const result = selectedFormatter(difference, format);

  return result;
};

export default gendiff;
