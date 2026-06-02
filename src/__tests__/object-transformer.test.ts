import { describe, it, expect, beforeAll } from '@jest/globals';
import {
  JWResolver,
  TOperationType,
  __TRANSFORMER__,
  __STATIC__,
  __OPERATION__,
  __RESOLVER__,
  __OBJECT_GET_KEYS__,
  __OBJECT_GET_VALUES__,
  __OBJECT_GET_KEY__,
  __OBJECT_SET_KEY__,
  __OBJECT_JOIN__
} from '..';

describe('get_keys', () => {
  it('should return the keys of an object', async () => {
    const transformer: TOperationType = {
      $transformer: {
        name: __OBJECT_GET_KEYS__,
        value: { $static: { a: 1, b: 2, c: 3 } }
      }
    }
    expect(await JWResolver.run(transformer)).toEqual(['a', 'b', 'c']);
  });
});

describe('get_values', () => {
  it('should return the values of an object', async () => {
    const transformer: TOperationType = {
      $transformer: {
        name: __OBJECT_GET_VALUES__,
        value: { $static: { a: 1, b: 2, c: 3 } }
      }
    }
    expect(await JWResolver.run(transformer)).toEqual([1, 2, 3]);
  });
});

describe('get_key', () => {
  it('should return the value of a key in an object', async () => {
    const transformer: TOperationType = {
      $transformer: {
        name: __OBJECT_GET_KEY__,
        value: { $static: { a: 1, b: 2, c: 3 } },
        arguments: [
          { $static: 'b' }
        ]
      }
    }
    expect(await JWResolver.run(transformer)).toEqual(2);
  });
});

describe('set_key', () => {
  it('should set the value of a key in an object', async () => {
    const transformer: TOperationType = {
      $transformer: {
        name: __OBJECT_SET_KEY__,
        value: { $static: { a: 1, b: 2, c: 3 } },
        arguments: [
          { $static: 'b' },
          { $static: 42 }
        ]
      }
    }
    expect(await JWResolver.run(transformer)).toEqual({ a: 1, b: 42, c: 3 });
  });
});

describe('join', () => {
  it('should join two objects in one', async () => {
    const transformer: TOperationType = {
      $transformer: {
        name: __OBJECT_JOIN__,
        value: { $static: { a: 1, b: 2 } },
        arguments: [
          { $static: { c: 3, d: 4 } }
        ]
      }
    }
    expect(await JWResolver.run(transformer)).toEqual({ a: 1, b: 2, c: 3, d: 4 });
  });
});
