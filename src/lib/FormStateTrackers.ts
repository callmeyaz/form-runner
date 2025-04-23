import { IMutationTracker, MutationTracker } from "mutation-tracker";
import { FormValidationConfig } from "./FormValidationConfig";

export interface IStateTrackers<T> {
  readonly touchedStateTracker: IMutationTracker<T, boolean>;
  readonly dirtyStateTracker: IMutationTracker<T, boolean>;
  readonly errorStateTracker: IMutationTracker<T, string[]>;
}

export class FormStateTrackers<T extends { [field: string]: any } | {}> implements IStateTrackers<T> {

  private _touchedStateTracker: IMutationTracker<T, boolean>;
  private _dirtyStateTracker: IMutationTracker<T, boolean>;
  private _errorStateTracker: IMutationTracker<T, string[]>;

  public get touchedStateTracker(): IMutationTracker<T, boolean> {
    return this._touchedStateTracker;
  }

  public get dirtyStateTracker(): IMutationTracker<T, boolean> {
    return this._dirtyStateTracker;
  }

  public get errorStateTracker(): IMutationTracker<T, string[]> {
    return this._errorStateTracker;
  }

  constructor(dataObject: T, config?: FormValidationConfig) {
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
      defaultValue: [] as string[]
    });
  }
}