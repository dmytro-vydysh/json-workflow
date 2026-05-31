import { JWOperationError } from "../../Error";
import { IOperation } from "../../Resolver/types";
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
  public static async add(date: Date, amount: number | IOperation | Date, unit: 'seconds' | 'minutes' | 'hours' | 'days' | 'months' | 'years'): Promise<Date> {
    JWChecker.isDate(date, 1);

    if (['seconds', 'minutes', 'hours', 'days', 'months', 'years'].indexOf(unit) === -1)
      throw new JWOperationError(`Invalid unit for date.add transformer: ${unit}`);

    let ammountValue: number;
    if (typeof amount === 'number')
      ammountValue = amount;
    else if (amount instanceof Date)
      ammountValue = amount.getTime();
    else {
      const operationResult = await JWResolver.resolve(amount, { type: 'static', value: date }, []);
      if (typeof operationResult !== 'number')
        throw new JWOperationError(`Operation for date.add transformer must return a number, got ${typeof operationResult}`);
      ammountValue = operationResult;
    }
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
  public static async subtract(date: Date, amount: number | IOperation, unit: 'seconds' | 'minutes' | 'hours' | 'days' | 'months' | 'years'): Promise<Date> {
    JWChecker.isDate(date, 1);
    if (['seconds', 'minutes', 'hours', 'days', 'months', 'years'].indexOf(unit) === -1)
      throw new JWOperationError(`Invalid unit for date.subtract transformer: ${unit}`);

    let ammountValue: number;
    if (typeof amount === 'number') ammountValue = amount;
    else {
      const operationResult = await JWResolver.resolve(amount, { type: 'static', value: date }, []);
      if (typeof operationResult !== 'number')
        throw new JWOperationError(`Operation for date.subtract transformer must return a number, got ${typeof operationResult}`);
      ammountValue = operationResult;
    }
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
  public static async toLocaleString(date: Date, locale?: string, options: Intl.DateTimeFormatOptions = {}): Promise<string> {
    JWChecker.isDate(date, 1);
    return JWGetter.getDate(date).toLocaleString(locale, options);
  }

  /** Converts the date to an ISO-8601 string. */
  public static async toISOString(date: Date): Promise<string> {
    JWChecker.isDate(date, 1);
    return JWGetter.getDate(date).toISOString();
  }

  /** Returns the Unix timestamp (milliseconds) for the given date. */
  public static async get_time(date: Date): Promise<number> {
    JWChecker.isDate(date, 1);
    return JWGetter.getDate(date).getTime();
  }

  /** Computes the elapsed time from the given date to now in the selected unit. */
  public static async diff_from_now(date: Date, unit: 'seconds' | 'minutes' | 'hours' | 'days' | 'months' | 'years'): Promise<number> {
    console.log('diff_from_now called with', date, unit);
    JWChecker.isDate(date, 1);
    const now = new Date();
    let diff: number;
    switch (unit) {
      case 'seconds':
        diff = (now.getTime() - JWGetter.getDate(date).getTime()) / 1000;
        break;
      case 'minutes':
        diff = (now.getTime() - JWGetter.getDate(date).getTime()) / (1000 * 60);
        break;
      case 'hours':
        diff = (now.getTime() - JWGetter.getDate(date).getTime()) / (1000 * 60 * 60);
        break;
      case 'days':
        diff = (now.getTime() - JWGetter.getDate(date).getTime()) / (1000 * 60 * 60 * 24);
        break;
      case 'months':
        diff = (now.getTime() - JWGetter.getDate(date).getTime()) / (1000 * 60 * 60 * 24 * 30);
        break;
      case 'years':
        diff = (now.getTime() - JWGetter.getDate(date).getTime()) / (1000 * 60 * 60 * 24 * 365);
        break;
    }
    console.log('Calculated diff:', diff);
    return Math.abs(Math.trunc(diff));
  }

  /** Builds a human-readable elapsed-time string using selected date units and labels. */
  public static async diff_from_now_in_string(
    date: Date,
    year = true,
    year_string = 'y',
    month = true,
    month_string = 'm',
    day = true,
    day_string = 'd',
    hour = true,
    hour_string = 'h',
    minute = true,
    minute_string = 'min',
    second = true,
    second_string = 's'
  ): Promise<string> {

    JWChecker.isDate(date, 1);

    const target = JWGetter.getDate(date);
    const now = new Date();

    let diff = Math.abs(target.getTime() - now.getTime());

    const SECOND = 1000;
    const MINUTE = SECOND * 60;
    const HOUR = MINUTE * 60;
    const DAY = HOUR * 24;
    const MONTH = DAY * 30.4375;      // media reale
    const YEAR = DAY * 365.2425;      // media reale

    const years = Math.floor(diff / YEAR);
    diff %= YEAR;

    const months = Math.floor(diff / MONTH);
    diff %= MONTH;

    const days = Math.floor(diff / DAY);
    diff %= DAY;

    const hours = Math.floor(diff / HOUR);
    diff %= HOUR;

    const minutes = Math.floor(diff / MINUTE);
    diff %= MINUTE;

    const seconds = Math.floor(diff / SECOND);

    const result: string[] = [];

    if (year && years) result.push(`${years}${year_string}`);
    if (month && months) result.push(`${months}${month_string}`);
    if (day && days) result.push(`${days}${day_string}`);
    if (hour && hours) result.push(`${hours}${hour_string}`);
    if (minute && minutes) result.push(`${minutes}${minute_string}`);
    if (second && seconds) result.push(`${seconds}${second_string}`);

    return result.length
      ? result.join(' ')
      : `0${second_string}`;
  }

  /** Formats a date using YYYY/MM/DD/HH/mm/ss token replacements. */
  public static async format(date: Date, formatString: string): Promise<string> {
    JWChecker.isDate(date, 1);
    JWChecker.isString(formatString, 2);
    const _date = JWGetter.getDate(date);
    const year = _date.getFullYear();
    const month = (_date.getMonth() + 1).toString().padStart(2, '0');
    const day = _date.getDate().toString().padStart(2, '0');
    const hours = _date.getHours().toString().padStart(2, '0');
    const minutes = _date.getMinutes().toString().padStart(2, '0');
    const seconds = _date.getSeconds().toString().padStart(2, '0');
    return formatString
      .replace(/YYYY/g, year.toString())
      .replace(/MM/g, month)
      .replace(/DD/g, day)
      .replace(/HH/g, hours)
      .replace(/mm/g, minutes)
      .replace(/ss/g, seconds);
  }

  public static async date_only(date: Date): Promise<Date> {
    JWChecker.isDate(date, 1);
    const _date = JWGetter.getDate(date);
    return new Date(_date.getFullYear(), _date.getMonth(), _date.getDate());
  }
}