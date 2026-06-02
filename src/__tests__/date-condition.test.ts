import { describe, it, expect, beforeAll, beforeEach, afterEach, jest } from '@jest/globals';
import {
  JWResolver,
  TOperationType,
  __TRANSFORMER__,
  __STATIC__,
  __OPERATION__,
  __DATE_ADD__,
  __DATE_SUBTRACT__,
  __DATE_TOLOCALESTRING__,
  __DATE_TOISOSTRING__,
  __DATE_GET_TIME__,
  __DATE_DIFF_FROM_NOW__,
  __DATE_FORMAT__,
  __DATE_DATE_ONLY__,
  __RESOLVER__,
  __DAYS__,
  __HOURS__,
  __SECONDS__,
  __MINUTES__,
  __MONTHS__,
  __YEARS__,
  __DATE_IS_BEFORE__,
  __DATE_IS_AFTER__,
  __DATE_IS_EQUAL__,
  __DATE_IS_EQUAL_OR_AFTER__,
  __DATE_IS_EQUAL_OR_BEFORE__,
  __DATE_IS_TODAY__,
  __DATE_IS_PAST__,
  __DATE_IS_FUTURE__,
  __DATE_IS_BETWEEN__,
  __DATE_IS_DAY_OF_WEEK__,
  __DATE_IS_WEEKDAY__,
  __DATE_IS_WEEKEND__,
  IResolverOperationCondition
} from '..';
import { JWOperationError } from '../Error';

const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);

const yesterday = new Date();
yesterday.setDate(yesterday.getDate() - 1);

const today = new Date();

const weekend_day = new Date(2026, 5, 6);
const weekday_day = new Date(2026, 5, 8); 

describe('is before', () => {
  it('should return true if the value date is before the argument date', async () => {
    const condition: IResolverOperationCondition = {
      $condition: {
        name: __DATE_IS_BEFORE__,
        value: { $static: yesterday },
        arguments: [
          { $static: tomorrow }
        ]
      }
    };
    expect(await JWResolver.run(condition)).toBe(true);
  });
  it('should return false if the value date is after the argument date', async () => {
    const condition: IResolverOperationCondition = {
      $condition: {
        name: __DATE_IS_BEFORE__,
        value: { $static: tomorrow },
        arguments: [
          { $static: yesterday }
        ]
      }
    };
    expect(await JWResolver.run(condition)).toBe(false);
  });
});

describe('is equal or before', () => {
  it('should return true if the value date is before the argument date', async () => {
    const condition: IResolverOperationCondition = {
      $condition: {
        name: __DATE_IS_EQUAL_OR_BEFORE__,
        value: { $static: yesterday },
        arguments: [
          { $static: tomorrow }
        ]
      }
    };
    expect(await JWResolver.run(condition)).toBe(true);
  });
  it('should return true if the value date is the same as the argument date', async () => {
    const condition: IResolverOperationCondition = {
      $condition: {
        name: __DATE_IS_EQUAL_OR_BEFORE__,
        value: { $static: tomorrow },
        arguments: [
          { $static: tomorrow }
        ]
      }
    };
    expect(await JWResolver.run(condition)).toBe(true);
  });
  it('should return false if the value date is after the argument date', async () => {
    const condition: IResolverOperationCondition = {
      $condition: {
        name: __DATE_IS_EQUAL_OR_BEFORE__,
        value: { $static: tomorrow },
        arguments: [
          { $static: yesterday }
        ]
      }
    };
    expect(await JWResolver.run(condition)).toBe(false);
  });
});

describe('is after', () => {
  it('should return true if the value date is after the argument date', async () => {
    const condition: IResolverOperationCondition = {
      $condition: {
        name: __DATE_IS_AFTER__,
        value: { $static: tomorrow },
        arguments: [
          { $static: yesterday }
        ]
      }
    };
    expect(await JWResolver.run(condition)).toBe(true);
  });
  it('should return false if the value date is before the argument date', async () => {
    const condition: IResolverOperationCondition = {
      $condition: {
        name: __DATE_IS_AFTER__,
        value: { $static: yesterday },
        arguments: [
          { $static: tomorrow }
        ]
      }
    };
    expect(await JWResolver.run(condition)).toBe(false);
  });
});

describe('is equal or after', () => {
  it('should return true if the value date is after the argument date', async () => {
    const condition: IResolverOperationCondition = {
      $condition: {
        name: __DATE_IS_EQUAL_OR_AFTER__,
        value: { $static: tomorrow },
        arguments: [
          { $static: yesterday }
        ]
      }
    };
    expect(await JWResolver.run(condition)).toBe(true);
  });

  it('should return true if the value date is the same as the argument date', async () => {
    const condition: IResolverOperationCondition = {
      $condition: {
        name: __DATE_IS_EQUAL_OR_AFTER__,
        value: { $static: tomorrow },
        arguments: [
          { $static: tomorrow }
        ]
      }
    };
    expect(await JWResolver.run(condition)).toBe(true);
  });

  it('should return false if the value date is before the argument date', async () => {
    const condition: IResolverOperationCondition = {
      $condition: {
        name: __DATE_IS_EQUAL_OR_AFTER__,
        value: { $static: yesterday },
        arguments: [
          { $static: tomorrow }
        ]
      }
    };
    expect(await JWResolver.run(condition)).toBe(false);
  });
});

describe('is equal', () => {
  it('should return true if the value date is the same as the argument date', async () => {
    const condition: IResolverOperationCondition = {
      $condition: {
        name: __DATE_IS_EQUAL__,
        value: { $static: tomorrow },
        arguments: [
          { $static: tomorrow }
        ]
      }
    };
    expect(await JWResolver.run(condition)).toBe(true);
  });
  it('should return false if the value date is different from the argument date', async () => {
    const condition: IResolverOperationCondition = {
      $condition: {
        name: __DATE_IS_EQUAL__,
        value: { $static: tomorrow },
        arguments: [
          { $static: yesterday }
        ]
      }
    };
    expect(await JWResolver.run(condition)).toBe(false);
  });
});

describe('is today', () => {
  it('should return true if the value date is today', async () => {
    const condition: IResolverOperationCondition = {
      $condition: {
        name: __DATE_IS_TODAY__,
        value: { $static: new Date() }
      }
    };
    expect(await JWResolver.run(condition)).toBe(true);
  });
  it('should return false if the value date is not today', async () => {
    const condition: IResolverOperationCondition = {
      $condition: {
        name: __DATE_IS_TODAY__,
        value: { $static: tomorrow }
      }
    };
    expect(await JWResolver.run(condition)).toBe(false);
  });
});

describe('is past', () => {
  it('should return true if the value date is in the past', async () => {
    const condition: IResolverOperationCondition = {
      $condition: {
        name: __DATE_IS_PAST__,
        value: { $static: yesterday }
      }
    };
    expect(await JWResolver.run(condition)).toBe(true);
  });

  it('should return false if the value date is not in the past', async () => {
    const condition: IResolverOperationCondition = {
      $condition: {
        name: __DATE_IS_PAST__,
        value: { $static: tomorrow }
      }
    };
    expect(await JWResolver.run(condition)).toBe(false);
  });
});

describe('is future', () => {
  it('should return true if the value date is in the future', async () => {
    const condition: IResolverOperationCondition = {
      $condition: {
        name: __DATE_IS_FUTURE__,
        value: { $static: tomorrow }
      }
    };
    expect(await JWResolver.run(condition)).toBe(true);
  });

  it('should return false if the value date is not in the future', async () => {
    const condition: IResolverOperationCondition = {
      $condition: {
        name: __DATE_IS_FUTURE__,
        value: { $static: yesterday }
      }
    };
    expect(await JWResolver.run(condition)).toBe(false);
  });
});

describe('is between', () => {
  it('should return true if the value date is between the argument dates', async () => {
    const condition: IResolverOperationCondition = {
      $condition: {
        name: __DATE_IS_BETWEEN__,
        value: { $static: today },
        arguments: [
          { $static: yesterday },
          { $static: tomorrow }
        ]
      }
    };
    expect(await JWResolver.run(condition)).toBe(true);
  });

  it('should return false if the value date is not between the argument dates', async () => {
    const condition: IResolverOperationCondition = {
      $condition: {
        name: __DATE_IS_BETWEEN__,
        value: { $static: tomorrow },
        arguments: [
          { $static: yesterday },
          { $static: today }
        ]
      }
    };
    expect(await JWResolver.run(condition)).toBe(false);
  });
});

describe('is day of week', () => {
  it('should return true if the value date is the specified day of week', async () => {
    const condition: IResolverOperationCondition = {
      $condition: {
        name: __DATE_IS_DAY_OF_WEEK__,
        value: { $static: today },
        arguments: [
          { $static: today.getDay() }
        ]
      }
    };
    expect(await JWResolver.run(condition)).toBe(true);
  });

  it('should return false if the value date is not the specified day of week', async () => {
    const condition: IResolverOperationCondition = {
      $condition: {
        name: __DATE_IS_DAY_OF_WEEK__,
        value: { $static: today },
        arguments: [
          { $static: (today.getDay() + 1) % 7 }
        ]
      }
    };
    expect(await JWResolver.run(condition)).toBe(false);
  });

  it('should throw an error if the day of week argument is invalid', async () => {
    const condition: IResolverOperationCondition = {
      $condition: {
        name: __DATE_IS_DAY_OF_WEEK__,
        value: { $static: today },
        arguments: [
          { $static: 7 }
        ]
      }
    };
    await expect(JWResolver.run(condition)).rejects.toBeInstanceOf(JWOperationError);
  });
});

describe('is weekday', () => {
  it('should return true if the value date is a weekday', async () => {
    const condition: IResolverOperationCondition = {
      $condition: {
        name: __DATE_IS_WEEKDAY__,
        value: { $static: weekday_day }
      }
    };
    expect(await JWResolver.run(condition)).toBe(true);
  });

  it('should return false if the value date is not a weekday', async () => {
    const condition: IResolverOperationCondition = {
      $condition: {
        name: __DATE_IS_WEEKDAY__,
        value: { $static: weekend_day }
      }
    };
    expect(await JWResolver.run(condition)).toBe(false);
  });
});

describe('is weekend', () => {
  it('should return true if the value date is a weekend day', async () => {
    const condition: IResolverOperationCondition = {
      $condition: {
        name: __DATE_IS_WEEKEND__,
        value: { $static: weekend_day }
      }
    };
    expect(await JWResolver.run(condition)).toBe(true);
  });

  it('should return false if the value date is not a weekend day', async () => {
    const condition: IResolverOperationCondition = {
      $condition: {
        name: __DATE_IS_WEEKEND__,
        value: { $static: weekday_day }
      }
    };
    expect(await JWResolver.run(condition)).toBe(false);
  });
});



