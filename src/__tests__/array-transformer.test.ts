import { describe, it, expect, beforeAll } from '@jest/globals';
import {
  JWResolver,
  TOperationType,
  __TRANSFORMER__,
  __STATIC__,
  __OPERATION__,
  __RESOLVER__,
  __ARRAY_APPEND__,
  __ARRAY_JOIN_ARRAYS__,
  __ARRAY_PREPEND__,
  __ARRAY_INSERT__,
  __ARRAY_REDUCE__,
  __ARRAY_MAP__,
  __ARRAY_FILTER__,
  __ARRAY_AT__,
  __ARRAY_GET_LENGTH__,
  __ARRAY_FLAT__,
  __CALLBACK__,
  __NUMBER_ADD__,
  __NUMBER_TO_STRING__,
  __CONDITION__,
  __NUMBER_IS_EVEN__
} from '..';


describe('append', () => {
  it('should append an element to the end of the array', async () => {
    const transformer: TOperationType = {
      type: __TRANSFORMER__,
      transformer: __ARRAY_APPEND__,
      valueGetter: {
        type: __STATIC__,
        value: [1, 2, 3]
      },
      arguments: [
        {
          type: __STATIC__,
          value: 4
        }
      ]
    }
    expect(await JWResolver.run(transformer)).toEqual([1, 2, 3, 4]);
  });
});

describe('prepend', () => {
  it('should prepend an element to the beginning of the array', async () => {
    const transformer: TOperationType = {
      type: __TRANSFORMER__,
      transformer: __ARRAY_PREPEND__,
      valueGetter: {
        type: __STATIC__,
        value: [1, 2, 3]
      },
      arguments: [
        {
          type: __STATIC__,
          value: 0
        }
      ]
    }
    expect(await JWResolver.run(transformer)).toEqual([0, 1, 2, 3]);
  });
});

describe('join_arrays', () => {
  it('should join two arrays into one array', async () => {
    const transformer: TOperationType = {
      type: __TRANSFORMER__,
      transformer: __ARRAY_JOIN_ARRAYS__,
      valueGetter: {
        type: __STATIC__,
        value: [1, 2, 3]
      },
      arguments: [
        {
          type: __STATIC__,
          value: [4, 5, 6]
        }
      ]
    }
    expect(await JWResolver.run(transformer)).toEqual([1, 2, 3, 4, 5, 6]);
  });
});

describe('flat', () => {
  it('should flatten an array of arrays into a single array', async () => {
    const transformer: TOperationType = {
      type: __TRANSFORMER__,
      transformer: __ARRAY_FLAT__,
      valueGetter: {
        type: __STATIC__,
        value: [[1, 2], [3, 4], [5, 6]]
      }
    }
    expect(await JWResolver.run(transformer)).toEqual([1, 2, 3, 4, 5, 6]);
  });
});

describe('insert', () => {
  it('should insert an element at a specific index in the array', async () => {
    const transformer: TOperationType = {
      type: __TRANSFORMER__,
      transformer: __ARRAY_INSERT__,
      valueGetter: {
        type: __STATIC__,
        value: [1, 2, 4]
      },
      arguments: [
        {
          type: __STATIC__,
          value: 2
        },
        {
          type: __STATIC__,
          value: 3
        }
      ]
    }
    expect(await JWResolver.run(transformer)).toEqual([1, 2, 3, 4]);
  });
});

describe('reduce', () => {
  it('should reduce an array to a single value using a reducer function', async () => {
    const transformer: TOperationType = {
      type: __TRANSFORMER__,
      transformer: __ARRAY_REDUCE__,
      valueGetter: {
        type: __STATIC__,
        value: [1, 2, 3, 4]
      },
      arguments: [
        {
          type: __CALLBACK__,
          callback: {
            type: __TRANSFORMER__,
            transformer: __NUMBER_ADD__,
          }
        },
        {
          type: __STATIC__,
          value: 0
        }
      ]
    }
    expect(await JWResolver.run(transformer)).toBe(10);
  });
});

describe('map', () => {
  it('should map an array to a new array using a mapper function', async () => {

    const transformer: TOperationType = {
      type: __TRANSFORMER__,
      transformer: __ARRAY_MAP__,
      valueGetter: {
        type: __STATIC__,
        value: [1, 2, 3, 4]
      },
      arguments: [
        {
          type: __CALLBACK__,
          callback: {
            type: __TRANSFORMER__,
            transformer: __NUMBER_TO_STRING__,
          }
        }
      ]
    }
    expect(await JWResolver.run(transformer)).toEqual(['1', '2', '3', '4']);
  });
});

describe('filter', () => {
  it('should filter an array to a new array using a filter function', async () => {
    const transformer: TOperationType = {
      type: __TRANSFORMER__,
      transformer: __ARRAY_FILTER__,
      valueGetter: {
        type: __STATIC__,
        value: [1, 2, 3, 4]
      },
      arguments: [
        {
          type: __CALLBACK__,
          callback: {
            type: __CONDITION__,
            condition: __NUMBER_IS_EVEN__
          }
        }
      ]
    }
    expect(await JWResolver.run(transformer)).toEqual([2, 4]);
  });
});

describe('at', () => {
  it('should return the element at a specific index in the array', async () => {
    const transformer: TOperationType = {
      type: __TRANSFORMER__,
      transformer: __ARRAY_AT__,
      valueGetter: {
        type: __STATIC__,
        value: [1, 2, 3, 4]
      },
      arguments: [
        {
          type: __STATIC__,
          value: 2
        }
      ]
    }
    expect(await JWResolver.run(transformer)).toBe(3);
  });
});

describe('get_length', () => {
  it('should return the length of the array', async () => {
    const transformer: TOperationType = {
      type: __TRANSFORMER__,
      transformer: __ARRAY_GET_LENGTH__,
      valueGetter: {
        type: __STATIC__,
        value: [1, 2, 3, 4]
      }
    }
    expect(await JWResolver.run(transformer)).toBe(4);
  });
});
