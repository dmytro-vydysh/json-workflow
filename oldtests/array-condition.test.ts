import { describe, it, expect } from '@jest/globals';
import {
  JWResolver,
  TOperationType,
  __TRANSFORMER__,
  __STATIC__,
  __OPERATION__,
  __RESOLVER__,
  __CONDITION__,
  __ARRAY_INCLUDES__,
  __ARRAY_NOT_INCLUDES__,
  __ARRAY_EVERY__,
  __ARRAY_SOME__,
  __ARRAY_IS_EMPTY__,
  __ARRAY_IS_NOT_EMPTY__,
  __CALLBACK__,
  __NUMBER_IS_EVEN__
} from '..';


describe('array.includes', () => {
  it('should return true if the array includes the value', async () => {
    const condition: TOperationType = {
      $condition: {
        name: __ARRAY_INCLUDES__,
        value: { $static: [1, 2, 3] },
        arguments: [{ $static: 2 }]
      }
    }
    expect(await JWResolver.run(condition)).toBe(true);
  });

  it('should return false if the array does not include the value', async () => {
    const condition: TOperationType = {
      $condition: {
        name: __ARRAY_INCLUDES__,
        value: { $static: [1, 2, 3] },
        arguments: [{ $static: 4 }]
      }
    }
    expect(await JWResolver.run(condition)).toBe(false);
  });
});

describe('array.not_includes', () => {
  it('should return true if the array does not include the value', async () => {
    const condition: TOperationType = {
      $condition: {
        name: __ARRAY_NOT_INCLUDES__,
        value: { $static: [1, 2, 3] },
        arguments: [{ $static: 4 }]
      }
    }
    expect(await JWResolver.run(condition)).toBe(true);
  });

  it('should return false if the array includes the value', async () => {
    const condition: TOperationType = {
      $condition: {
        name: __ARRAY_NOT_INCLUDES__,
        value: { $static: [1, 2, 3] },
        arguments: [{ $static: 2 }]
      }
    }

    expect(await JWResolver.run(condition)).toBe(false);
  });
});

describe('array.every', () => {
  it('should return true if every element in the array satisfies the condition', async () => {
    const condition: TOperationType = {
      $condition: {
        name: __ARRAY_EVERY__,
        value: { $static: [2, 4, 6] },
        arguments: [
          {
            $callback: {
              $condition: {
                name: __NUMBER_IS_EVEN__,
              }
            }
          }
        ]
      }
    }
    expect(await JWResolver.run(condition)).toBe(true);
  });

  it('should return false if at least one element in the array does not satisfy the condition', async () => {
    const condition: TOperationType = {
      $condition: {
        name: __ARRAY_EVERY__,
        value: { $static: [2, 3, 6] },
        arguments: [
          {
            $callback: {
              $condition: {
                name: __NUMBER_IS_EVEN__,
              }
            }
          }
        ]
      }
    }
    expect(await JWResolver.run(condition)).toBe(false);
  });
});

describe('array.some', () => {
  it('should return true if at least one element in the array satisfies the condition', async () => {
    const condition: TOperationType = {
      $condition: {
        name: __ARRAY_SOME__,
        value: { $static: [1, 2, 3] },
        arguments: [
          {
            $callback: {
              $condition: {
                name: __NUMBER_IS_EVEN__,
              }
            }
          }
        ]
      }
    }
    expect(await JWResolver.run(condition)).toBe(true);
  });

  it('should return false if no element in the array satisfies the condition', async () => {
    const condition: TOperationType = {
      $condition: {
        name: __ARRAY_SOME__,
        value: { $static: [1, 3, 5] },
        arguments: [
          {
            $callback: {
              $condition: {
                name: __NUMBER_IS_EVEN__,
              }
            }
          }
        ]
      }
    }
    expect(await JWResolver.run(condition)).toBe(false);
  });
});

describe('array.is_empty', () => {
  it('should return true if the array is empty', async () => {
    const condition: TOperationType = {
      $condition: {
        name: __ARRAY_IS_EMPTY__,
        value: { $static: [] }
      }
    }
    expect(await JWResolver.run(condition)).toBe(true);
  });

  it('should return false if the array is not empty', async () => {
    const condition: TOperationType = {
      $condition: {
        name: __ARRAY_IS_EMPTY__,
        value: { $static: [1, 2, 3] }
      }
    }
    expect(await JWResolver.run(condition)).toBe(false);
  });
});

describe('array.is_not_empty', () => {
  it('should return true if the array is not empty', async () => {
    const condition: TOperationType = {
      $condition: {
        name: __ARRAY_IS_NOT_EMPTY__,
        value: { $static: [1, 2, 3] }
      }
    }
    expect(await JWResolver.run(condition)).toBe(true);
  });

  it('should return false if the array is empty', async () => {
    const condition: TOperationType = {
      $condition: {
        name: __ARRAY_IS_NOT_EMPTY__,
        value: { $static: [] }
      }
    }
    expect(await JWResolver.run(condition)).toBe(false);
  });
});