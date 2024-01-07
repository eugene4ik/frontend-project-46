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
const calculateIndent = (depth) => {
  const leftShift = 2;

  return ' '.repeat(depth * 4 - leftShift);
};
const customStringify = (value, depth) => {
  if (_.isObject(value) && !Array.isArray(value)) {
    const baseIndent = calculateIndent(depth);
    const innerIndent = calculateIndent(depth + 1);
    const lines = Object.entries(value).map(([key, val]) => {
      return `${innerIndent}  ${key}: ${_.isObject(val) ? customStringify(val, depth + 1) : val}`;
    });
    return `{\n${lines.join('\n')}\n${baseIndent}}`;
  } else {
    return value;
  }
};

const formatValue = (diff, depth = 1) => {
  const lines = diff.map(({ key, type, value, oldValue, newValue, children }) => {
    const baseIndent = calculateIndent(depth);
    switch (type) {
      case 'nested':
        return `${baseIndent}  ${key}: ${formatValue(children, depth + 1)}`;
      case 'added':
        return `${baseIndent}+ ${key}: ${customStringify(value, depth)}`;
      case 'removed':
        return `${baseIndent}- ${key}: ${customStringify(value, depth)}`;
      case 'updated':
        return `${baseIndent}- ${key}: ${customStringify(
          oldValue,
          depth,
        )}\n${baseIndent}+ ${key}: ${customStringify(newValue, depth)}`;
      case 'unchanged':
        return `${baseIndent}  ${key}: ${customStringify(value, depth)}`;
    }
  });
  const result = `{\n${lines.join('\n')}\n}`;
  return result;
};

const compareFiles = (fileData1, fileData2) => {
  const difference = [];

  const allKeys = Array.from(new Set([...Object.keys(fileData1), ...Object.keys(fileData2)]));
  _.orderBy(allKeys).forEach((key) => {
    const value1 = fileData1[key];
    const value2 = fileData2[key];

    if (_.isObject(value1) && _.isObject(value2)) {
      difference.push({ key, type: 'nested', children: compareFiles(value1, value2) });
    } else if (value1 !== value2) {
      if (key in fileData1 && key in fileData2) {
        difference.push({ key, type: 'updated', oldValue: value1, newValue: value2 });
      } else if (key in fileData1) {
        difference.push({ key, type: 'removed', value: value1 });
      } else if (key in fileData2) {
        difference.push({ key, type: 'added', value: value2 });
      }
    } else {
      difference.push({ key, type: 'unchanged', value: value1 });
    }
  });
  return difference;
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
  const difference = compareFiles(fileOneParsed, fileTwoParsed);
  const result = formatValue(difference);

  //const result = compareFiles(fileOneParsed, fileTwoParsed);
  //console.dir(result, { depth: null });
  return result;
};

export default gendiff;
//cd vs_code/hexlet-git/frontend-project-46
