import isArray from 'lodash-es/isArray';
import isObject from 'lodash-es/isObject';
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