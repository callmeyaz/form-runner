import { FormFieldState } from "./FormFieldState";
import { FormValidationConfig } from "./FormValidationConfig";
import { IValidationErrorMessage } from "./IValidationErrorMessage";
import { MutatedAttribute } from "mutation-tracker";
import { IFormValidator } from "./IFormValidator";
export interface IFormStateValidation<T> {
    readonly errorFlatList: IValidationErrorMessage[];
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
export declare class FormStateValidation<T extends {
    [field: string]: any;
}> implements IFormStateValidation<T> {
    private validator;
    private _stateTrackers;
    private _errorFlatList;
    constructor(validator: IFormValidator<IValidationErrorMessage>, model: T, config?: FormValidationConfig);
    get errorFlatList(): IValidationErrorMessage[];
    get errors(): {};
    get touched(): {};
    get dirty(): {};
    private setErrorFlatList;
    getFieldTouched(fieldName: string): boolean;
    setFieldTouched(value: boolean, fieldName: string): void;
    setFieldsTouched(value: boolean, fieldNames: string[]): void;
    setTouchedAll(value: boolean): void;
    getFieldDirty(fieldName: string): boolean;
    setFieldDirty(value: boolean, fieldName: string): void;
    setFieldsDirty(value: boolean, fieldNames: string[]): void;
    setDirtyAll(value: boolean): void;
    getFieldErrors(fieldName: string): string[];
    getFieldValid(fieldName: string): boolean;
    isFormDirty(): boolean;
    isFormValid(): boolean;
    getFieldState<T>(name: string, currentValue: T, previousValue: T): FormFieldState<T>;
    validateAsync(model: T): Promise<boolean>;
    private setErrorsAll;
}
//# sourceMappingURL=FormStateValidation.d.ts.map