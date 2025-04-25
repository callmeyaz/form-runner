import forEach from "lodash-es/forEach";
import map from "lodash-es/map";
import some from "lodash-es/some";
import { FormFieldState } from "./FormFieldState";
import { FormStateTrackers } from "./FormStateTrackers";
import { FormStateConfig } from "./FormStateConfig";
import { IValidationMessage } from "./IValidationMessage";
import { flattenObjectToArray } from "./utils";
import { IFormValidator } from "./IFormValidator";
import { IFormStateTrackers } from "./IFormStateTrackers";
import { IFormRunner } from "./IFormRunner";
import { MutatedAttribute } from "mutation-tracker";

export class FormRunner<T extends { [field: string]: any }> implements IFormRunner<T> {

  private _stateTrackers: IFormStateTrackers<T>;
  private _errorFlatList: IValidationMessage[] = [];

  public constructor(
    private validator: IFormValidator<IValidationMessage>,
    model: T, config?: FormStateConfig) {
    this._stateTrackers = new FormStateTrackers(model, config);
  }

  get errorFlatList(): IValidationMessage[] {
    return this._errorFlatList;
  }

  get errors(): MutatedAttribute<T, string[]> {
    return this._stateTrackers.errorStateTracker.state;
  }

  get touched(): MutatedAttribute<T, boolean> {
    return this._stateTrackers.touchedStateTracker.state;
  }

  get dirty(): MutatedAttribute<T, boolean> {
    return this._stateTrackers.dirtyStateTracker.state;
  }

  private setErrorFlatList(errors: IValidationMessage[]): void {
    this._errorFlatList = errors;
  }

  //#region touched functions
  public getFieldTouched(fieldName: string): boolean {
    return this._stateTrackers.touchedStateTracker.getMutatedByAttributeName(fieldName);
  }

  public setFieldTouched(value: boolean, fieldName: string): void {
    this._stateTrackers.touchedStateTracker.setMutatedByAttributeName(value, fieldName);
  }

  public setFieldsTouched(value: boolean, fieldNames: string[]): void {
    this._stateTrackers.touchedStateTracker.setMutatedByAttributeNames(value, fieldNames);
  }

  public setTouchedAll(value: boolean): void {
    this._stateTrackers.touchedStateTracker.setAll(value);
  }
  //#endregion

  //#region dirty functions
  public getFieldDirty(fieldName: string): boolean {
    return this._stateTrackers.dirtyStateTracker.getMutatedByAttributeName(fieldName);
  }

  public setFieldDirty(value: boolean, fieldName: string): void {
    this._stateTrackers.dirtyStateTracker.setMutatedByAttributeName(value, fieldName);
  }

  public setFieldsDirty(value: boolean, fieldNames: string[]): void {
    this._stateTrackers.dirtyStateTracker.setMutatedByAttributeNames(value, fieldNames);
  }

  public setDirtyAll(value: boolean): void {
    this._stateTrackers.dirtyStateTracker.setAll(value);
  }
  //#endregion

  //#region error functions
  public getFieldErrors(fieldName: string): string[] {
    var errors = this._stateTrackers.errorStateTracker.getMutatedByAttributeName(fieldName)
    return map(errors, item => item);
  }
  //#endregion

  //#region validation functions
  public getFieldValid(fieldName: string): boolean {
    return (this._stateTrackers.errorStateTracker.getMutatedByAttributeName(fieldName).length ?? 0) <= 0;
  }
  //#endregion

  public isFormDirty(): boolean {
    return some(flattenObjectToArray(this._stateTrackers.dirtyStateTracker.state, "."), (item) => item.value);
  }

  public isFormValid(): boolean {
    return !(this.errorFlatList.length);
  }

  public getFieldState<T>(name: string, currentValue: T, previousValue: T): FormFieldState<T> {
    var fieldErrors = this._stateTrackers.errorStateTracker.getMutatedByAttributeName(name);
    return {
      name: name,
      currentValue: currentValue,
      previousValue: previousValue,
      touched: this._stateTrackers.touchedStateTracker.getMutatedByAttributeName(name),
      dirty: this._stateTrackers.dirtyStateTracker.getMutatedByAttributeName(name),
      isValid: !!(fieldErrors.length),
      errors: fieldErrors,
    };
  }

  public validateAsync(model: T): Promise<boolean> {
    return this.validator.validate(model)
      .then((response) => {
        this.setErrorsAll(response);
        return this.isFormValid();
      });
  }

  private setErrorsAll(errors: IValidationMessage[]): void {
    this.setErrorFlatList(errors);
    this._stateTrackers.errorStateTracker.clear();
    var groups = Object.groupBy(errors, ({ key }) => key)
    forEach(groups, (group, key) => {
      var messages = group?.map(x => x.message) || [];
      this._stateTrackers.errorStateTracker.setMutatedByAttributeName(messages, key);
    });
  }
}