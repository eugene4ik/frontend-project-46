import { readFileSync } from 'node:fs';
import path from 'path';

const resolveFilePath = (filePath) => {
  if (path.isAbsolute(filePath)) {
    return filePath;
  }
  return path.resolve(process.cwd(), filePath);
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

export { resolveFilePath, parseData };
