import { IMutationTracker, MutationTracker } from "mutation-tracker";
import { FormStateConfig } from "./FormStateConfig";
import { IFormStateTrackers } from "./IFormStateTrackers";

/***
 * Class that manages required trackers for a form state.
 * there 3 states that need to be tracked at the field level.
 * 1 - Touched
 * 2 - Dirty
 * 3 - Error
 */
export class FormStateTrackers<T extends { [field: string]: any } | {}> implements IFormStateTrackers<T> {

  private _touchedStateTracker: IMutationTracker<T, boolean>;
  private _dirtyStateTracker: IMutationTracker<T, boolean>;
  private _errorStateTracker: IMutationTracker<T, string[]>;

  /**
   * Mutation-Tracker for touched fields
   */
  public get touchedStateTracker(): IMutationTracker<T, boolean> {
    return this._touchedStateTracker;
  }

  /**
   * Mutation-Tracker for dirty fields
   */
  public get dirtyStateTracker(): IMutationTracker<T, boolean> {
    return this._dirtyStateTracker;
  }

  /**
   * Mutation-Trackr for error fields
   */
  public get errorStateTracker(): IMutationTracker<T, string[]> {
    return this._errorStateTracker;
  }

  constructor(dataObject: T, config?: FormStateConfig) {
    this._touchedStateTracker = MutationTracker(dataObject, {
      defaultValue: false,
      initialMutation: {
        mutatedAttributes: config?.initiallyTouched || [],
        mutatedValue: true
      }
    });

    this._dirtyStateTracker = MutationTracker(dataObject, {
      defaultValue: false,
      initialMutation: {
        mutatedAttributes: config?.initiallyDirty || [],
        mutatedValue: true
      }
    });

    this._errorStateTracker = MutationTracker(dataObject, {
      defaultValue: [] as string[]
    });
  }
}