import { FormFieldState } from "./FormFieldState";
import { FormStateConfig } from "./FormValidationConfig";
import { IValidationMessage } from "./IValidationErrorMessage";
import { IFormValidator } from "./IFormValidator";
import { IFormStateValidation } from "./IFormStateValidation";
export declare class FormStateValidation<T extends {
    [field: string]: any;
}> implements IFormStateValidation<T> {
    private validator;
    private _stateTrackers;
    private _errorFlatList;
    constructor(validator: IFormValidator<IValidationMessage>, model: T, config?: FormStateConfig);
    get errorFlatList(): IValidationMessage[];
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