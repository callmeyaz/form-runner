import { IMutationTracker } from "mutation-tracker";
import { FormValidationConfig } from "./FormValidationConfig";
export interface IStateTrackers<T> {
    readonly touchedStateTracker: IMutationTracker<T, boolean>;
    readonly dirtyStateTracker: IMutationTracker<T, boolean>;
    readonly errorStateTracker: IMutationTracker<T, string[]>;
}
export declare class FormStateTrackers<T extends {
    [field: string]: any;
} | {}> implements IStateTrackers<T> {
    private _touchedStateTracker;
    private _dirtyStateTracker;
    private _errorStateTracker;
    get touchedStateTracker(): IMutationTracker<T, boolean>;
    get dirtyStateTracker(): IMutationTracker<T, boolean>;
    get errorStateTracker(): IMutationTracker<T, string[]>;
    constructor(dataObject: T, config?: FormValidationConfig);
}
//# sourceMappingURL=FormStateTrackers.d.ts.map