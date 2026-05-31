import { JWOperationError } from "../../Error";
import { JWChecker } from "../../utils/check";

/**
 * Collection of numeric condition helpers used to perform comparisons
 * and validations on numbers.
 */
export class JWNumberCondition {

  /**
   * Checks whether the first number is greater than the second.
   *
   * @param number1 - Number to compare.
   * @param number2 - Reference number.
   * @returns True if `number1` is greater than `number2`, otherwise false.
   */
  public static async gt(number1: number, number2: number): Promise<boolean> {
    JWChecker.isNumberAndNotNaN(number1, 1);
    JWChecker.isNumberAndNotNaN(number2, 2);
    return number1 > number2;
  }

  /**
   * Checks whether the first number is less than the second.
   *
   * @param number1 - Number to compare.
   * @param number2 - Reference number.
   * @returns True if `number1` is less than `number2`, otherwise false.
   */
  public static async lt(number1: number, number2: number): Promise<boolean> {
    JWChecker.isNumberAndNotNaN(number1, 1);
    JWChecker.isNumberAndNotNaN(number2, 2);
    return number1 < number2;
  }

  /**
   * Checks whether two numbers are strictly equal.
   *
   * @param number1 - First number.
   * @param number2 - Second number.
   * @returns True if both numbers are equal, otherwise false.
   */
  public static async eq(number1: number, number2: number): Promise<boolean> {
    JWChecker.isNumberAndNotNaN(number1, 1);
    JWChecker.isNumberAndNotNaN(number2, 2);
    return number1 === number2;
  }

  /**
   * Checks whether two numbers are different.
   *
   * @param number1 - First number.
   * @param number2 - Second number.
   * @returns True if the numbers are different, otherwise false.
   */
  public static async neq(number1: number, number2: number): Promise<boolean> {
    JWChecker.isNumberAndNotNaN(number1, 1);
    JWChecker.isNumberAndNotNaN(number2, 2);
    return number1 !== number2;
  }

  /**
   * Checks whether the first number is greater than or equal to the second.
   *
   * @param number1 - Number to compare.
   * @param number2 - Reference number.
   * @returns True if `number1` is greater than or equal to `number2`.
   */
  public static async gte(number1: number, number2: number): Promise<boolean> {
    JWChecker.isNumberAndNotNaN(number1, 1);
    JWChecker.isNumberAndNotNaN(number2, 2);
    return number1 >= number2;
  }

  /**
   * Checks whether the first number is less than or equal to the second.
   *
   * @param number1 - Number to compare.
   * @param number2 - Reference number.
   * @returns True if `number1` is less than or equal to `number2`.
   */
  public static async lte(number1: number, number2: number): Promise<boolean> {
    JWChecker.isNumberAndNotNaN(number1, 1);
    JWChecker.isNumberAndNotNaN(number2, 2);
    return number1 <= number2;
  }

  /**
   * Checks whether a number is within the specified range (inclusive).
   *
   * @param number1 - Number to validate.
   * @param number2 - Minimum allowed value.
   * @param number3 - Maximum allowed value.
   * @returns True if `number1` is between `number2` and `number3` inclusive.
   */
  public static async between(number1: number, number2: number, number3: number): Promise<boolean> {
    JWChecker.isNumberAndNotNaN(number1, 1);
    JWChecker.isNumberAndNotNaN(number2, 2);
    JWChecker.isNumberAndNotNaN(number3, 3);
    return number1 >= number2 && number1 <= number3;
  }

  /**
   * Checks whether the provided value is NaN.
   *
   * @param number - Number to validate.
   * @returns True if the value is NaN, otherwise false.
   */
  public static async is_nan(number: number): Promise<boolean> {
    if (typeof number !== 'number') throw new JWOperationError(`Argument must be a number, got ${number}`);
    return isNaN(number);
  }

  /**
   * Checks whether the provided value is not NaN.
   *
   * @param number - Number to validate.
   * @returns True if the value is a valid number, otherwise false.
   */
  public static async is_not_nan(number: number): Promise<boolean> {
    if (typeof number !== 'number') throw new JWOperationError(`Argument must be a number, got ${number}`);
    return !isNaN(number);
  }

  /**
   * Checks whether the number is an integer.
   *
   * @param number - Number to validate.
   * @returns True if the number is an integer.
   */
  public static async is_int(number: number): Promise<boolean> {
    JWChecker.isNumberAndNotNaN(number, 1);
    return Number.isInteger(number);
  }

  /**
   * Checks whether the number is a floating-point value.
   *
   * @param number - Number to validate.
   * @returns True if the number is not an integer.
   */
  public static async is_float(number: number): Promise<boolean> {
    JWChecker.isNumberAndNotNaN(number, 1);
    return !Number.isInteger(number);
  }

  /**
   * Checks whether the number is greater than zero.
   *
   * @param number - Number to validate.
   * @returns True if the number is positive.
   */
  public static async is_positive(number: number): Promise<boolean> {
    JWChecker.isNumberAndNotNaN(number, 1);
    return number > 0;
  }

  /**
   * Checks whether the number is equal to zero.
   *
   * @param number - Number to validate.
   * @returns True if the number is zero.
   */
  public static async is_zero(number: number): Promise<boolean> {
    JWChecker.isNumberAndNotNaN(number, 1);
    return number === 0;
  }

  /**
   * Checks whether the number is less than zero.
   *
   * @param number - Number to validate.
   * @returns True if the number is negative.
   */
  public static async is_negative(number: number): Promise<boolean> {
    JWChecker.isNumberAndNotNaN(number, 1);
    return number < 0;
  }

  /**
   * Checks whether the number is odd.
   *
   * @param number - Number to validate.
   * @returns True if the number is odd.
   */
  public static async is_odd(number: number): Promise<boolean> {
    JWChecker.isNumberAndNotNaN(number, 1);
    return number % 2 !== 0;
  }

  /**
   * Checks whether the number is even.
   *
   * @param number - Number to validate.
   * @returns True if the number is even.
   */
  public static async is_even(number: number): Promise<boolean> {
    JWChecker.isNumberAndNotNaN(number, 1);
    return number % 2 === 0;
  }

  /**
   * Checks whether the provided value is a valid number.
   *
   * @param value - Value to validate.
   * @returns True if the value is a number and not NaN.
   */
  public static async is_number(value: any): Promise<boolean> {
    return typeof value === 'number' && !isNaN(value);
  }
}