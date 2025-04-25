import { MutationTracker } from "mutation-tracker";
/***
 * Class that manages required trackers for a form state.
 * there 3 states that need to be tracked at the field level.
 * 1 - Touched
 * 2 - Dirty
 * 3 - Error
 */
export class FormStateTrackers {
    _touchedStateTracker;
    _dirtyStateTracker;
    _errorStateTracker;
    get touchedStateTracker() {
        return this._touchedStateTracker;
    }
    get dirtyStateTracker() {
        return this._dirtyStateTracker;
    }
    get errorStateTracker() {
        return this._errorStateTracker;
    }
    constructor(dataObject, config) {
        this._touchedStateTracker = MutationTracker(dataObject, {
            defaultValue: false,
            initialMutation: {
                mutatedAttributes: config?.initiallyTouched,
                mutatedValue: true
            }
        });
        this._dirtyStateTracker = MutationTracker(dataObject, {
            defaultValue: false,
            initialMutation: {
                mutatedAttributes: config?.initiallyDirty,
                mutatedValue: true
            }
        });
        this._errorStateTracker = MutationTracker(dataObject, {
            defaultValue: []
        });
    }
}
//# sourceMappingURL=FormStateTrackers.js.map