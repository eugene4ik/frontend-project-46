import { readFileSync } from 'node:fs';
import _ from 'lodash';
import path from 'path';
import parseData from './parser.js';

const resolveFilePath = (filePath) => {
  if (path.isAbsolute(filePath)) {
    return filePath;
  }
  return path.resolve(process.cwd(), filePath);
};

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

const getFormat = (filepath) => path.extname(filepath).slice(1);
const readFile = (filepath) => {
  const absolutePath = resolveFilePath(filepath);
  return readFileSync(absolutePath, 'utf8');
};

const gendiff = (filepath1, filepath2) => {
  const fileOneData = readFile(filepath1);
  const fileTwoData = readFile(filepath2);

  const fileOneParsed = parseData(fileOneData, getFormat(filepath1));
  const fileTwoParsed = parseData(fileTwoData, getFormat(filepath2));

  const result = compareFiles(fileOneParsed, fileTwoParsed);
  return result;
};
// eslint-disable-next-line no-console

export default gendiff;
