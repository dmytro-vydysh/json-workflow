import { describe, it, expect } from '@jest/globals';
import {
  JWResolver,
  TOperationType,
  __TRANSFORMER__,
  __STATIC__,
  __OPERATION__,
  __NUMBER_ADD__,
  __NUMBER_SUBSTRACT__,
  __NUMBER_MULTIPLY__,
  __NUMBER_DIVIDE__,
  __NUMBER_MODULO__,
  __NUMBER_POWER__,
  __NUMBER_NEGATE__,
  __NUMBER_ABS__,
  __NUMBER_ROUND__,
  __NUMBER_FLOOR__,
  __NUMBER_CEIL__,
  __NUMBER_SQRT__,
  __NUMBER_MAX__,
  __NUMBER_MIN__,
  __NUMBER_TO_INT__,
  __NUMBER_ROUND_TO_DECIMALS__,
  __NUMBER_TO_STRING__,
  __NUMBER_AVG__,
  __NUMBER_FROM_STRING__,
} from '..';


describe('add', () => {
  it('should add two numbers', async () => {
    const transformer: TOperationType = {
      type: __TRANSFORMER__,
      transformer: __NUMBER_ADD__,
      valueGetter: {
        type: __STATIC__,
        value: 5
      },
      arguments: [
        {
          type: __STATIC__,
          value: 3
        }
      ]
    }
    expect(await JWResolver.run(transformer)).toBe(8);
  });
});


describe('substract', () => {
  it('should substract two numbers', async () => {
    const transformer: TOperationType = {
      type: __TRANSFORMER__,
      transformer: __NUMBER_SUBSTRACT__,
      valueGetter: {
        type: __STATIC__,
        value: 5
      },
      arguments: [
        {
          type: __STATIC__,
          value: 3
        }
      ]
    }
    expect(await JWResolver.run(transformer)).toBe(2);
  })
});



describe('multiply', () => {
  it('should multiply two numbers', async () => {
    const transformer: TOperationType = {
      type: __TRANSFORMER__,
      transformer: __NUMBER_MULTIPLY__,
      valueGetter: {
        type: __STATIC__,
        value: 5
      },
      arguments: [
        {
          type: __STATIC__,
          value: 3
        }
      ]
    }

    expect(await JWResolver.run(transformer)).toBe(15);
  });
});
describe('divide', () => {
  it('should divide two numbers', async () => {
    const transformer: TOperationType = {
      type: __TRANSFORMER__,
      transformer: __NUMBER_DIVIDE__,
      valueGetter: {
        type: __STATIC__,
        value: 10
      },
      arguments: [
        {
          type: __STATIC__,
          value: 2
        }
      ]
    }

    expect(await JWResolver.run(transformer)).toBe(5);
  });
});
describe('modulo', () => {
  it('should calculate the modulo of two numbers', async () => {
    const transformer: TOperationType = {
      type: __TRANSFORMER__,
      transformer: __NUMBER_MODULO__,
      valueGetter: {
        type: __STATIC__,
        value: 5
      },
      arguments: [
        {
          type: __STATIC__,
          value: 2
        }
      ]
    }

    expect(await JWResolver.run(transformer)).toBe(1);
  });
});
describe('power', () => {
  it('should return the result of raising a number to a power', async () => {
    const transformer: TOperationType = {
      type: __TRANSFORMER__,
      transformer: __NUMBER_POWER__,
      valueGetter: {
        type: __STATIC__,
        value: 5
      },
      arguments: [
        {
          type: __STATIC__,
          value: 2
        }
      ]
    }

    expect(await JWResolver.run(transformer)).toBe(25);
  });
});
describe('negate', () => {
  it('should negate a number', async () => {
    const transformer: TOperationType = {
      type: __TRANSFORMER__,
      transformer: __NUMBER_NEGATE__,
      valueGetter: {
        type: __STATIC__,
        value: 5
      },
    }

    expect(await JWResolver.run(transformer)).toBe(-5);
  });
});
describe('abs', () => {
  it('should return the absolute value of a number', async () => {
    const transformer: TOperationType = {
      type: __TRANSFORMER__,
      transformer: __NUMBER_ABS__,
      valueGetter: {
        type: __STATIC__,
        value: -5
      },
    }

    expect(await JWResolver.run(transformer)).toBe(5);
  });
});
describe('round', () => {
  it('should round a number to the nearest integer', async () => {
    const transformer: TOperationType = {
      type: __TRANSFORMER__,
      transformer: __NUMBER_ROUND__,
      valueGetter: {
        type: __STATIC__,
        value: 5.5
      },
    }

    expect(await JWResolver.run(transformer)).toBe(6);
  });
});
describe('floor', () => {
  it('should round a number down to the nearest integer', async () => {
    const transformer: TOperationType = {
      type: __TRANSFORMER__,
      transformer: __NUMBER_FLOOR__,
      valueGetter: {
        type: __STATIC__,
        value: 5.5
      },
    }

    expect(await JWResolver.run(transformer)).toBe(5);
  });
});
describe('ceil', () => {
  it('should round a number up to the nearest integer', async () => {
    const transformer: TOperationType = {
      type: __TRANSFORMER__,
      transformer: __NUMBER_CEIL__,
      valueGetter: {
        type: __STATIC__,
        value: 5.5
      },
    }

    expect(await JWResolver.run(transformer)).toBe(6);
  });
});
describe('sqrt', () => {
  it('should return the square root of a number', async () => {
    const transformer: TOperationType = {
      type: __TRANSFORMER__,
      transformer: __NUMBER_SQRT__,
      valueGetter: {
        type: __STATIC__,
        value: 5
      },
    }

    expect(await JWResolver.run(transformer)).toBe(Math.sqrt(5));
  });
});
describe('max', () => {
  it('should return the maximum of two numbers', async () => {
    const transformer: TOperationType = {
      type: __TRANSFORMER__,
      transformer: __NUMBER_MAX__,
      valueGetter: {
        type: __STATIC__,
        value: 5
      },
      arguments: [
        {
          type: __STATIC__,
          value: 10
        }
      ]
    }

    expect(await JWResolver.run(transformer)).toBe(10);
  });
});
describe('min', () => {
  it('should return the minimum of two numbers', async () => {
    const transformer: TOperationType = {
      type: __TRANSFORMER__,
      transformer: __NUMBER_MIN__,
      valueGetter: {
        type: __STATIC__,
        value: 5
      },
      arguments: [
        {
          type: __STATIC__,
          value: 10
        }
      ]
    }

    expect(await JWResolver.run(transformer)).toBe(5);
  });
});
describe('to_int', () => {
  it('should convert a number to an integer', async () => {
    const transformer: TOperationType = {
      type: __TRANSFORMER__,
      transformer: __NUMBER_TO_INT__,
      valueGetter: {
        type: __STATIC__,
        value: 5.5
      },
    }

    expect(await JWResolver.run(transformer)).toBe(5);
  });
});

describe('round_to_decimals', () => {
  it('should round a number to a specified number of decimal places', async () => {
    const transformer: TOperationType = {
      type: __TRANSFORMER__,
      transformer: __NUMBER_ROUND_TO_DECIMALS__,
      valueGetter: {
        type: __STATIC__,
        value: 5.123654789
      },
      arguments: [
        {
          type: __STATIC__,
          value: 2
        }
      ]
    }

    expect(await JWResolver.run(transformer)).toBe(5.12);
  });
});
describe('to_string', () => {
  it('should convert a number to a string', async () => {
    const transformer: TOperationType = {
      type: __TRANSFORMER__,
      transformer: __NUMBER_TO_STRING__,
      valueGetter: {
        type: __STATIC__,
        value: 5
      },
    }

    expect(await JWResolver.run(transformer)).toBe("5");
  });
});
describe('from_string', () => {
  it('should convert a string to a number', async () => {
    const transformer: TOperationType = {
      type: __TRANSFORMER__,
      transformer: __NUMBER_FROM_STRING__,
      valueGetter: {
        type: __STATIC__,
        value: "5"
      },
    }

    expect(await JWResolver.run(transformer)).toBe(5);
  });
});
describe('avg', () => {
  it('should return the average of three numbers', async () => {
    const transformer: TOperationType = {
      type: __TRANSFORMER__,
      transformer: __NUMBER_AVG__,
      valueGetter: {
        type: __STATIC__,
        value: 5
      },
      arguments: [
        {
          type: __STATIC__,
          value: 10
        },
        {
          type: __STATIC__,
          value: 15
        }
      ]
    }
    expect(await JWResolver.run(transformer)).toBe(10);
  });
});