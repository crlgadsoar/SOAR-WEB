export const set = (obj, path, value) => {
  if (Object(obj) !== obj) return obj; // When obj is not an object
  // If not yet an array, get the keys from the string-path
  if (!Array.isArray(path)) path = path.toString().match(/[^[\]]+/g) || []; //This was causing issue if "." was in the dataIndex
  path.slice(0, -1).reduce(
    (
      a,
      c,
      i, // Iterate all of them except the last one
    ) =>
      Object(a[c]) === a[c] // Does the key exist and is its value an object?
        ? // Yes: then follow that path
          a[c]
        : // No: create the key. Is the next key a potential array-index?
          (a[c] =
            Math.abs(path[i + 1]) >> 0 === +path[i + 1]
              ? [] // Yes: assign a new array object
              : {}), // No: assign a new plain object
    obj,
  )[path[path.length - 1]] = value; // Finally assign the value to the last key
  return obj; // Return the top-level object to allow chaining
};
export const get = (obj, path, defaultValue) =>
  path
    .split('.')
    .reduce((a, c) => (a && '' + a[c] ? a[c] : defaultValue || null), obj);

export const difference = (arr1, arr2) => arr1.filter((x) => !arr2.includes(x));
export const union = (arr, ...args) => [...new Set(arr.concat(...args))];

export const getFieldsFromColumns = (columns) => {
  const fields = {};
  columns?.forEach((column) => {
    const { title, key, dataIndex } = column;
    const fieldName =
      (Array.isArray(dataIndex) ? dataIndex.join('.') : dataIndex) ?? key;
    if (fieldName) {
      set(fields, fieldName, title);
    }
  });

  // let x = JSON.stringify(fields);
  // console.log("FIELDS x", x);

  return fields;
};

export const cleanupDataSource = (
  dataSource,
  exportFieldNames,
  selectedFields,
) => {
  if (!dataSource || dataSource.length === 0) {
    return { data: [], fields: [] };
  }

  const newData = [...dataSource];
  const fields = selectedFields.map((fieldName) => {
    const fieldValue = get(exportFieldNames, fieldName);
    if (typeof fieldValue === 'string') {
      return fieldValue;
    }
    return fieldValue.props.children;
  });

  const data = newData.map((record, rowIndex) => {
    return selectedFields.map((fieldName) => {
      const fieldValue = get(exportFieldNames, fieldName);
      const recordValue = get(record, fieldName);
      if (typeof fieldValue === 'string' || typeof fieldValue === 'object') {
        return recordValue;
      }
      return fieldValue?.formatter(recordValue, record, rowIndex) || null;
    });
  });

  return [fields, ...data];
};
