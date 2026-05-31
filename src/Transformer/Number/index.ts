import { JWChecker } from "../../utils/check";

/** Numeric transformation helpers used by resolver transformer operations. */
export class JWNumberTransformer {

  /** Adds all provided numbers and returns the accumulated result. */
  public static async add(...numbers: number[]): Promise<number> {
    numbers.forEach((num, index) => JWChecker.isNumber(num, index + 1));
    return numbers.reduce((acc, num) => acc + num, 0);

  }

  /** Subtracts each subsequent number from the first one. */
  public static async substract(...numbers: number[]): Promise<number> {
    numbers.forEach((num, index) => JWChecker.isNumber(num, index + 1));
    return numbers.reduce((acc, num) => acc - num);
  }

  /** Multiplies two numbers. */
  public static async multiply(a: number, b: number): Promise<number> {
    JWChecker.isNumber(a, 1);
    JWChecker.isNumber(b, 2);

    return a * b;
  }

  /** Divides the first number by the second. */
  public static async divide(a: number, b: number): Promise<number> {
    JWChecker.isNumber(a, 1);
    JWChecker.isNumber(b, 2);

    return a / b;
  }

  /** Returns the remainder of dividing the first number by the second. */
  public static async modulo(a: number, b: number): Promise<number> {
    JWChecker.isNumber(a, 1);
    JWChecker.isNumber(b, 2);

    return a % b;
  }

  /** Raises the first number to the power of the second. */
  public static async power(a: number, b: number): Promise<number> {
    JWChecker.isNumber(a, 1);
    JWChecker.isNumber(b, 2);

    return Math.pow(a, b);
  }

  /** Flips the sign of the provided number. */
  public static async negate(number: number): Promise<number> {
    JWChecker.isNumber(number, 1);
    return -number;
  }

  /** Returns the absolute value of a number. */
  public static async abs(number: number): Promise<number> {
    JWChecker.isNumber(number, 1);
    return Math.abs(number);
  }

  /** Rounds a number to the nearest integer. */
  public static async round(number: number): Promise<number> {
    JWChecker.isNumber(number, 1);
    return Math.round(number);
  }

  /** Rounds a number down to the nearest integer. */
  public static async floor(number: number): Promise<number> {
    JWChecker.isNumber(number, 1);
    return Math.floor(number);
  }

  /** Rounds a number up to the nearest integer. */
  public static async ceil(number: number): Promise<number> {
    JWChecker.isNumber(number, 1);
    return Math.ceil(number);
  }

  /** Returns the square root of a number. */
  public static async sqrt(number: number): Promise<number> {
    JWChecker.isNumber(number, 1);
    return Math.sqrt(number);
  }

  /** Returns the largest number in the input. */
  public static async max(...numbers: number[]): Promise<number> {
    numbers.forEach((num, index) => JWChecker.isNumber(num, index + 1));
    return Math.max(...numbers);
  }

  /** Returns the smallest number in the input. */
  public static async min(...numbers: number[]): Promise<number> {
    numbers.forEach((num, index) => JWChecker.isNumber(num, index + 1));
    return Math.min(...numbers);
  }

  /** Truncates the fractional part of a number. */
  public static async to_int(number: number): Promise<number> {
    JWChecker.isNumber(number, 1);
    return Math.trunc(number);
  }

  /** Rounds a number to a fixed number of decimal places. */
  public static async round_to_decimals(number: number, decimals: number): Promise<number> {
    JWChecker.isNumber(number, 1);
    JWChecker.isNumber(decimals, 2);
    const factor = Math.pow(10, decimals);
    return Math.round(number * factor) / factor;
  }

  /** Converts a number into its string representation. */
  public static async to_string(number: number): Promise<string> {
    JWChecker.isNumber(number, 1);
    return number.toString();
  }

  /** Computes the arithmetic mean of the supplied numbers. */
  public static async avg(numbers: number[]): Promise<number> {
    numbers.forEach((num, index) => JWChecker.isNumber(num, index + 1));
    return numbers.reduce((acc, num) => acc + num, 0) / numbers.length;
  }

  /** Parses a number from a string using the built-in Number conversion. */
  public static async from_string(string: string): Promise<number> {
    JWChecker.isString(string, 1);
    return Number(string);
  }
}