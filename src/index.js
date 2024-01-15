import { readFileSync } from 'node:fs';
import path from 'path';
import parseData from './parser.js';
import compareFiles from './compareFiles.js';
import selectedFormatter from './formatters/index.js';

const resolveFilePath = (filePath) => {
  if (path.isAbsolute(filePath)) {
    return filePath;
  }
  return path.resolve(process.cwd(), filePath);
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
