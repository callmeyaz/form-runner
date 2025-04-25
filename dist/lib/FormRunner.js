import forEach from "lodash-es/forEach";
import map from "lodash-es/map";
import some from "lodash-es/some";
import { FormStateTrackers } from "./FormStateTrackers";
import { flattenObjectToArray } from "./utils";
export class FormRunner {
    validator;
    _stateTrackers;
    _errorFlatList = [];
    constructor(validator, model, config) {
        this.validator = validator;
        this._stateTrackers = new FormStateTrackers(model, config);
    }
    get errorFlatList() {
        return this._errorFlatList;
    }
    get errors() {
        return this._stateTrackers.errorStateTracker.state;
    }
    get touched() {
        return this._stateTrackers.touchedStateTracker.state;
    }
    get dirty() {
        return this._stateTrackers.dirtyStateTracker.state;
    }
    setErrorFlatList(errors) {
        this._errorFlatList = errors;
    }
    //#region touched functions
    getFieldTouched(fieldName) {
        return this._stateTrackers.touchedStateTracker.getMutatedByAttributeName(fieldName);
    }
    setFieldTouched(value, fieldName) {
        this._stateTrackers.touchedStateTracker.setMutatedByAttributeName(value, fieldName);
    }
    setFieldsTouched(value, fieldNames) {
        this._stateTrackers.touchedStateTracker.setMutatedByAttributeNames(value, fieldNames);
    }
    setTouchedAll(value) {
        this._stateTrackers.touchedStateTracker.setAll(value);
    }
    //#endregion
    //#region dirty functions
    getFieldDirty(fieldName) {
        return this._stateTrackers.dirtyStateTracker.getMutatedByAttributeName(fieldName);
    }
    setFieldDirty(value, fieldName) {
        this._stateTrackers.dirtyStateTracker.setMutatedByAttributeName(value, fieldName);
    }
    setFieldsDirty(value, fieldNames) {
        this._stateTrackers.dirtyStateTracker.setMutatedByAttributeNames(value, fieldNames);
    }
    setDirtyAll(value) {
        this._stateTrackers.dirtyStateTracker.setAll(value);
    }
    //#endregion
    //#region error functions
    getFieldErrors(fieldName) {
        var errors = this._stateTrackers.errorStateTracker.getMutatedByAttributeName(fieldName);
        return map(errors, item => item);
    }
    //#endregion
    //#region validation functions
    getFieldValid(fieldName) {
        return (this._stateTrackers.errorStateTracker.getMutatedByAttributeName(fieldName).length ?? 0) <= 0;
    }
    //#endregion
    isFormDirty() {
        return some(flattenObjectToArray(this._stateTrackers.dirtyStateTracker.state, "."), (item) => item.value);
    }
    isFormValid() {
        return !(this.errorFlatList.length);
    }
    getFieldState(name, currentValue, previousValue) {
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
    validateAsync(model) {
        return this.validator.validate(model)
            .then((response) => {
            this.setErrorsAll(response);
            return this.isFormValid();
        });
    }
    setErrorsAll(errors) {
        this.setErrorFlatList(errors);
        this._stateTrackers.errorStateTracker.clear();
        var groups = Object.groupBy(errors, ({ key }) => key);
        forEach(groups, (group, key) => {
            var messages = group?.map(x => x.message) || [];
            this._stateTrackers.errorStateTracker.setMutatedByAttributeName(messages, key);
        });
    }
}
//# sourceMappingURL=FormRunner.js.map