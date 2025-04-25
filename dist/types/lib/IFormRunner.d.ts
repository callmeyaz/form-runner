import { MutatedAttribute } from "mutation-tracker";
import { IValidationMessage } from "./IValidationMessage";
import { FormFieldState } from "./FormFieldState";
export interface IFormRunner<T> {
    readonly errorFlatList: IValidationMessage[];
    readonly errors: MutatedAttribute<T, string[]>;
    readonly touched: MutatedAttribute<T, boolean>;
    readonly dirty: MutatedAttribute<T, boolean>;
    getFieldTouched: (fieldName: string) => boolean;
    setFieldTouched: (value: boolean, fieldName: string) => void;
    setFieldsTouched: (value: boolean, fieldNames: string[]) => void;
    setTouchedAll: (value: boolean) => void;
    getFieldDirty: (fieldName: string) => boolean;
    setFieldDirty: (value: boolean, fieldName: string) => void;
    setFieldsDirty: (value: boolean, fieldNames: string[]) => void;
    setDirtyAll: (value: boolean) => void;
    getFieldErrors: (fieldName: string) => string[];
    getFieldValid: (fieldName: string) => boolean;
    isFormDirty: () => boolean;
    isFormValid: () => boolean;
    getFieldState: <T>(name: string, currentValue: T, previousValue: T) => FormFieldState<T>;
    validateAsync: (model: T) => Promise<boolean>;
}
//# sourceMappingURL=IFormRunner.d.ts.map