import { FormFieldState } from "./FormFieldState";
import { FormStateConfig } from "./FormStateConfig";
import { IValidationMessage } from "./IValidationMessage";
import { IFormValidator } from "./IFormValidator";
import { IFormRunner } from "./IFormRunner";
import { MutatedAttribute } from "mutation-tracker";
export declare class FormRunner<T extends {
    [field: string]: any;
}> implements IFormRunner<T> {
    private validator;
    private _stateTrackers;
    private _errorFlatList;
    constructor(validator: IFormValidator<IValidationMessage>, model: T, config?: FormStateConfig);
    get errorFlatList(): IValidationMessage[];
    get errors(): MutatedAttribute<T, string[]>;
    get touched(): MutatedAttribute<T, boolean>;
    get dirty(): MutatedAttribute<T, boolean>;
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
    isFormTouched(): boolean;
    isFormValid(): boolean;
    getFieldState<T>(name: string, currentValue: T, previousValue: T): FormFieldState<T>;
    validateAsync(model: T): Promise<boolean>;
    private setErrorsAll;
}
//# sourceMappingURL=FormRunner.d.ts.map