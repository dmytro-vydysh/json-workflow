import { JWOperationArgumentError } from "../Error";

/**
 * @description Utility class for checking argument types and throwing descriptive errors when checks fail. This class is used throughout the library to validate inputs to transformers, conditions, and other operation components.
 */
export class JWChecker {
  private static formatMessage(expectedType: string, actualValue: any, argIndex: number): string {
    return `Argument at position ${argIndex} must be of type ${expectedType}, got ${typeof actualValue}. Value: ${JSON.stringify(actualValue)}`;
  }

  public static isObject(value: any, argIndex: number): void {
    const result = value !== null && typeof value === 'object' && !Array.isArray(value);
    if (!result)
      throw new JWOperationArgumentError(this.formatMessage('object', value, argIndex));
  }
  public static isArray(value: any, argIndex: number): void {
    const result = Array.isArray(value);
    if (!result)
      throw new JWOperationArgumentError(this.formatMessage('array', value, argIndex));
  }
  public static isString(value: any, argIndex: number): void {
    const result = typeof value === 'string';
    if (!result)
      throw new JWOperationArgumentError(this.formatMessage('string', value, argIndex));
  }
  public static isNumber(value: any, argIndex: number): void {
    const result = typeof value === 'number' && !isNaN(value);
    if (!result)
      throw new JWOperationArgumentError(this.formatMessage('number', value, argIndex));
  }
  public static isDate(value: any, argIndex: number): void {
    const isDateInstance = value instanceof Date;
    const isISOString = typeof value === 'string' && !isNaN(Date.parse(value));
    const isTimestamp = typeof value === 'number' && !isNaN(new Date(value).getTime());
    const result = isDateInstance || isISOString || isTimestamp;
    if (!result)
      throw new JWOperationArgumentError(this.formatMessage('date (Date, ISO, timestamp)', value, argIndex));
  }
  public static isBoolean(value: any, argIndex: number): void {
    const result = typeof value === 'boolean';
    if (!result)
      throw new JWOperationArgumentError(this.formatMessage('boolean', value, argIndex));
  }
  public static isNumberAndNotNaN(value: any, argIndex: number): void {
    const result = typeof value === 'number' && !isNaN(value);
    if (!result)
      throw new JWOperationArgumentError(this.formatMessage('number and not NaN', value, argIndex));
  }
}