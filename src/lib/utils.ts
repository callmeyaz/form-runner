import isArray from 'lodash-es/isArray';
import isObject from 'lodash-es/isObject';

export function flattenObjectToArray(obj: any, separator: string) {
  const result: { key: string, value: any }[] = [];
  function recurse(current: any, parentKey: string = '', separator: string = ".") {
    for (const key in current) {
      if (current.hasOwnProperty(key)) {
        const newKey = parentKey ? `${parentKey}.${key}` : key;

        if (isObject(current[key]) && current[key] !== null) {
          recurse(current[key], newKey, separator);
        } else {
          result.push({ key: newKey, value: current[key] });
        }
      }
    }
  }
  recurse(obj, '', separator);
  return result;
}

export function deepFreeze<T>(obj: T) {
  Object.freeze(obj);
  for (const key in obj) {
    if (isObject(obj[key] || isArray(obj[key]))) {
      deepFreeze(obj[key]);
    }
  }
  return obj;
}