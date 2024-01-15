import _ from 'lodash';

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

export default compareFiles;
