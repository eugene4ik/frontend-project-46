import { readFileSync } from 'node:fs';
import path from 'path';

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
    // Добавьте обработку других форматов, если необходимо
    default:
      throw new Error(`Unsupported file format: ${format}`);
  }
};
const gendiff = (filepath1, filepath2, options) => {
  const absolutePath1 = resolveFilePath(filepath1); // определяем абсолютный путь к файлу
  const absolutePath2 = resolveFilePath(filepath2);

  const format1 = determineFormat(absolutePath1); //функция determineFormat определяет формат переданного файла
  const format2 = determineFormat(absolutePath2);

  const data1 = parseData(filepath1);
  const data2 = parseData(filepath2);
  // Результаты парса файлов
  console.log('file 1:', data1);
  console.log('file 2:', data2);
  // Здесь должна быть ваша логика сравнения данных в формате format1 и format2
  console.log(
    `Compairinf files: ${absolutePath1} (${format1}) and ${absolutePath2} (${format2})`
  );

  // if (options.format) {
  //   console.log(`Output format: ${options.format}`);
  // }
  // // Дополнительная логика обработки файлов
};

export default gendiff;
