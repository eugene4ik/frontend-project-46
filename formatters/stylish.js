import _ from 'lodash';

const calculateIndent = (depth, leftShift = 2) =>
  ' '.repeat(depth * 4 - leftShift);

const customStringify = (value, depth) => {
  if (_.isObject(value) && !Array.isArray(value)) {
    const baseIndent = calculateIndent(depth + 1, 4);
    const innerIndent = calculateIndent(depth + 1, 0);
    const lines = Object.entries(value).map(
      ([key, val]) =>
        `${innerIndent}${key}: ${
          _.isObject(val) ? customStringify(val, depth + 1) : val
        }`,
    );
    return `{\n${lines.join('\n')}\n${baseIndent}}`;
  }
  return value;
};

const stylish = (difference, depth = 1) => {
  const lines = difference.map(
    ({ key, type, value, oldValue, newValue, children }) => {
      const baseIndent = calculateIndent(depth);

      switch (type) {
        case 'nested':
          return `${baseIndent}  ${key}: ${stylish(children, depth + 1)}`;
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
        default:
          return null;
      }
    },
  );
  const innerIndent = calculateIndent(depth, 4);
  const result = `{\n${lines.join('\n')}\n${innerIndent}}`;
  return result;
};

export default stylish;
