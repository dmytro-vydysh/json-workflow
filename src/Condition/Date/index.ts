import { JWOperationError } from "../../Error";
import { JWChecker } from "../../utils/check";
import { JWGetter } from "../../utils/getter";

/**
 * @class JWDateCondition
 * @description Class containing static methods for date conditions. These methods can be used in operations to check conditions on date values.
 */
export class JWDateCondition {
  
  /**
   * @param date Date to check
   * @param compareTo Date to compare with
   * @returns true if date is before compareTo, false otherwise
   */
  public static async is_before(date: Date, compareTo: Date): Promise<boolean> {
    JWChecker.isDate(date, 1);
    JWChecker.isDate(compareTo, 2);
    return JWGetter.getDate(date).getTime() < JWGetter.getDate(compareTo).getTime();
  }

  /**
   * @param date Date to check
   * @param compareTo Date to compare with
   * @returns true if date is before or the same as compareTo, false otherwise
   */
  public static async is_equal_or_before(date: Date, compareTo: Date): Promise<boolean> {
    JWChecker.isDate(date, 1);
    JWChecker.isDate(compareTo, 2);
    return JWGetter.getDate(date).getTime() <= JWGetter.getDate(compareTo).getTime();
  }

  /**
   * @param date Date to check
   * @param compareTo Date to compare with
   * @returns true if date is after compareTo, false otherwise
   */
  public static async is_after(date: Date, compareTo: Date): Promise<boolean> {
    JWChecker.isDate(date, 1);
    JWChecker.isDate(compareTo, 2);
    return JWGetter.getDate(date).getTime() > JWGetter.getDate(compareTo).getTime();
  }

  /**
   * @param date Date to check
   * @param compareTo Date to compare with
   * @returns true if date is after or the same as compareTo, false otherwise
   */
  public static async is_equal_or_after(date: Date, compareTo: Date): Promise<boolean> {
    JWChecker.isDate(date, 1);
    JWChecker.isDate(compareTo, 2);
    return JWGetter.getDate(date).getTime() >= JWGetter.getDate(compareTo).getTime();
  }

  /**
   * @param date Date to check
   * @param compareTo Date to compare with
   * @returns true if date and compareTo represent the same instant, false otherwise
   */
  public static async is_equal(date: Date, compareTo: Date): Promise<boolean> {
    JWChecker.isDate(date, 1);
    JWChecker.isDate(compareTo, 2);
    return JWGetter.getDate(date).getTime() === JWGetter.getDate(compareTo).getTime();
  }

  /**
   * @param date Date to check
   * @returns true if date corresponds to the current local calendar day, false otherwise
   */
  public static async is_today(date: Date): Promise<boolean> {
    JWChecker.isDate(date, 1);
    const today = new Date();
    const targetDate = JWGetter.getDate(date);
    return targetDate.getFullYear() === today.getFullYear() &&
      targetDate.getMonth() === today.getMonth() &&
      targetDate.getDate() === today.getDate();
  }

  /**
   * @param date Date to check
   * @returns true if date is in the past compared to the current time, false otherwise
   */
  public static async is_past(date: Date): Promise<boolean> {
    JWChecker.isDate(date, 1);
    return JWGetter.getDate(date).getTime() < Date.now();
  }

  /**
   * @param date Date to check
   * @returns true if date is in the future compared to the current time, false otherwise
   */
  public static async is_future(date: Date): Promise<boolean> {
    JWChecker.isDate(date, 1);
    return JWGetter.getDate(date).getTime() > Date.now();
  }

  /**
   * @param date Date to check
   * @returns true if date falls on Saturday or Sunday, false otherwise
   */
  public static async is_weekend(date: Date): Promise<boolean> {
    JWChecker.isDate(date, 1);
    const day = JWGetter.getDate(date).getDay();
    return day === 0 || day === 6;
  }

  /**
   * @param date Date to check
   * @returns true if date falls on a weekday (Monday to Friday), false otherwise
   */
  public static async is_weekday(date: Date): Promise<boolean> {
    JWChecker.isDate(date, 1);
    const day = JWGetter.getDate(date).getDay();
    return day >= 1 && day <= 5;
  }

  /**
   * @param date Date to check
   * @param start Start date of the range (inclusive)
   * @param end End date of the range (inclusive)
   * @returns true if date is between start and end (inclusive), false otherwise
   */
  public static async is_between(date: Date, start: Date, end: Date): Promise<boolean> {
    JWChecker.isDate(date, 1);
    JWChecker.isDate(start, 2);
    JWChecker.isDate(end, 3);
    const targetTime = JWGetter.getDate(date).getTime();
    const startTime = JWGetter.getDate(start).getTime();
    const endTime = JWGetter.getDate(end).getTime();
    return targetTime >= startTime && targetTime <= endTime;
  }

  /**
   * @param date Date to check
   * @param dayOfWeek Day of week to match (number from 0 to 6, where 0 is Sunday)
   * @returns true if date matches dayOfWeek, false otherwise
   */
  public static async is_day_of_week(date: Date, dayOfWeek: number): Promise<boolean> {
    JWChecker.isDate(date, 1);
    if (typeof dayOfWeek !== 'number' || dayOfWeek < 0 || dayOfWeek > 6) throw new JWOperationError(`Argument at position 2 must be a number between 0 (Sunday) and 6 (Saturday), got ${dayOfWeek}`);
    return JWGetter.getDate(date).getDay() === dayOfWeek;
  }
}