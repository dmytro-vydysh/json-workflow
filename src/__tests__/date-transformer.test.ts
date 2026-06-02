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
  __NUMBER_ADD__,
} from '..';


beforeAll(() => {
  JWResolver.registerResolver('get_first_of_june', () => {
    return new Date(2026, 5, 1, 0, 0, 0, 0);
  });


  JWResolver.registerResolver('get_second_of_june', () => {
    return new Date(2026, 5, 2, 0, 0, 0, 0);
  });


  JWResolver.registerResolver('get_last_of_may', () => {
    return new Date(2026, 4, 31, 0, 0, 0, 0);
  });
})

beforeEach(() => {
  jest.useFakeTimers();
  jest.setSystemTime(new Date('2026-06-02T18:00:00.000Z'));
});

afterEach(() => {
  jest.useRealTimers();
});

function add(date: Date, ammountValue: number, unit: 'seconds' | 'minutes' | 'hours' | 'days' | 'months' | 'years'): Date {


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

function substract(date: Date, ammountValue: number, unit: 'seconds' | 'minutes' | 'hours' | 'days' | 'months' | 'years'): Date {


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

describe('add', () => {
  it('should add 1 second of time to the date', async () => {
    const transformer: TOperationType = {
      $transformer: {
        name: __DATE_ADD__,
        value: { $resolver: 'get_first_of_june' },
        arguments: [
          { $static: 1 },
          { $static: __SECONDS__ }
        ]
      }
    }
    expect(await JWResolver.run(transformer)).toEqual(add(new Date(2026, 5, 1, 0, 0, 0, 0), 1, 'seconds'));
  });

  it('should add 1 minute of time to the date', async () => {
    const transformer: TOperationType = {
      $transformer: {
        name: __DATE_ADD__,
        value: { $resolver: 'get_first_of_june' },
        arguments: [
          { $operation: { $transformer: { name: __NUMBER_ADD__, value: { $static: 0 }, arguments: [{ $static: 1 }] } } },
          { $static: __MINUTES__ }
        ]
      }
    }
    expect(await JWResolver.run(transformer)).toEqual(add(new Date(2026, 5, 1, 0, 0, 0, 0), 1, 'minutes'));
  });

  it('should add 1 hour of time to the date', async () => {
    const transformer: TOperationType = {
      $transformer: {
        name: __DATE_ADD__,
        value: { $resolver: 'get_first_of_june' },
        arguments: [
          { $static: 1 },
          { $static: __HOURS__ }
        ]
      }
    }
    expect(await JWResolver.run(transformer)).toEqual(add(new Date(2026, 5, 1, 0, 0, 0, 0), 1, 'hours'));
  });

  it('should add 1 day of time to the date', async () => {
    const transformer: TOperationType = {
      $transformer: {
        name: __DATE_ADD__,
        value: { $resolver: 'get_first_of_june' },
        arguments: [
          { $static: 1 },
          { $static: __DAYS__ }
        ]
      }
    }
    expect(await JWResolver.run(transformer)).toEqual(add(new Date(2026, 5, 1, 0, 0, 0, 0), 1, 'days'));
  });

  it('should add 1 month of time to the date', async () => {
    const transformer: TOperationType = {
      $transformer: {
        name: __DATE_ADD__,
        value: { $resolver: 'get_first_of_june' },
        arguments: [
          { $static: 1 },
          { $static: __MONTHS__ }
        ]
      }
    }
    expect(await JWResolver.run(transformer)).toEqual(add(new Date(2026, 5, 1, 0, 0, 0, 0), 1, 'months'));
  });

  it('should add 1 year of time to the date', async () => {
    const transformer: TOperationType = {
      $transformer: {
        name: __DATE_ADD__,
        value: { $resolver: 'get_first_of_june' },
        arguments: [
          { $static: 1 },
          { $static: __YEARS__ }
        ]
      }
    }
    expect(await JWResolver.run(transformer)).toEqual(add(new Date(2026, 5, 1, 0, 0, 0, 0), 1, 'years'));
  });
});

describe('subtract', () => {
  it('should subtract a 1 second of time from the date', async () => {
    const transformer: TOperationType = {
      $transformer: {
        name: __DATE_SUBTRACT__,
        value: { $resolver: 'get_first_of_june' },
        arguments: [
          { $operation: { $transformer: { name: __NUMBER_ADD__, value: { $static: 0 }, arguments: [{ $static: 1 }] } } },
          { $static: __SECONDS__ }
        ]
      }
    }
    expect(await JWResolver.run(transformer)).toEqual(substract(new Date(2026, 5, 1, 0, 0, 0, 0), 1, 'seconds'));
  });

  it('should subtract a 1 minute of time from the date', async () => {
    const transformer: TOperationType = {
      $transformer: {
        name: __DATE_SUBTRACT__,
        value: { $resolver: 'get_first_of_june' },
        arguments: [
          { $static: 1 },
          { $static: __MINUTES__ }
        ]
      }
    }
    expect(await JWResolver.run(transformer)).toEqual(substract(new Date(2026, 5, 1, 0, 0, 0, 0), 1, 'minutes'));
  });

  it('should subtract a 1 hour of time from the date', async () => {
    const transformer: TOperationType = {
      $transformer: {
        name: __DATE_SUBTRACT__,
        value: { $resolver: 'get_first_of_june' },
        arguments: [
          { $static: 1 },
          { $static: __HOURS__ }
        ]
      }
    }
    expect(await JWResolver.run(transformer)).toEqual(substract(new Date(2026, 5, 1, 0, 0, 0, 0), 1, 'hours'));
  });

  it('should subtract a 1 day of time from the date', async () => {
    const transformer: TOperationType = {
      $transformer: {
        name: __DATE_SUBTRACT__,
        value: { $resolver: 'get_first_of_june' },
        arguments: [
          { $static: 1 },
          { $static: __DAYS__ }
        ]
      }
    }
    expect(await JWResolver.run(transformer)).toEqual(substract(new Date(2026, 5, 1, 0, 0, 0, 0), 1, 'days'));
  });

  it('should subtract a 1 month of time from the date', async () => {
    const transformer: TOperationType = {
      $transformer: {
        name: __DATE_SUBTRACT__,
        value: { $resolver: 'get_first_of_june' },
        arguments: [
          { $static: 1 },
          { $static: __MONTHS__ }
        ]
      }
    }
    expect(await JWResolver.run(transformer)).toEqual(substract(new Date(2026, 5, 1, 0, 0, 0, 0), 1, 'months'));
  });

  it('should subtract a 1 year of time from the date', async () => {
    const transformer: TOperationType = {
      $transformer: {
        name: __DATE_SUBTRACT__,
        value: { $resolver: 'get_first_of_june' },
        arguments: [
          { $static: 1 },
          { $static: __YEARS__ }
        ]
      }
    }
    expect(await JWResolver.run(transformer)).toEqual(substract(new Date(2026, 5, 1, 0, 0, 0, 0), 1, 'years'));
  });

});

describe('tolocalestring', () => {
  it('should convert a date to a locale string', async () => {
    const transformer: TOperationType = {
      $transformer: {
        name: __DATE_TOLOCALESTRING__,
        value: { $resolver: 'get_first_of_june' },
        arguments: [
          { $static: 'it-IT' }
        ]
      }
    }
    expect(await JWResolver.run(transformer)).toBe(new Date(2026, 5, 1, 0, 0, 0, 0).toLocaleString('it-IT'));
  });
});

describe('toisostring', () => {
  it('should convert a date to an ISO string', async () => {
    const transformer: TOperationType = {
      $transformer: {
        name: __DATE_TOISOSTRING__,
        value: { $resolver: 'get_first_of_june' }
      }
    }
    expect(await JWResolver.run(transformer)).toBe(new Date(2026, 5, 1, 0, 0, 0, 0).toISOString());
  });
});


describe('gettime', () => {
  it('should return the date in milliseconds', async () => {
    const transformer: TOperationType = {
      $transformer: {
        name: __DATE_GET_TIME__,
        value: { $resolver: 'get_first_of_june' }
      }
    }
    expect(await JWResolver.run(transformer)).toBe(new Date(2026, 5, 1, 0, 0, 0, 0).getTime());
  });
});

function diff_from_now(date: Date, unit: 'seconds' | 'minutes' | 'hours' | 'days' | 'months' | 'years'): number {

  const now = Date.now();
  let diff: number;
  switch (unit) {
    case 'seconds':
      diff = (now - (date).getTime()) / 1000;
      break;
    case 'minutes':
      diff = (now - (date).getTime()) / (1000 * 60);
      break;
    case 'hours':
      diff = (now - (date).getTime()) / (1000 * 60 * 60);
      break;
    case 'days':
      diff = (now - (date).getTime()) / (1000 * 60 * 60 * 24);
      break;
    case 'months':
      diff = (now - (date).getTime()) / (1000 * 60 * 60 * 24 * 30);
      break;
    case 'years':
      diff = (now - (date).getTime()) / (1000 * 60 * 60 * 24 * 365);
      break;
  }
  return Math.abs(Math.trunc(diff));
}

describe('diff_from_now', () => {
  it('should calculate the difference from now in seconds', async () => {
    const transformer: TOperationType = {
      $transformer: {
        name: __DATE_DIFF_FROM_NOW__,
        value: { $resolver: 'get_first_of_june' },
        arguments: [{ $static: __SECONDS__ }]
      }
    }
    expect(await JWResolver.run(transformer)).toBe(diff_from_now(new Date(2026, 5, 1, 0, 0, 0, 0), 'seconds'));
  });

  it('should calculate the difference from now in minutes', async () => {
    const transformer: TOperationType = {
      $transformer: {
        name: __DATE_DIFF_FROM_NOW__,
        value: { $resolver: 'get_first_of_june' },
        arguments: [{ $static: __MINUTES__ }]
      }
    }
    expect(await JWResolver.run(transformer)).toBe(diff_from_now(new Date(2026, 5, 1, 0, 0, 0, 0), 'minutes'));
  });

  it('should calculate the difference from now in hours', async () => {
    const transformer: TOperationType = {
      $transformer: {
        name: __DATE_DIFF_FROM_NOW__,
        value: { $resolver: 'get_first_of_june' },
        arguments: [{ $static: __HOURS__ }]
      }
    }
    expect(await JWResolver.run(transformer)).toBe(diff_from_now(new Date(2026, 5, 1, 0, 0, 0, 0), 'hours'));
  });

  it('should calculate the difference from now in days', async () => {
    const transformer: TOperationType = {
      $transformer: {
        name: __DATE_DIFF_FROM_NOW__,
        value: { $resolver: 'get_first_of_june' },
        arguments: [{ $static: __DAYS__ }]
      }
    }
    expect(await JWResolver.run(transformer)).toBe(diff_from_now(new Date(2026, 5, 1, 0, 0, 0, 0), 'days'));
  });

  it('should calculate the difference from now in months', async () => {
    const transformer: TOperationType = {
      $transformer: {
        name: __DATE_DIFF_FROM_NOW__,
        value: { $resolver: 'get_first_of_june' },
        arguments: [{ $static: __MONTHS__ }]
      }
    }
    expect(await JWResolver.run(transformer)).toBe(diff_from_now(new Date(2026, 5, 1, 0, 0, 0, 0), 'months'));
  });

  it('should calculate the difference from now in years', async () => {
    const transformer: TOperationType = {
      $transformer: {
        name: __DATE_DIFF_FROM_NOW__,
        value: { $resolver: 'get_first_of_june' },
        arguments: [{ $static: __YEARS__ }]
      }
    }
    expect(await JWResolver.run(transformer)).toBe(diff_from_now(new Date(2026, 5, 1, 0, 0, 0, 0), 'years'));
  });
});




describe('format', () => {
  it('should format a date', async () => {
    const transformer: TOperationType = {
      $transformer: {
        name: __DATE_FORMAT__,
        value: { $resolver: 'get_first_of_june' },
        arguments: [{ $static: 'YYYY-MM-DD HH:mm:ss' }]
      }
    }
    expect(await JWResolver.run(transformer)).toBe('2026-06-01 00:00:00');
  });
});

describe('date_only', () => {
  it('should return a date with 00:00:00 time', async () => {
    const transformer: TOperationType = {
      $transformer: {
        name: __DATE_DATE_ONLY__,
        value: {
          $operation: {
            $transformer: {
              name: __DATE_ADD__,
              value: { $resolver: 'get_last_of_may' },
              arguments: [
                { $static: 1 },
                { $static: __DAYS__ }
              ]
            }
          }
        }
      }
    }
    expect(await JWResolver.run(transformer)).toEqual(new Date(2026, 5, 1));
  });
});