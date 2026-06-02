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
  __NUMBER_IS_EVEN__,
  __ARRAY_FIND_INDEX__,
  __ARRAY_FIND__,
  __NUMBER_EQ__
} from '..';
import { JWOperationError } from '../Error';


describe('append', () => {
  it('should append an element to the end of the array', async () => {
    const transformer: TOperationType = {
      $transformer: {
        name: __ARRAY_APPEND__,
        value: { $static: [1, 2, 3] },
        arguments: [{ $static: 4 }]
      }
    }
    expect(await JWResolver.run(transformer)).toEqual([1, 2, 3, 4]);
  });
});

describe('prepend', () => {
  it('should prepend an element to the beginning of the array', async () => {
    const transformer: TOperationType = {
      $transformer: {
        name: __ARRAY_PREPEND__,
        value: { $static: [1, 2, 3] },
        arguments: [{ $static: 0 }]
      }
    }
    expect(await JWResolver.run(transformer)).toEqual([0, 1, 2, 3]);
  });
});

describe('join_arrays', () => {
  it('should join two arrays into one array', async () => {
    const transformer: TOperationType = {
      $transformer: {
        name: __ARRAY_JOIN_ARRAYS__,
        value: { $static: [1, 2, 3] },
        arguments: [{ $static: [4, 5, 6] }]
      }
    }
    expect(await JWResolver.run(transformer)).toEqual([1, 2, 3, 4, 5, 6]);
  });
});

describe('flat', () => {
  it('should flatten an array of arrays into a single array', async () => {
    const transformer: TOperationType = {
      $transformer: {
        name: __ARRAY_FLAT__,
        value: { $static: [[1, 2], [3, 4], [5, 6]] }
      }
    }
    expect(await JWResolver.run(transformer)).toEqual([1, 2, 3, 4, 5, 6]);
  });
});

describe('insert', () => {
  it('should insert an element at a specific index in the array', async () => {
    const transformer: TOperationType = {
      $transformer: {
        name: __ARRAY_INSERT__,
        value: { $static: [1, 2, 4] },
        arguments: [{ $static: 2 }, { $static: 3 }]
      }
    }
    expect(await JWResolver.run(transformer)).toEqual([1, 2, 3, 4]);
  });
});

describe('reduce', () => {
  it('should reduce an array to a single value using a reducer function', async () => {
    const transformer: TOperationType = {
      $transformer: {
        name: __ARRAY_REDUCE__,
        value: { $static: [1, 2, 3, 4] },
        arguments: [
          {
            $callback: {
              $transformer: {
                name: __NUMBER_ADD__
              }
            }
          },
          { $static: 0 }
        ]
      }
    }
    expect(await JWResolver.run(transformer)).toBe(10);
  });


  it('should throw an error without an initial value (accumulator)', async () => {
    const transformer: TOperationType = {
      $transformer: {
        name: __ARRAY_REDUCE__,
        value: { $static: [1, 2, 3, 4] },
        arguments: [
          {
            $callback: {
              $transformer: {
                name: __NUMBER_ADD__
              }
            }
          },
        ]
      }
    }
    await expect(JWResolver.run(transformer)).rejects.toBeInstanceOf(JWOperationError);
  });
});

describe('map', () => {
  it('should map an array to a new array using a mapper function', async () => {

    const transformer: TOperationType = {
      $transformer: {
        name: __ARRAY_MAP__,
        value: { $static: [1, 2, 3, 4] },
        arguments: [
          {
            $callback: {
              $transformer: {
                name: __NUMBER_TO_STRING__
              }
            }
          }
        ]
      }
    }
    expect(await JWResolver.run(transformer)).toEqual(['1', '2', '3', '4']);
  });
});

describe('filter', () => {
  it('should filter an array to a new array using a filter function', async () => {
    const transformer: TOperationType = {
      $transformer: {
        name: __ARRAY_FILTER__,
        value: { $static: [1, 2, 3, 4] },
        arguments: [
          {
            $callback: {
              $and: {
                operations: [
                  { $condition: { name: __NUMBER_IS_EVEN__ } },
                  {
                    $or: {
                      operations: [
                        { $condition: { name: __NUMBER_IS_EVEN__ } }
                      ]
                    }
                  }
                ]
              }
            }
          }
        ]
      }
    }
    expect(await JWResolver.run(transformer)).toEqual([2, 4]);
  });
});

describe('at', () => {
  it('should return the element at a specific index in the array', async () => {
    const transformer: TOperationType = {
      $transformer: {
        name: __ARRAY_AT__,
        value: { $static: [1, 2, 3, 4] },
        arguments: [{ $static: 2 }]
      }
    }
    expect(await JWResolver.run(transformer)).toBe(3);
  });
});

describe('get_length', () => {
  it('should return the length of the array', async () => {
    const transformer: TOperationType = {
      $transformer: {
        name: __ARRAY_GET_LENGTH__,
        value: { $static: [1, 2, 3, 4] }
      }
    }
    expect(await JWResolver.run(transformer)).toBe(4);
  });
});


describe('find_index', () => {
  it('should return the index of the first element that satisfies the condition', async () => {
    const transformer: TOperationType = {
      $transformer: {
        name: __ARRAY_FIND_INDEX__,
        value: { $static: [1, 2, 3, 4] },
        arguments: [
          {
            $callback: {
              $condition: {
                name: __NUMBER_IS_EVEN__
              }
            }
          }
        ]
      }
    }
    expect(await JWResolver.run(transformer)).toBe(1);
  });
});


describe('find', () => {
  it('should return the first element that satisfies the condition', async () => {
    const transformer: TOperationType = {
      $transformer: {
        name: __ARRAY_FIND__,
        value: { $static: [1, 2, 3, 4] },
        arguments: [
          {
            $callback: {
              $condition: {
                name: __NUMBER_IS_EVEN__
              }
            }
          }
        ]
      }
    }
    expect(await JWResolver.run(transformer)).toBe(2);
  });



  it('should return undefined due of nothing found', async () => {
    const transformer: TOperationType = {
      $transformer: {
        name: __ARRAY_FIND__,
        value: { $static: [1, 2, 3, 4] },
        arguments: [
          {
            $callback: {
              $condition: {
                name: __NUMBER_EQ__,
                arguments: [{ $static: 5 }]
              }
            }
          }
        ]
      }
    }
    expect(await JWResolver.run(transformer)).toBeUndefined();
  });
});
