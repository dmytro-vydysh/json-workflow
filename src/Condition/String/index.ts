import { JWContext } from "../../Resolver/types";
import { JWChecker } from "../../utils/check";

/**
 * Collection of string condition helpers used to perform
 * comparisons and validations on string values.
 */
export class JWStringCondition {

  /**
   * Checks whether two strings are strictly equal.
   *
   * @param string1 - First string.
   * @param string2 - Second string.
   * @returns True if both strings are equal, otherwise false.
   */
  public static async eq(context: JWContext, string1: string, string2: string): Promise<boolean> {
    JWChecker.isString(string1, 1);
    JWChecker.isString(string2, 2);
    return string1 === string2;
  }

  /**
   * Checks whether two strings are different.
   *
   * @param string1 - First string.
   * @param string2 - Second string.
   * @returns True if the strings are different, otherwise false.
   */
  public static async neq(context: JWContext, string1: string, string2: string): Promise<boolean> {
    JWChecker.isString(string1, 1);
    JWChecker.isString(string2, 2);
    return string1 !== string2;
  }

  /**
   * Checks whether a string contains the specified substring.
   *
   * @param string1 - Source string.
   * @param string2 - Substring to search for.
   * @returns True if the substring exists within the source string.
   */
  public static async contains(context: JWContext, string1: string, string2: string): Promise<boolean> {
    JWChecker.isString(string1, 1);
    JWChecker.isString(string2, 2);
    return string1.includes(string2);
  }

  /**
   * Checks whether a string does not contain the specified substring.
   *
   * @param string1 - Source string.
   * @param string2 - Substring to search for.
   * @returns True if the substring does not exist within the source string.
   */
  public static async not_contains(context: JWContext, string1: string, string2: string): Promise<boolean> {
    JWChecker.isString(string1, 1);
    JWChecker.isString(string2, 2);
    return !string1.includes(string2);
  }

  /**
   * Checks whether a string starts with the specified prefix.
   *
   * @param string1 - Source string.
   * @param string2 - Prefix to validate.
   * @returns True if the string starts with the specified prefix.
   */
  public static async starts_with(context: JWContext, string1: string, string2: string): Promise<boolean> {
    JWChecker.isString(string1, 1);
    JWChecker.isString(string2, 2);
    return string1.startsWith(string2);
  }

  /**
   * Checks whether a string does not start with the specified prefix.
   *
   * @param string1 - Source string.
   * @param string2 - Prefix to validate.
   * @returns True if the string does not start with the specified prefix.
   */
  public static async not_starts_with(context: JWContext, string1: string, string2: string): Promise<boolean> {
    JWChecker.isString(string1, 1);
    JWChecker.isString(string2, 2);
    return !string1.startsWith(string2);
  }

  /**
   * Checks whether a string ends with the specified suffix.
   *
   * @param string1 - Source string.
   * @param string2 - Suffix to validate.
   * @returns True if the string ends with the specified suffix.
   */
  public static async ends_with(context: JWContext, string1: string, string2: string): Promise<boolean> {
    JWChecker.isString(string1, 1);
    JWChecker.isString(string2, 2);
    return string1.endsWith(string2);
  }

  /**
   * Checks whether a string does not end with the specified suffix.
   *
   * @param string1 - Source string.
   * @param string2 - Suffix to validate.
   * @returns True if the string does not end with the specified suffix.
   */
  public static async not_ends_with(context: JWContext, string1: string, string2: string): Promise<boolean> {
    JWChecker.isString(string1, 1);
    JWChecker.isString(string2, 2);
    return !string1.endsWith(string2);
  }

  /**
   * Checks whether a string matches the provided regular expression.
   *
   * @param string1 - String to validate.
   * @param string2 - Regular expression instance or pattern string.
   * @returns True if the string matches the regular expression.
   */
  public static async matches_regex(context: JWContext, string1: string, string2: string | RegExp): Promise<boolean> {
    JWChecker.isString(string1, 1);
    JWChecker.isString(string2, 2);
    const _regexp = string2 instanceof RegExp ? string2 : new RegExp(string2);
    return _regexp.test(string1);
  }

  /**
   * Checks whether the provided value is a string.
   *
   * @param value - Value to validate.
   * @returns True if the value is a string.
   */
  public static async is_string(context: JWContext, value: any): Promise<boolean> {
    return typeof value === 'string';
  }

  /**
   * Checks whether the string is empty.
   *
   * @param string - String to validate.
   * @returns True if the string has a length of zero.
   */
  public static async is_empty(context: JWContext, string: string): Promise<boolean> {
    JWChecker.isString(string, 1);
    return string.length === 0;
  }

  /**
   * Checks whether the string is not empty.
   *
   * @param string - String to validate.
   * @returns True if the string contains one or more characters.
   */
  public static async is_not_empty(context: JWContext, string: string): Promise<boolean> {
    JWChecker.isString(string, 1);
    return string.length > 0;
  }

}