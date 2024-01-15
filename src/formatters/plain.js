const stringify = (value) => {
  if (value === null) return 'null';
  if (typeof value === 'object') return '[complex value]';
  if (typeof value === 'string') return `'${value}'`;
  return `${value}`;
};

const plain = (difference, parent = '') => {
  const lines = difference.flatMap(
    ({
      key,
      type,
      value,
      oldValue,
      newValue,
      children,
    }) => {
      const fullPath = parent ? `${parent}.${key}` : key;

      switch (type) {
        case 'nested':
          return plain(children, fullPath);
        case 'added':
          return `Property '${fullPath}' was added with value: ${stringify(
            value,
          )}`;
        case 'removed':
          return `Property '${fullPath}' was removed`;
        case 'updated':
          return `Property '${fullPath}' was updated. From ${stringify(
            oldValue,
          )} to ${stringify(newValue)}`;
        case 'unchanged':
          return [];
        default:
          return null;
      }
    },
  );

  return lines.join('\n');
};

export default plain;
