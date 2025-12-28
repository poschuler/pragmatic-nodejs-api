import type { ValidationError } from "./validation-error";

export class ValidationException extends Error {
  public readonly errors: ValidationError[];

  constructor(errors: ValidationError[]) {
    super("Validation failed");
    this.errors = errors;
    Object.setPrototypeOf(this, ValidationException.prototype);
  }
}
