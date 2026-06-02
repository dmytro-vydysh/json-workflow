import { JWOperationError } from "../Error";

/** Utility accessors that normalize values into runtime objects used by the library. */
export class JWGetter {
  /**
   * Normalizes a timestamp, date string, or Date instance into a valid Date.
   * Throws a library-specific error when the input cannot be converted.
   */
  public static getDate(value: number | string | Date): Date {
    if (value instanceof Date) {
      if (isNaN(value.getTime())) throw new JWOperationError(`Invalid Date object: ${value}`);
      return value;
    }
    if (typeof value === 'number') {
      const date = new Date(value);
      if (isNaN(date.getTime()))
        throw new JWOperationError(`Invalid timestamp: ${value}`);
      return date;
    }
    if (typeof value === 'string') {
      const date = new Date(value);
      if (isNaN(date.getTime())) throw new JWOperationError(`Invalid date string: ${value}`);
      return date;
    }
    throw new JWOperationError(`Invalid date value: ${value}`);
  }
}