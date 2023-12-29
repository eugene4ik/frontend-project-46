const parseData = (data, format) => {
  switch (format) {
    case 'json':
      return JSON.parse(data);
    // Добавить обработку других форматов кроме json
    default:
      throw new Error(`Unsupported file format: ${format}`);
  }
};

export default parseData;
