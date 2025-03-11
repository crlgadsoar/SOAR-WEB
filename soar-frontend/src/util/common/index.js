import moment from 'moment';
// Function to capitalize the first letter of a string
export const capitalizeFirstLetter = (str) => {
  str = str.toLowerCase();
  return str.charAt(0).toUpperCase() + str.slice(1);
};
export const FORM_ITEM_LAYOUT = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 24 },
    md: { span: 8 },
    lg: { span: 8 },
    xl: { span: 8 },
    xxl: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 24 },
    md: { span: 16 },
    lg: { span: 16 },
    xl: { span: 16 },
    xxl: { span: 16 },
  },
};

export const readableWord = (receivedString) => {
  if (!receivedString) return receivedString;
  return capitalizeFirstLetter(receivedString.replace(/_/g, ' '));
};
export const regularizeSentence = (value) => {
  if (!value) return value;
  let _value = value
    .split(' ')
    .map((t) => t.charAt(0).toUpperCase() + t.slice(1).toLowerCase())
    .join(' ');

  _value = _value
    .split('_')
    .map((t) => t.charAt(0).toUpperCase() + t.slice(1).toLowerCase())
    .join('_');

  return _value;
};

/**
 * Returns an array of unique elements based on the specified criteria.
export const getUniqueElementArray = (array, criteria) => {
  //CODE TO FIND UNIQUE ROWS IN ARRAY OF OBJECTS
  if (!array) return [];

  const unique = array.filter(
    (item, index) =>
      array.findIndex((x) => x[criteria] === item[criteria]) === index,
  );
  return unique;
};

/**
 * Generates a unique ID based on the given username.
 */
export const getUniqueIdByUserName = (userName) =>
  userName.toString().toUpperCase() +
  Date.now().toString(36) +
  Math.random().toString(36).substr(2);

export const getUUID = () => {
  const hashTable = [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
  ];
  let uuid = [];
  for (let i = 0; i < 36; i++) {
    if (i === 8 || i === 13 || i === 18 || i === 23) {
      uuid[i] = '-';
    } else {
      uuid[i] = hashTable[Math.ceil(Math.random() * hashTable.length - 1)];
    }
  }
  return uuid.join('');
};

/**
 * Generates a unique ID with the given prefix letter.
 * @returns {string} A unique ID string.
 */
export const getUniqueIdWithPrefix = (prefixLetter) =>
  prefixLetter.toString() +
  '_' +
  moment().format('YYYYMMDDHHmmss').toString().toUpperCase() +
  '_' +
  Math.random().toString(36).substr(2);

/**
 * Calculates the distance between two points in a two-dimensional space.
 * @returns {number} The distance between the two points.
 */
export const calculateDistance = (point1, point2) => {
  const dx = point2.x - point1.x;
  const dy = point2.y - point1.y;
  return Math.sqrt(dx * dx + dy * dy);
};
export const getMidpoint = (point1, point2) => {
  return {
    x: (point1.x + point2.x) / 2,
    y: (point1.y + point2.y) / 2,
  };
};

export const getDreamFactoryUrlQueryParams = (paramObj, columns = []) => {
  console.log('getDreamFactoryUrlQueryParams paramObj', paramObj);
  if (!paramObj) {
    return '';
  }
  //pagination
  let _str =
    '/?limit=' +
    paramObj.pagination.pageSize +
    '&offset=' +
    (paramObj.pagination.current - 1) * paramObj.pagination.pageSize +
    '&include_count=true';

  //Applicable only for Global Search
  if (paramObj.globalSearchTxt.toString().trim().length) {
    let _newFilterObj = {};
    columns
      .filter((item) => item.searchBarKey === true)
      .forEach(
        (item) =>
          (_newFilterObj[item.dataIndex] = [
            paramObj.globalSearchTxt.toString().trim(),
          ]),
      );
    console.log('getDreamFactoryUrlQueryParams _newFilterObj', _newFilterObj);
    _str = _str + getDreamFactoryForGlobalSearch(_newFilterObj);
  } //for all other
  else if (
    paramObj.filterInfo &&
    Object.keys(paramObj.filterInfo).length !== 0
  ) {
    //prev  it was getDreamFactoryFilterCriteria
    _str = _str + getDreamFactoryFilterLikeCriteria(paramObj.filterInfo);
  }
  //sorting
  if (paramObj.sortedInfo && Object.keys(paramObj.sortedInfo).length !== 0) {
    _str = _str + getDreamFactorySortCriteria(paramObj.sortedInfo);
  }

  _str = removeLastChar(_str.trim(), '&');
  console.log(' final _str ', _str);
  return _str;
};
const EQUAL_PARAM_ARRAY = [];
const NOT_EQUAL_PARAM_ARRAY = [];
const STARTS_WITH_PARAM_ARRAY = [];
const getDreamFactoryFilterLikeCriteria = (_flatObj) => {
  let _str = '';

  let flatObj = { ..._flatObj };
  let _keyArr = Object.keys(flatObj);
  for (let f = 0; f < _keyArr.length; f++) {
    if (
      Array.isArray(flatObj[_keyArr[f]]) &&
      flatObj[_keyArr[f]].length === 0
    ) {
      delete flatObj[_keyArr[f]];
    }
  }
  _keyArr = Object.keys(flatObj);
  if (!_keyArr.length) return '&filter=';
  //console.log("_keyArr -> " + _keyArr);

  for (let i = 0; i < _keyArr.length; i++) {
    for (let j = 0; j < flatObj[_keyArr[i]].length; j++) {
      if (NOT_EQUAL_PARAM_ARRAY.indexOf(_keyArr[i].toUpperCase()) !== -1) {
        //if this array contains then not equal operator
        _str = _str + '(' + _keyArr[i] + '!=' + flatObj[_keyArr[i]][j] + ')@'; // @ will be replace by or
      } else if (EQUAL_PARAM_ARRAY.indexOf(_keyArr[i].toUpperCase()) !== -1) {
        //if this array contains then equal operator otherwise contains operator
        _str = _str + '(' + _keyArr[i] + '=' + flatObj[_keyArr[i]][j] + ')@'; // @ will be replace by or
      } else if (
        STARTS_WITH_PARAM_ARRAY.indexOf(_keyArr[i].toUpperCase()) !== -1
      ) {
        _str =
          _str +
          '(' +
          _keyArr[i] +
          ' starts with ' +
          flatObj[_keyArr[i]][j] +
          ' )@'; // @ will be replace by or
      } else {
        _str = _str + _keyArr[i] + ' = ' + flatObj[_keyArr[i]][j] + '@';
      }
    }
    console.log(' getDreamFactoryFilterLikeCriteria _str', _str);
    _str = removeLastChar(_str.trim(), '@');
    console.log(
      ' getDreamFactoryFilterLikeCriteria removeLastChar  _str',
      _str,
    );
    _str = _str.replace(/@/g, 'or');
    _str = _str + '#';
  }
  _str = removeLastChar(_str.trim(), '#');
  //bracket between and & or
  //bracket between # first split by # add bracket to individual string and then again join string by #
  _str = _str
    .split('#')
    .filter(Boolean)
    .map((s) => '(' + s + ')')
    .join('#');
  console.log('getDreamFactoryFilterLikeCriteria _str ', _str);

  return '&filter=(' + encodeURIComponent(_str.replace(/#/g, 'and')) + ')'; //# will be replace by and
};

const getDreamFactorySortCriteria = (_flatObj) => {
  let flatObj = { ..._flatObj };
  let _keyArr = Object.keys(flatObj);
  return _keyArr.length === 0
    ? ''
    : '&order=' +
        _keyArr[0] +
        ' ' +
        (flatObj[_keyArr[0]] === 'ascend' ? 'asc' : 'desc');
};
export const removeLastChar = (str, char = '#') => {
  if (!str.length) return str;
  //if last character is & remove it from query param
  let _str = str;
  if (_str[_str.length - 1] === char) {
    _str = _str.substring(0, _str.length - 1);
  }
  return _str;
};
const getDreamFactoryForGlobalSearch = (_flatObj) => {
  let _str = '';

  let flatObj = { ..._flatObj };
  let _keyArr = Object.keys(flatObj);
  for (let f = 0; f < _keyArr.length; f++) {
    if (
      Array.isArray(flatObj[_keyArr[f]]) &&
      flatObj[_keyArr[f]].length === 0
    ) {
      delete flatObj[_keyArr[f]];
    }
  }
  _keyArr = Object.keys(flatObj);
  if (!_keyArr.length) return '&filter=';
  //console.log("_keyArr -> " + _keyArr);

  for (let i = 0; i < _keyArr.length; i++) {
    for (let j = 0; j < flatObj[_keyArr[i]].length; j++) {
      if (EQUAL_PARAM_ARRAY.indexOf(_keyArr[i].toUpperCase()) !== -1) {
        _str = _str + '(' + _keyArr[i] + '=' + flatObj[_keyArr[i]][j] + ')@';
      } else if (
        STARTS_WITH_PARAM_ARRAY.indexOf(_keyArr[i].toUpperCase()) !== -1
      ) {
        _str =
          _str +
          '(' +
          _keyArr[i] +
          ' starts with ' +
          flatObj[_keyArr[i]][j] +
          ' )@'; // @ will be replace by or
      } else {
        _str = _str + '(' + _keyArr[i] + '=' + flatObj[_keyArr[i]][j] + ')@'; //prev it was = now CONTAINS
      }
    }
    _str = removeLastChar(_str.trim(), '@');
    _str = _str.replace(/@/g, 'or');
    _str = _str + '#';
  }
  _str = removeLastChar(_str.trim(), '#');

  return '&filter=(' + encodeURIComponent(_str.replace(/#/g, 'or')) + ')'; //added or here instead of and as global search applicable columns
};
