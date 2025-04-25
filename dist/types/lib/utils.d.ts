export declare function getDeep<T>(obj: any, path: string): T;
export declare function setDeep<T>(obj: any, value: T, path: string): any;
export declare function flattenObject(obj: any, separator: string): {};
export declare function flattenObjectToArray(obj: any, separator: string): {
    key: string;
    value: any;
}[];
export declare function deepFreeze<T>(obj: T): T;
//# sourceMappingURL=utils.d.ts.map