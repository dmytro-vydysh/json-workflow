import { describe, it, expect, beforeAll } from '@jest/globals';
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

describe('add', () => {
  it('should add a X unit of time to the date', async () => {
    const transformer: TOperationType = {
      type: __TRANSFORMER__,
      transformer: __DATE_ADD__,
      valueGetter: {
        type: __RESOLVER__,
        resolver: 'get_first_of_june'
      },
      arguments: [
        { type: __STATIC__, value: 1 },
        { type: __STATIC__, value: __DAYS__ }
      ]
    }
    expect(await JWResolver.run(transformer)).toEqual(new Date(2026, 5, 2, 0, 0, 0, 0));
  });
});

describe('subtract', () => {
  it('should subtract a X unit of time from the date', async () => {
    const transformer: TOperationType = {
      type: __TRANSFORMER__,
      transformer: __DATE_SUBTRACT__,
      valueGetter: {
        type: __RESOLVER__,
        resolver: 'get_second_of_june'
      },
      arguments: [
        { type: __STATIC__, value: 1 },
        { type: __STATIC__, value: __DAYS__ }
      ]
    }
    expect(await JWResolver.run(transformer)).toEqual(new Date(2026, 5, 1, 0, 0, 0, 0));
  });
});

describe('tolocalestring', () => {
  it('should convert a date to a locale string', async () => {
    const transformer: TOperationType = {
      type: __TRANSFORMER__,
      transformer: __DATE_TOLOCALESTRING__,
      valueGetter: {
        type: __RESOLVER__,
        resolver: 'get_first_of_june'
      },
      arguments: [
        {
          type: __STATIC__,
          value: 'it-IT'
        }
      ]
    }
    expect(await JWResolver.run(transformer)).toBe('01/06/2026, 00:00:00');
  });
});

describe('toisostring', () => {
  it('should convert a date to an ISO string', async () => {
    const transformer: TOperationType = {
      type: __TRANSFORMER__,
      transformer: __DATE_TOISOSTRING__,
      valueGetter: {
        type: __RESOLVER__,
        resolver: 'get_first_of_june'
      }
    }
    expect(await JWResolver.run(transformer)).toBe('2026-05-31T22:00:00.000Z');
  });
});


describe('gettime', () => {
  it('should return the date in milliseconds', async () => {
    const transformer: TOperationType = {
      type: __TRANSFORMER__,
      transformer: __DATE_GET_TIME__,
      valueGetter: {
        type: __RESOLVER__,
        resolver: 'get_first_of_june'
      }
    }
    expect(await JWResolver.run(transformer)).toBe(new Date(2026, 5, 1, 0, 0, 0, 0).getTime());
  });
});




// describe('diff_from_now', () => {
//   it('should calculate the difference from now', async () => {
//     const transformer: TOperationType = {
//       type: __TRANSFORMER__,
//       transformer: __DATE_DIFF_FROM_NOW__,
//       valueGetter: {
//         type: __RESOLVER__,
//         resolver: 'get_second_of_june'
//       },
//       arguments: [
//         { type: __STATIC__, value: __HOURS__ }
//       ]
//     }
//     expect(await JWResolver.run(transformer)).toBe(Math.round((new Date(2026, 5, 2, 0, 0, 0, 0).getTime() - Date.now()) / (1000 * 60 * 60)));
//   });
// });

describe('format', () => {
  it('should format a date', async () => {
    const transformer: TOperationType = {
      type: __TRANSFORMER__,
      transformer: __DATE_FORMAT__,
      valueGetter: {
        type: __RESOLVER__,
        resolver: 'get_first_of_june'
      },
      arguments: [
        {
          type: __STATIC__,
          value: 'YYYY-MM-DD HH:mm:ss'
        }
      ]
    }
    expect(await JWResolver.run(transformer)).toBe('2026-06-01 00:00:00');
  });
});

describe('date_only', () => {
  it('should return a date with 00:00:00 time', async () => {
    const transformer: TOperationType = {
      type: __TRANSFORMER__,
      transformer: __DATE_DATE_ONLY__,
      valueGetter: {
        type: __OPERATION__,
        operation: {
          type: __TRANSFORMER__,
          transformer: __DATE_ADD__,
          valueGetter: {
            type: __RESOLVER__,
            resolver: 'get_last_of_may'
          },
          arguments: [
            { type: __STATIC__, value: 1 },
            { type: __STATIC__, value: __DAYS__ }
          ]
        }
      }
    }
    expect(await JWResolver.run(transformer)).toEqual(new Date(2026, 5, 1));
  });
});