import { describe, it, expect, beforeAll } from '@jest/globals';
import {
  JWResolver,
  TOperationType,
  __TRANSFORMER__,
  __STATIC__,
  __OPERATION__,
  __NUMBER_GT__,
  __NUMBER_LT__,
  __NUMBER_EQ__,
  __NUMBER_NEQ__,
  __NUMBER_GTE__,
  __NUMBER_LTE__,
  __NUMBER_BETWEEN__,
  __NUMBER_IS_NAN__,
  __NUMBER_IS_NOT_NAN__,
  __NUMBER_IS_INT__,
  __NUMBER_IS_FLOAT__,
  __NUMBER_IS_POSITIVE__,
  __NUMBER_IS_NEGATIVE__,
  __NUMBER_IS_EVEN__,
  __NUMBER_IS_ODD__,
  __NUMBER_IS_NUMBER__,
  __NUMBER_IS_ZERO__,
  __CONDITION__
} from '..';

describe('gt', () => {
  it('should return true if the first number is greater than the second number', async () => {
    const condition: TOperationType = {
      $condition: {
        name: __NUMBER_GT__,
        value: { $static: 5 },
        arguments: [ { $static: 3 } ]
      }
    }
    expect(await JWResolver.run(condition)).toEqual(true);
  });
});

describe('lt', () => {
  it('should return true if the first number is less than the second number', async () => {
    const condition: TOperationType = {
      $condition: {
        name: __NUMBER_LT__,
        value: { $static: 2 },
        arguments: [ { $static: 4 } ]
      }
    }
    expect(await JWResolver.run(condition)).toEqual(true);
  });
});

describe('eq', () => {
  it('should return true if the first number is equal to the second number', async () => {
    const condition: TOperationType = {
      $condition: {
        name: __NUMBER_EQ__,
        value: { $static: 5 },
        arguments: [ { $static: 5 } ]
      }
    }
    expect(await JWResolver.run(condition)).toEqual(true);
  });
});

describe('neq', () => {
  it('should return true if the first number is not equal to the second number', async () => {
    const condition: TOperationType = {
      $condition: {
        name: __NUMBER_NEQ__,
        value: { $static: 5 },
        arguments: [ { $static: 3 } ]
      }
    }
    expect(await JWResolver.run(condition)).toEqual(true);
  });
});

describe('gte', () => {
  it('should return true if the first number is greater than or equal to the second number', async () => {
    const condition: TOperationType = {
      $condition: {
        name: __NUMBER_GTE__,
        value: { $static: 5 },
        arguments: [ { $static: 5 } ]
      }
    }
    expect(await JWResolver.run(condition)).toEqual(true);
  });
});

describe('gte', () => {
  it('should return true if the first number is greater than or equal to the second number', async () => {
    const condition: TOperationType = {
      $condition: {
        name: __NUMBER_GTE__,
        value: { $static: 6 },
        arguments: [ { $static: 5 } ]
      }
    }
    expect(await JWResolver.run(condition)).toEqual(true);
  });
});

describe('lte', () => {
  it('should return true if the first number is less than or equal to the second number', async () => {
    const condition: TOperationType = {
      $condition: {
        name: __NUMBER_LTE__,
        value: { $static: 5 },
        arguments: [ { $static: 5 } ]
      }
    }
    expect(await JWResolver.run(condition)).toEqual(true);
  });
});

describe('lte', () => {
  it('should return true if the first number is less than or equal to the second number', async () => {
    const condition: TOperationType = {
      $condition: {
        name: __NUMBER_LTE__,
        value: { $static: 4 },
        arguments: [ { $static: 5 } ]
      }
    }
    expect(await JWResolver.run(condition)).toEqual(true);
  });
});

describe('between', () => {
  it('should return true if the first number is between the second and third number', async () => {
    const condition: TOperationType = {
      $condition: {
        name: __NUMBER_BETWEEN__,
        value: { $static: 5 },
        arguments: [
          { $static: 3 },
          { $static: 7 }
        ]
      }
    }
    expect(await JWResolver.run(condition)).toEqual(true);
  });
});

describe('is_nan', () => {
  it('should return true if the value is NaN', async () => {
    const condition: TOperationType = {
      $condition: {
        name: __NUMBER_IS_NAN__,
        value: { $static: NaN }
      }
    }
    expect(await JWResolver.run(condition)).toEqual(true);
  });
});



describe('is_nan', () => {
  it('should return true if the value is NaN', async () => {
    const condition: TOperationType = {
      $condition: {
        name: __NUMBER_IS_NAN__,
        value: { $static: '5' }
      }
    }
    expect(await JWResolver.run(condition)).toEqual(false);
  });
});

describe('is_not_nan', () => {
  it('should return true if the value is not NaN', async () => {
    const condition: TOperationType = {
      $condition: {
        name: __NUMBER_IS_NOT_NAN__,
        value: { $static: 5 }
      }
    }
    expect(await JWResolver.run(condition)).toEqual(true);
  });
});

describe('is_not_nan', () => {
  it('should return true if the value is not NaN', async () => {
    const condition: TOperationType = {
      $condition: {
        name: __NUMBER_IS_NOT_NAN__,
        value: { $static: NaN }
      }
    }
    expect(await JWResolver.run(condition)).toEqual(false);
  });
});

describe('is_int', () => {
  it('should return true if the value is an integer', async () => {
    const condition: TOperationType = {
      $condition: {
        name: __NUMBER_IS_INT__,
        value: { $static: 5 }
      }
    }
    expect(await JWResolver.run(condition)).toEqual(true);
  });
});

describe('is_int', () => {
  it('should return true if the value is an integer', async () => {
    const condition: TOperationType = {
      $condition: {
        name: __NUMBER_IS_INT__,
        value: { $static: 5.1 }
      }
    }
    expect(await JWResolver.run(condition)).toEqual(false);
  });
});

describe('is_float', () => {
  it('should return true if the value is a float', async () => {
    const condition: TOperationType = {
      $condition: {
        name: __NUMBER_IS_FLOAT__,
        value: { $static: 5 }
      }
    }
    expect(await JWResolver.run(condition)).toEqual(false);
  });
});

describe('is_float', () => {
  it('should return true if the value is a float', async () => {
    const condition: TOperationType = {
      $condition: {
        name: __NUMBER_IS_FLOAT__,
        value: { $static: 5.1 }
      }
    }
    expect(await JWResolver.run(condition)).toEqual(true);
  });
});

describe('is_positive', () => {
  it('should return true if the value is a positive number', async () => {
    const condition: TOperationType = {
      $condition: {
        name: __NUMBER_IS_POSITIVE__,
        value: { $static: 5 }
      }
    }
    expect(await JWResolver.run(condition)).toEqual(true);
  });
});

describe('is_positive', () => {
  it('should return true if the value is a positive number', async () => {
    const condition: TOperationType = {
      $condition: {
        name: __NUMBER_IS_POSITIVE__,
        value: { $static: -5 }
      }
    }
    expect(await JWResolver.run(condition)).toEqual(false);
  });
});

describe('is_negative', () => {
  it('should return true if the value is a negative number', async () => {
    const condition: TOperationType = {
      $condition: {
        name: __NUMBER_IS_NEGATIVE__,
        value: { $static: -5 }
      }
    }
    expect(await JWResolver.run(condition)).toEqual(true);
  });
});

describe('is_negative', () => {
  it('should return true if the value is a negative number', async () => {
    const condition: TOperationType = {
      $condition: {
        name: __NUMBER_IS_NEGATIVE__,
        value: { $static: 5 }
      }
    }
    expect(await JWResolver.run(condition)).toEqual(false);
  });
});

describe('is_even', () => {
  it('should return true if the value is an even number', async () => {
    const condition: TOperationType = {
      $condition: {
        name: __NUMBER_IS_EVEN__,
        value: { $static: 4 }
      }
    }
    expect(await JWResolver.run(condition)).toEqual(true);
  });
});

describe('is_even', () => {
  it('should return true if the value is an even number', async () => {
    const condition: TOperationType = {
      $condition: {
        name: __NUMBER_IS_EVEN__,
        value: { $static: 5 }
      }
    }
    expect(await JWResolver.run(condition)).toEqual(false);
  });
});

describe('is_odd', () => {
  it('should return true if the value is an odd number', async () => {
    const condition: TOperationType = {
      $condition: {
        name: __NUMBER_IS_ODD__,
        value: { $static: 5 }
      }
    }
    expect(await JWResolver.run(condition)).toEqual(true);
  });
});

describe('is_odd', () => {
  it('should return true if the value is an odd number', async () => {
    const condition: TOperationType = {
      $condition: {
        name: __NUMBER_IS_ODD__,
        value: { $static: 4 }
      }
    }
    expect(await JWResolver.run(condition)).toEqual(false);
  });
});

describe('is_number', () => {
  it('should return true if the value is a number', async () => {
    const condition: TOperationType = {
      $condition: {
        name: __NUMBER_IS_NUMBER__,
        value: { $static: 5 }
      }
    }
    expect(await JWResolver.run(condition)).toEqual(true);
  });
});


describe('is_number', () => {
  it('should return false if the value is not a number', async () => {
    const condition: TOperationType = {
      $condition: {
        name: __NUMBER_IS_NUMBER__,
        value: { $static: 'not a number' }
      }
    }
    expect(await JWResolver.run(condition)).toEqual(false);
  });
});


describe('is_zero', () => {
  it('should return true if the value is zero', async () => {
    const condition: TOperationType = {
      $condition: {
        name: __NUMBER_IS_ZERO__,
        value: { $static: 0 }
      }
    }
    expect(await JWResolver.run(condition)).toEqual(true);
  });
});

describe('is_zero', () => {
  it('should return false if the value is not zero', async () => {
    const condition: TOperationType = {
      $condition: {
        name: __NUMBER_IS_ZERO__,
        value: { $static: 5 }
      }
    }
    expect(await JWResolver.run(condition)).toEqual(false);
  });
});
