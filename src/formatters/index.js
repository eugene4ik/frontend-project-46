import stylish from './stylish.js';
import plain from './plain.js';

const selectedFormatter = (difference, format) => {
  switch (format) {
    case 'stylish':
      return stylish(difference);
    case 'plain':
      return plain(difference);
    case 'json':
      return JSON.stringify(difference);
    default:
      throw new Error(`Selected format ${format} is not supported`);
  }
};

export default selectedFormatter;
