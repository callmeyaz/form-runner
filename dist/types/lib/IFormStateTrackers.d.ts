import { IMutationTracker } from "mutation-tracker";
/**
 * Interface to implement a form state tracker
 */
export interface IFormStateTrackers<T> {
    readonly touchedStateTracker: IMutationTracker<T, boolean>;
    readonly dirtyStateTracker: IMutationTracker<T, boolean>;
    readonly errorStateTracker: IMutationTracker<T, string[]>;
}
//# sourceMappingURL=IFormStateTrackers.d.ts.map