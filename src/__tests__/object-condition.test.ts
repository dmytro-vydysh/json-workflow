import { describe, it, expect, beforeAll } from '@jest/globals';
import {
  JWResolver,
  TOperationType,
  __TRANSFORMER__,
  __STATIC__,
  __OPERATION__,
  __RESOLVER__,
  __CONDITION__,
  __CALLBACK__,

  __OBJECT_HAS_KEY__,
  __OBJECT_NOT_HAS_KEY__,
  __OBJECT_IS_EMPTY__,
  __OBJECT_IS_NOT_EMPTY__,
  __OBJECT_HAS_VALUE__,
  __OBJECT_SOME_VALUE__,
  __OBJECT_EVERY_VALUE__,
  __OBJECT_SOME_KEY__,
  __OBJECT_EVERY_KEY__,
  __NUMBER_IS_EVEN__,
  __NUMBER_GT__,
  __NUMBER_IS_ODD__,
  __STRING_EQ__,
  __NUMBER_IS_NUMBER__,
  __STRING_IS_STRING__
} from '..';

describe('object.has_key', () => {
  it('should return true if the object has the key', async () => {
    const condition: TOperationType = {
      type: __CONDITION__,
      condition: __OBJECT_HAS_KEY__,
      valueGetter: {
        type: __STATIC__,
        value: { a: 1, b: 2, c: 3 }
      },
      arguments: [
        {
          type: __STATIC__,
          value: 'b'
        }
      ]
    }
    expect(await JWResolver.run(condition)).toBe(true);
  });

  it('should return false if the object does not have the key', async () => {
    const condition: TOperationType = {
      type: __CONDITION__,
      condition: __OBJECT_HAS_KEY__,
      valueGetter: {
        type: __STATIC__,
        value: { a: 1, b: 2, c: 3 }
      },
      arguments: [
        {
          type: __STATIC__,
          value: 'd'
        }
      ]
    }
    expect(await JWResolver.run(condition)).toBe(false);
  });
});

describe('object.not_has_key', () => {
  it('should return true if the object does not have the key', async () => {
    const condition: TOperationType = {
      type: __CONDITION__,
      condition: __OBJECT_NOT_HAS_KEY__,
      valueGetter: {
        type: __STATIC__,
        value: { a: 1, b: 2, c: 3 }
      },
      arguments: [
        {
          type: __STATIC__,
          value: 'd'
        }
      ]
    }
    expect(await JWResolver.run(condition)).toBe(true);
  });

  it('should return false if the object has the key', async () => {
    const condition: TOperationType = {
      type: __CONDITION__,
      condition: __OBJECT_NOT_HAS_KEY__,
      valueGetter: {
        type: __STATIC__,
        value: { a: 1, b: 2, c: 3 }
      },
      arguments: [
        {
          type: __STATIC__,
          value: 'b'
        }
      ]
    }
    expect(await JWResolver.run(condition)).toBe(false);
  });
});

describe('object.is_empty', () => {
  it('should return true if the object is empty', async () => {
    const condition: TOperationType = {
      type: __CONDITION__,
      condition: __OBJECT_IS_EMPTY__,
      valueGetter: {
        type: __STATIC__,
        value: {}
      }
    }
    expect(await JWResolver.run(condition)).toBe(true);
  });

  it('should return false if the object is not empty', async () => {
    const condition: TOperationType = {
      type: __CONDITION__,
      condition: __OBJECT_IS_EMPTY__,
      valueGetter: {
        type: __STATIC__,
        value: { a: 1, b: 2, c: 3 }
      }
    }
    expect(await JWResolver.run(condition)).toBe(false);
  });
});

describe('object.is_not_empty', () => {
  it('should return true if the object is not empty', async () => {
    const condition: TOperationType = {
      type: __CONDITION__,
      condition: __OBJECT_IS_NOT_EMPTY__,
      valueGetter: {
        type: __STATIC__,
        value: { a: 1, b: 2, c: 3 }
      }
    }
    expect(await JWResolver.run(condition)).toBe(true);
  });

  it('should return false if the object is empty', async () => {
    const condition: TOperationType = {
      type: __CONDITION__,
      condition: __OBJECT_IS_NOT_EMPTY__,
      valueGetter: {
        type: __STATIC__,
        value: {}
      }
    }
    expect(await JWResolver.run(condition)).toBe(false);
  });
});

describe('object.has_value', () => {
  it('should return true if the object has the value', async () => {
    const condition: TOperationType = {
      type: __CONDITION__,
      condition: __OBJECT_HAS_VALUE__,
      valueGetter: {
        type: __STATIC__,
        value: { a: 1, b: 2, c: 3 }
      },
      arguments: [
        {
          type: __CALLBACK__,
          callback: {
            type: __CONDITION__,
            condition: __NUMBER_GT__,
            arguments: [
              {
                type: __STATIC__,
                value: 2
              }
            ]
          }
        }
      ]
    }
    expect(await JWResolver.run(condition)).toBe(true);
  });

  it('should return false if the object does not have the value', async () => {
    const condition: TOperationType = {
      type: __CONDITION__,
      condition: __OBJECT_HAS_VALUE__,
      valueGetter: {
        type: __STATIC__,
        value: { a: 2, b: 4, c: 6 }
      },
      arguments: [
        {
          type: __CALLBACK__,
          callback: {
            type: __CONDITION__,
            condition: __NUMBER_IS_ODD__,
          }
        },
      ]
    }
    expect(await JWResolver.run(condition)).toBe(false);
  });
});

describe('object.some_key', () => {
  it('should return true if at least one key satisfies the condition', async () => {
    const condition: TOperationType = {
      type: __CONDITION__,
      condition: __OBJECT_SOME_KEY__,
      valueGetter: {
        type: __STATIC__,
        value: { a: 1, b: 2, c: 3 }
      },
      arguments: [
        {
          type: __CALLBACK__,
          callback: {
            type: __CONDITION__,
            condition: __STRING_IS_STRING__,
          }
        }
      ]
    }
    expect(await JWResolver.run(condition)).toBe(true);
  });

  it('should return false if no key satisfies the condition', async () => {
    const condition: TOperationType = {
      type: __CONDITION__,
      condition: __OBJECT_SOME_KEY__,
      valueGetter: {
        type: __STATIC__,
        value: { a: 1, b: 2, c: 3 }
      },
      arguments: [
        {
          type: __CALLBACK__,
          callback: {
            type: __CONDITION__,
            condition: __NUMBER_IS_NUMBER__,
          }
        }
      ]
    }
    expect(await JWResolver.run(condition)).toBe(false);
  });
});

describe('object.every_key', () => {
  it('should return true if every key satisfies the condition', async () => {
    const condition: TOperationType = {
      type: __CONDITION__,
      condition: __OBJECT_EVERY_KEY__,
      valueGetter: {
        type: __STATIC__,
        value: { a: 1, b: 2, c: 3 }
      },
      arguments: [
        {
          type: __CALLBACK__,
          callback: {
            type: __CONDITION__,
            condition: __STRING_IS_STRING__,
          }
        }
      ]
    }
    expect(await JWResolver.run(condition)).toBe(true);
  });

  it('should return false if at least one key does not satisfy the condition', async () => {
    const condition: TOperationType = {
      type: __CONDITION__,
      condition: __OBJECT_EVERY_KEY__,
      valueGetter: {
        type: __STATIC__,
        value: { a: 1, b: 2, c: 3 }
      },
      arguments: [
        {
          type: __CALLBACK__,
          callback: {
            type: __CONDITION__,
            condition: __NUMBER_IS_NUMBER__,
          }
        }
      ]
    }
    expect(await JWResolver.run(condition)).toBe(false);
  });
});

describe('object.every_value', () => {
  it('should return true if every value satisfies the condition', async () => {
    const condition: TOperationType = {
      type: __CONDITION__,
      condition: __OBJECT_EVERY_VALUE__,
      valueGetter: {
        type: __STATIC__,
        value: { a: 2, b: 4, c: 6 }
      },
      arguments: [
        {
          type: __CALLBACK__,
          callback: {
            type: __CONDITION__,
            condition: __NUMBER_IS_EVEN__,
          }
        }
      ]
    }
    expect(await JWResolver.run(condition)).toBe(true);
  });

  it('should return false if at least one value does not satisfy the condition', async () => {
    const condition: TOperationType = {
      type: __CONDITION__,
      condition: __OBJECT_EVERY_VALUE__,
      valueGetter: {
        type: __STATIC__,
        value: { a: 2, b: 3, c: 6 }
      },
      arguments: [
        {
          type: __CALLBACK__,
          callback: {
            type: __CONDITION__,
            condition: __NUMBER_IS_EVEN__,
          }
        }
      ]
    }
    expect(await JWResolver.run(condition)).toBe(false);
  });
});

describe('object.some_value', () => {
  it('should return true if at least one value satisfies the condition', async () => {
    const condition: TOperationType = {
      type: __CONDITION__,
      condition: __OBJECT_SOME_VALUE__,
      valueGetter: {
        type: __STATIC__,
        value: { a: 1, b: 2, c: 3 }
      },
      arguments: [
        {
          type: __CALLBACK__,
          callback: {
            type: __CONDITION__,
            condition: __NUMBER_IS_EVEN__,
          }
        }
      ]
    }
    expect(await JWResolver.run(condition)).toBe(true);
  });

  it('should return false if no value satisfies the condition', async () => {
    const condition: TOperationType = {
      type: __CONDITION__,
      condition: __OBJECT_SOME_VALUE__,
      valueGetter: {
        type: __STATIC__,
        value: { a: 1, b: 3, c: 5 }
      },
      arguments: [
        {
          type: __CALLBACK__,
          callback: {
            type: __CONDITION__,
            condition: __NUMBER_IS_EVEN__,
          }
        }
      ]
    }
    expect(await JWResolver.run(condition)).toBe(false);
  });
});
