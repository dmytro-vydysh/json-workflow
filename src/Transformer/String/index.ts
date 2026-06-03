import { JWContext } from "../../Resolver/assets";
import { JWChecker } from "../../utils/check";

/** String transformation helpers used by resolver transformer operations. */
export class JWStringTransformer {
  /** Concatenates all provided strings without a separator. */
  public static async concat(context: JWContext, ...strings: string[]): Promise<string> {
    strings.forEach((str, index) => { if (typeof str !== 'undefined' && str !== null) JWChecker.isString(str, index + 1) });
    return strings.filter(str => typeof str !== 'undefined' && str !== null).join('');
  }

  /** Joins an array of strings using the provided separator. */
  public static async join(context: JWContext, strings: string[], separator: string): Promise<string> {
    strings.forEach((str, index) => JWChecker.isString(str, index + 1));
    JWChecker.isString(separator, 2);
    return strings.join(separator);
  }

  /** Converts a string to uppercase. */
  public static async to_upper(context: JWContext, str: string): Promise<string> {
    JWChecker.isString(str, 1);
    return str.toUpperCase();
  }

  /** Converts a string to lowercase. */
  public static async to_lower(context: JWContext, str: string): Promise<string> {
    JWChecker.isString(str, 1);
    return str.toLowerCase();
  }

  /** Trims leading and trailing whitespace from a string. */
  public static async trim(context: JWContext, str: string): Promise<string> {
    JWChecker.isString(str, 1);
    return str.trim();
  }

  /** Returns the substring between the given start index and optional end index. */
  public static async substring(context: JWContext, str: string, start: number, end?: number): Promise<string> {
    JWChecker.isString(str, 1);
    JWChecker.isNumber(start, 2);
    if (end !== undefined)
      JWChecker.isNumber(end, 3);
    return str.substring(start, end);
  }

  /** Replaces the first occurrence of a substring. */
  public static async replace_one(context: JWContext, str: string, searchValue: string, replaceValue: string): Promise<string> {
    JWChecker.isString(str, 1);
    JWChecker.isString(searchValue, 2);
    JWChecker.isString(replaceValue, 3);
    return str.replace(searchValue, replaceValue);
  }

  /** Replaces all occurrences of a substring without using a regular expression. */
  public static async replace_all(context: JWContext, str: string, searchValue: string, replaceValue: string): Promise<string> {
    JWChecker.isString(str, 1);
    JWChecker.isString(searchValue, 2);
    JWChecker.isString(replaceValue, 3);
    return str.split(searchValue).join(replaceValue);
  }

  /** Replaces matches from a string or regular expression pattern. */
  public static async replace_regex(context: JWContext, str: string, regex_string: string | RegExp, replaceValue: string): Promise<string> {
    JWChecker.isString(str, 1);
    if (typeof regex_string === 'string')
      JWChecker.isString(regex_string, 2);
    JWChecker.isString(replaceValue, 3);

    const regex = regex_string instanceof RegExp ? regex_string : new RegExp(regex_string, 'g');

    return str.replace(regex, replaceValue);
  }

  /** Returns the string length. */
  public static async get_length(context: JWContext, str: string): Promise<number> {
    JWChecker.isString(str, 1);
    return str.length;
  }

  /** Splits a string using the provided separator. */
  public static async split(context: JWContext, str: string, separator: string): Promise<string[]> {
    JWChecker.isString(str, 1);
    JWChecker.isString(separator, 2);
    return str.split(separator);
  }
}