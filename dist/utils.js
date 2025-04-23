import isArray from 'lodash-es/isArray';
import isObject from 'lodash-es/isObject';
import { getAttributeMutation, setAttributeMutated } from 'mutation-tracker';
export function getDeep(obj, path) {
    return getAttributeMutation(obj, path);
}
export function setDeep(obj, value, path) {
    return setAttributeMutated(obj, value, path);
}
export function flattenObject(obj, separator) {
    function recursive(current, parentKey = '', separator = ".") {
        const result = {};
        for (const key in current) {
            if (current.hasOwnProperty(key)) {
                const newKey = parentKey ? parentKey + separator + key : key;
                if (isObject(current[key]) && current[key] !== null) {
                    Object.assign(result, recursive(current[key], newKey, separator));
                }
                else {
                    result[newKey] = current[key];
                }
            }
        }
        return result;
    }
    return recursive(obj, '', separator);
}
export function flattenObjectToArray(obj, separator) {
    const result = [];
    function recurse(current, parentKey = '', separator = ".") {
        for (const key in current) {
            if (current.hasOwnProperty(key)) {
                const newKey = parentKey ? `${parentKey}.${key}` : key;
                if (isObject(current[key]) && current[key] !== null) {
                    recurse(current[key], newKey, separator);
                }
                else {
                    result.push({ key: newKey, value: current[key] });
                }
            }
        }
    }
    recurse(obj, '', separator);
    return result;
}
export function deepFreeze(obj) {
    Object.freeze(obj);
    for (const key in obj) {
        if (isObject(obj[key] || isArray(obj[key]))) {
            deepFreeze(obj[key]);
        }
    }
    return obj;
}
//# sourceMappingURL=utils.js.map