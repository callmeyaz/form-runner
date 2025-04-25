import { IValidationMessage } from "./IValidationErrorMessage";

/**
 * interface to implement form validation
 */
export interface IFormValidator<M extends IValidationMessage> {
  validate: (data: any) => Promise<M[]>;
}