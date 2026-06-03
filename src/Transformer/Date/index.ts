import { JWOperationError } from "../../Error";
import { TOperationType, JWContext } from "../../Resolver/assets";
import { JWResolver } from "../../Resolver";
import { JWChecker } from "../../utils/check";
import { JWGetter } from "../../utils/getter";

/**
 * Collection of date transformer helpers used to manipulate,
 * format and calculate date values.
 */
export class JWDateTransformer {

  /**
   * Creates a new date by adding the specified amount
   * in the selected time unit.
   *
   * If a operation is provided, it must return a numeric value.
   *
   * @param date - Source date.
   * @param amount - Amount to add, date timestamp or operation result.
   * @param unit - Time unit to increment.
   * @returns A new date instance with the calculated value.
   *
   * @throws {Error}
   * Thrown when the unit is invalid or the operation does not return a number.
   */
  public static async add(context: JWContext, date: Date, ammountValue: number, unit: 'seconds' | 'minutes' | 'hours' | 'days' | 'months' | 'years'): Promise<Date> {
    JWChecker.isDate(date, 1);
    JWChecker.isNumber(ammountValue, 2);

    if (['seconds', 'minutes', 'hours', 'days', 'months', 'years'].indexOf(unit) === -1)
      throw new JWOperationError(`Invalid unit for date.add transformer: ${unit}`);

    date = JWGetter.getDate(date);

    const newDate = new Date(date);
    switch (unit) {
      case 'seconds':
        newDate.setSeconds(newDate.getSeconds() + ammountValue);
        break;
      case 'minutes':
        newDate.setMinutes(newDate.getMinutes() + ammountValue);
        break;
      case 'hours':
        newDate.setHours(newDate.getHours() + ammountValue);
        break;
      case 'days':
        newDate.setDate(newDate.getDate() + ammountValue);
        break;
      case 'months':
        newDate.setMonth(newDate.getMonth() + ammountValue);
        break;
      case 'years':
        newDate.setFullYear(newDate.getFullYear() + ammountValue);
        break;
    }
    return newDate;
  }

  /** Returns a new date by subtracting the given amount in the specified time unit. */
  public static async subtract(context: JWContext, date: Date, ammountValue: number, unit: 'seconds' | 'minutes' | 'hours' | 'days' | 'months' | 'years'): Promise<Date> {
    JWChecker.isDate(date, 1);
    JWChecker.isNumber(ammountValue, 2);
    if (['seconds', 'minutes', 'hours', 'days', 'months', 'years'].indexOf(unit) === -1)
      throw new JWOperationError(`Invalid unit for date.subtract transformer: ${unit}`);


    date = JWGetter.getDate(date);

    const newDate = new Date(date);
    switch (unit) {
      case 'seconds':
        newDate.setSeconds(newDate.getSeconds() - ammountValue);
        break;
      case 'minutes':
        newDate.setMinutes(newDate.getMinutes() - ammountValue);
        break;
      case 'hours':
        newDate.setHours(newDate.getHours() - ammountValue);
        break;
      case 'days':
        newDate.setDate(newDate.getDate() - ammountValue);
        break;
      case 'months':
        newDate.setMonth(newDate.getMonth() - ammountValue);
        break;
      case 'years':
        newDate.setFullYear(newDate.getFullYear() - ammountValue);
        break;
    }
    return newDate;
  }

  /** Formats the date using locale-aware formatting options. */
  public static async toLocaleString(context: JWContext, date: Date, locale?: string): Promise<string> {
    JWChecker.isDate(date, 1);
    return JWGetter.getDate(date).toLocaleString(locale);
  }

  /** Converts the date to an ISO-8601 string. */
  public static async toISOString(context: JWContext, date: Date): Promise<string> {
    JWChecker.isDate(date, 1);
    return JWGetter.getDate(date).toISOString();
  }

  /** Returns the Unix timestamp (milliseconds) for the given date. */
  public static async get_time(context: JWContext, date: Date): Promise<number> {
    JWChecker.isDate(date, 1);
    return JWGetter.getDate(date).getTime();
  }

  /** Computes the elapsed time from the given date to now in the selected unit. */
  public static async diff_from_now(context: JWContext, date: Date, unit: 'seconds' | 'minutes' | 'hours' | 'days' | 'months' | 'years'): Promise<number> {
    JWChecker.isDate(date, 1);
    const now = Date.now();
    let diff: number;
    switch (unit) {
      case 'seconds':
        diff = (now - JWGetter.getDate(date).getTime()) / 1000;
        break;
      case 'minutes':
        diff = (now - JWGetter.getDate(date).getTime()) / (1000 * 60);
        break;
      case 'hours':
        diff = (now - JWGetter.getDate(date).getTime()) / (1000 * 60 * 60);
        break;
      case 'days':
        diff = (now - JWGetter.getDate(date).getTime()) / (1000 * 60 * 60 * 24);
        break;
      case 'months':
        diff = (now - JWGetter.getDate(date).getTime()) / (1000 * 60 * 60 * 24 * 30);
        break;
      case 'years':
        diff = (now - JWGetter.getDate(date).getTime()) / (1000 * 60 * 60 * 24 * 365);
        break;
    }
    return Math.abs(Math.trunc(diff));
  }


  /** Formats a date using YYYY/MM/DD/HH/mm/ss token replacements. */
  public static async format(context: JWContext, date: Date, formatString: string): Promise<string> {
    JWChecker.isDate(date, 1);
    JWChecker.isString(formatString, 2);
    const _date = JWGetter.getDate(date);
    const year = _date.getFullYear();
    const month = (_date.getMonth() + 1).toString().padStart(2, '0');
    const day = _date.getDate().toString().padStart(2, '0');
    const hours = _date.getHours().toString().padStart(2, '0');
    const minutes = _date.getMinutes().toString().padStart(2, '0');
    const seconds = _date.getSeconds().toString().padStart(2, '0');
    const month_name = _date.toLocaleString('default', { month: 'long' });
    const day_name = _date.toLocaleString('default', { weekday: 'long' });
    const month_name_short = _date.toLocaleString('default', { month: 'short' });
    const day_name_short = _date.toLocaleString('default', { weekday: 'short' });
    const year_short = year.toString().slice(-2);
    return formatString
      .replace(/YYYY/g, year.toString())
      .replace(/year_short/g, year_short)
      .replace(/MM/g, month)
      .replace(/month_name/g, month_name)
      .replace(/month_name_short/g, month_name_short)
      .replace(/DD/g, day)
      .replace(/day_name/g, day_name)
      .replace(/day_name_short/g, day_name_short)
      .replace(/HH/g, hours)
      .replace(/mm/g, minutes)
      .replace(/ss/g, seconds);
  }

  public static async date_only(context: JWContext, date: Date): Promise<Date> {
    JWChecker.isDate(date, 1);
    const _date = JWGetter.getDate(date);
    return new Date(_date.getFullYear(), _date.getMonth(), _date.getDate());
  }
}