import { describe, it, expect, beforeAll, beforeEach, afterEach, jest } from '@jest/globals';
import { JWGetter } from '../utils/getter';
import { JWChecker } from '../utils/check';

describe('JWGetter', () => {
  describe('getDate', () => {
    it('should return a Date object when given a valid timestamp', () => {
      const timestamp = 1609459200000; // January 1, 2021
      const date = JWGetter.getDate(timestamp);
      expect(date).toBeInstanceOf(Date);
      expect(date.getTime()).toBe(timestamp);
    });

    it('should throw an error when given an NaN argument', () => {
      const invalidArgument = NaN;
      // @ts-ignore
      expect(() => JWGetter.getDate(invalidArgument)).toThrow();
    });

    it('should return a Date object when given a valid date string', () => {
      const dateString = '2021-01-01T00:00:00.000Z';
      const date = JWGetter.getDate(dateString);
      expect(date).toBeInstanceOf(Date);
      expect(date.toISOString()).toBe(dateString);
    });

    it('should return the same Date object when given a Date instance', () => {
      const dateInstance = new Date('2021-01-01T00:00:00.000Z');
      const date = JWGetter.getDate(dateInstance);
      expect(date).toBe(dateInstance);
    });

    it('should throw an error when given an invalid timestamp', () => {
      const invalidTimestamp = 'not_a_timestamp';
      expect(() => JWGetter.getDate(invalidTimestamp)).toThrow();
    });

    it('should throw an error when given an invalid date string', () => {
      const invalidDateString = 'not_a_date';
      expect(() => JWGetter.getDate(invalidDateString)).toThrow();
    });

    it('should throw an error when given an invalid Date object', () => {
      const invalidDate = new Date('invalid_date');
      expect(() => JWGetter.getDate(invalidDate)).toThrow();
    });

    it('should throw an error when given a non-date value', () => {
      const nonDateValue = { not: 'a date' };
      // @ts-ignore
      expect(() => JWGetter.getDate(nonDateValue)).toThrow();
    });
  });
});

// now checkers. they throw errors when the type is wrong, otherswise they do nothing
describe('JWChecker', () => {
  // isObject
  // isArray
  // isString
  // isNumber
  // isDate
  // isBoolean
  // isNumberAndNotNaN

  it('should throw an error when a non-object value is passed to isObject', () => {
    expect(() => JWChecker.isObject('not an object', 1)).toThrow();
    expect(() => JWChecker.isObject(123, 1)).toThrow();
    expect(() => JWChecker.isObject(null, 1)).toThrow();
    expect(() => JWChecker.isObject(undefined, 1)).toThrow();
    expect(() => JWChecker.isObject([], 1)).toThrow();
  });

  it('should throw an error when a non-array value is passed to isArray', () => {
    expect(() => JWChecker.isArray('not an array', 1)).toThrow();
    expect(() => JWChecker.isArray(123, 1)).toThrow();
    expect(() => JWChecker.isArray(null, 1)).toThrow();
    expect(() => JWChecker.isArray(undefined, 1)).toThrow();
    expect(() => JWChecker.isArray({}, 1)).toThrow();
  });

  it('should throw an error when a non-string value is passed to isString', () => {
    expect(() => JWChecker.isString(123, 1)).toThrow();
    expect(() => JWChecker.isString(null, 1)).toThrow();
    expect(() => JWChecker.isString(undefined, 1)).toThrow();
    expect(() => JWChecker.isString({}, 1)).toThrow();
    expect(() => JWChecker.isString([], 1)).toThrow();
  });

  it('should throw an error when a non-number value is passed to isNumber', () => {
    expect(() => JWChecker.isNumber('not a number', 1)).toThrow();
    expect(() => JWChecker.isNumber(null, 1)).toThrow();
    expect(() => JWChecker.isNumber(undefined, 1)).toThrow();
    expect(() => JWChecker.isNumber({}, 1)).toThrow();
    expect(() => JWChecker.isNumber([], 1)).toThrow();
    expect(() => JWChecker.isNumber(NaN, 1)).toThrow();
  });

  it('should throw an error when a non-date value is passed to isDate', () => {
    expect(() => JWChecker.isDate('not a date', 1)).toThrow();
    expect(() => JWChecker.isDate(null, 1)).toThrow();
    expect(() => JWChecker.isDate(undefined, 1)).toThrow();
    expect(() => JWChecker.isDate({}, 1)).toThrow();
    expect(() => JWChecker.isDate([], 1)).toThrow();
    expect(() => JWChecker.isDate(Date.now(), 1)).not.toThrow();
  });

  it('should throw an error when a non-boolean value is passed to isBoolean', () => {
    expect(() => JWChecker.isBoolean('not a boolean', 1)).toThrow();
    expect(() => JWChecker.isBoolean(123, 1)).toThrow();
    expect(() => JWChecker.isBoolean(null, 1)).toThrow();
    expect(() => JWChecker.isBoolean(undefined, 1)).toThrow();
    expect(() => JWChecker.isBoolean({}, 1)).toThrow();
    expect(() => JWChecker.isBoolean([], 1)).toThrow();
  });

  it('should throw an error when a non-number or NaN value is passed to isNumberAndNotNaN', () => {
    expect(() => JWChecker.isNumberAndNotNaN('not a number', 1)).toThrow();
    expect(() => JWChecker.isNumberAndNotNaN(null, 1)).toThrow();
    expect(() => JWChecker.isNumberAndNotNaN(undefined, 1)).toThrow();
    expect(() => JWChecker.isNumberAndNotNaN({}, 1)).toThrow();
    expect(() => JWChecker.isNumberAndNotNaN([], 1)).toThrow();
    expect(() => JWChecker.isNumberAndNotNaN(NaN, 1)).toThrow();
  });

});