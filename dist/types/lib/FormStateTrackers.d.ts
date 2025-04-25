import { IMutationTracker } from "mutation-tracker";
import { FormStateConfig } from "./FormValidationConfig";
import { IFormStateTrackers } from "./IFormStateTrackers";
/***
 * Class that manages required trackers for a form state.
 * there 3 states that need to be tracked at the field level.
 * 1 - Touched
 * 2 - Dirty
 * 3 - Error
 */
export declare class FormStateTrackers<T extends {
    [field: string]: any;
} | {}> implements IFormStateTrackers<T> {
    private _touchedStateTracker;
    private _dirtyStateTracker;
    private _errorStateTracker;
    get touchedStateTracker(): IMutationTracker<T, boolean>;
    get dirtyStateTracker(): IMutationTracker<T, boolean>;
    get errorStateTracker(): IMutationTracker<T, string[]>;
    constructor(dataObject: T, config?: FormStateConfig);
}
//# sourceMappingURL=FormStateTrackers.d.ts.map