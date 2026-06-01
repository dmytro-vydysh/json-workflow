import { describe, it, expect } from '@jest/globals';
import {
  JWResolver,
  TOperationType,
  __TRANSFORMER__,
  __STATIC__,
  __OPERATION__,
  __STRING_EQ__,
  __STRING_NEQ__,
  __STRING_CONTAINS__,
  __STRING_NOT_CONTAINS__,
  __STRING_STARTS_WITH__,
  __STRING_NOT_STARTS_WITH__,
  __STRING_ENDS_WITH__,
  __STRING_NOT_ENDS_WITH__,
  __STRING_MATCHES_REGEX__,
  __STRING_IS_STRING__,
  __STRING_IS_EMPTY__,
  __STRING_IS_NOT_EMPTY__,
  __CONDITION__
} from '../';

describe('string eq', () => {
  it('should return true if the string is equal to the value', async () => {
    const condition: TOperationType = {
      type: __CONDITION__,
      condition: __STRING_EQ__,
      valueGetter: {
        type: __STATIC__,
        value: 'hello'
      },
      arguments: [
        {
          type: __STATIC__,
          value: 'hello'
        }
      ]
    }
    expect(await JWResolver.run(condition)).toBe(true);
  });

  it('should return false if the string is not equal to the value', async () => {
    const condition: TOperationType = {
      type: __CONDITION__,
      condition: __STRING_EQ__,
      valueGetter: {
        type: __STATIC__,
        value: 'hello'
      },
      arguments: [
        {
          type: __STATIC__,
          value: 'world'
        }
      ]
    }
    expect(await JWResolver.run(condition)).toBe(false);
  });
});

describe('string neq', () => {
  it('should return true if the string is not equal to the value', async () => {
    const condition: TOperationType = {
      type: __CONDITION__,
      condition: __STRING_NEQ__,
      valueGetter: {
        type: __STATIC__,
        value: 'hello'
      },
      arguments: [
        {
          type: __STATIC__,
          value: 'world'
        }
      ]
    }
    expect(await JWResolver.run(condition)).toBe(true);
  });

  it('should return false if the string is equal to the value', async () => {
    const condition: TOperationType = {
      type: __CONDITION__,
      condition: __STRING_NEQ__,
      valueGetter: {
        type: __STATIC__,
        value: 'hello'
      },
      arguments: [
        {
          type: __STATIC__,
          value: 'hello'
        }
      ]
    }
    expect(await JWResolver.run(condition)).toBe(false);
  });
});

describe('string contains', () => {
  it('should return true if the string contains the value', async () => {
    const condition: TOperationType = {
      type: __CONDITION__,
      condition: __STRING_CONTAINS__,
      valueGetter: {
        type: __STATIC__,
        value: 'hello world'
      },
      arguments: [
        {
          type: __STATIC__,
          value: 'world'
        }
      ]
    }
    expect(await JWResolver.run(condition)).toBe(true);
  });

  it('should return false if the string does not contain the value', async () => {
    const condition: TOperationType = {
      type: __CONDITION__,
      condition: __STRING_CONTAINS__,
      valueGetter: {
        type: __STATIC__,
        value: 'hello world'
      },
      arguments: [
        {
          type: __STATIC__,
          value: 'foo'
        }
      ]
    }
    expect(await JWResolver.run(condition)).toBe(false);
  });
});

describe('string not contains', () => {
  it('should return true if the string does not contain the value', async () => {
    const condition: TOperationType = {
      type: __CONDITION__,
      condition: __STRING_NOT_CONTAINS__,
      valueGetter: {
        type: __STATIC__,
        value: 'hello world'
      },
      arguments: [
        {
          type: __STATIC__,
          value: 'foo'
        }
      ]
    }
    expect(await JWResolver.run(condition)).toBe(true);
  });

  it('should return false if the string contains the value', async () => {
    const condition: TOperationType = {
      type: __CONDITION__,
      condition: __STRING_NOT_CONTAINS__,
      valueGetter: {
        type: __STATIC__,
        value: 'hello world'
      },
      arguments: [
        {
          type: __STATIC__,
          value: 'world'
        }
      ]
    }
    expect(await JWResolver.run(condition)).toBe(false);
  });
});

describe('string starts with', () => {
  it('should return true if the string starts with the value', async () => {
    const condition: TOperationType = {
      type: __CONDITION__,
      condition: __STRING_STARTS_WITH__,
      valueGetter: {
        type: __STATIC__,
        value: 'hello world'
      },
      arguments: [
        {
          type: __STATIC__,
          value: 'hello'
        }
      ]
    }
    expect(await JWResolver.run(condition)).toBe(true);
  });

  it('should return false if the string does not start with the value', async () => {
    const condition: TOperationType = {
      type: __CONDITION__,
      condition: __STRING_STARTS_WITH__,
      valueGetter: {
        type: __STATIC__,
        value: 'hello world'
      },
      arguments: [
        {
          type: __STATIC__,
          value: 'world'
        }
      ]
    }
    expect(await JWResolver.run(condition)).toBe(false);
  });
});

describe('string not starts with', () => {
  it('should return true if the string does not start with the value', async () => {
    const condition: TOperationType = {
      type: __CONDITION__,
      condition: __STRING_NOT_STARTS_WITH__,
      valueGetter: {
        type: __STATIC__,
        value: 'hello world'
      },
      arguments: [
        {
          type: __STATIC__,
          value: 'world'
        }
      ]
    }
    expect(await JWResolver.run(condition)).toBe(true);
  });

  it('should return false if the string starts with the value', async () => {
    const condition: TOperationType = {
      type: __CONDITION__,
      condition: __STRING_NOT_STARTS_WITH__,
      valueGetter: {
        type: __STATIC__,
        value: 'hello world'
      },
      arguments: [
        {
          type: __STATIC__,
          value: 'hello'
        }
      ]
    }
    expect(await JWResolver.run(condition)).toBe(false);
  });
});

describe('string ends with', () => {
  it('should return true if the string ends with the value', async () => {
    const condition: TOperationType = {
      type: __CONDITION__,
      condition: __STRING_ENDS_WITH__,
      valueGetter: {
        type: __STATIC__,
        value: 'hello world'
      },
      arguments: [
        {
          type: __STATIC__,
          value: 'world'
        }
      ]
    }
    expect(await JWResolver.run(condition)).toBe(true);
  });

  it('should return false if the string does not end with the value', async () => {
    const condition: TOperationType = {
      type: __CONDITION__,
      condition: __STRING_ENDS_WITH__,
      valueGetter: {
        type: __STATIC__,
        value: 'hello world'
      },
      arguments: [
        {
          type: __STATIC__,
          value: 'hello'
        }
      ]
    }
    expect(await JWResolver.run(condition)).toBe(false);
  });
});

describe('string not ends with', () => {
  it('should return true if the string does not end with the value', async () => {
    const condition: TOperationType = {
      type: __CONDITION__,
      condition: __STRING_NOT_ENDS_WITH__,
      valueGetter: {
        type: __STATIC__,
        value: 'hello world'
      },
      arguments: [
        {
          type: __STATIC__,
          value: 'hello'
        }
      ]
    }
    expect(await JWResolver.run(condition)).toBe(true);
  });

  it('should return false if the string ends with the value', async () => {
    const condition: TOperationType = {
      type: __CONDITION__,
      condition: __STRING_NOT_ENDS_WITH__,
      valueGetter: {
        type: __STATIC__,
        value: 'hello world'
      },
      arguments: [
        {
          type: __STATIC__,
          value: 'world'
        }
      ]
    }
    expect(await JWResolver.run(condition)).toBe(false);
  });
});

describe('string matches regex', () => {
  it('should return true if the string matches the regex', async () => {
    const condition: TOperationType = {
      type: __CONDITION__,
      condition: __STRING_MATCHES_REGEX__,
      valueGetter: {
        type: __STATIC__,
        value: 'hello world'
      },
      arguments: [
        {
          type: __STATIC__,
          value: '^hello'
        }
      ]
    }
    expect(await JWResolver.run(condition)).toBe(true);
  });

  it('should return false if the string does not match the regex', async () => {
    const condition: TOperationType = {
      type: __CONDITION__,
      condition: __STRING_MATCHES_REGEX__,
      valueGetter: {
        type: __STATIC__,
        value: 'hello world'
      },
      arguments: [
        {
          type: __STATIC__,
          value: '^world'
        }
      ]
    }
    expect(await JWResolver.run(condition)).toBe(false);
  });
});

describe('string is string', () => {
  it('should return true if the value is a string', async () => {
    const condition: TOperationType = {
      type: __CONDITION__,
      condition: __STRING_IS_STRING__,
      valueGetter: {
        type: __STATIC__,
        value: 'hello world'
      }
    }
    expect(await JWResolver.run(condition)).toBe(true);
  });

  it('should return false if the value is not a string', async () => {  
    const condition: TOperationType = {
      type: __CONDITION__,
      condition: __STRING_IS_STRING__,
      valueGetter: {
        type: __STATIC__,
        value: 123
      }
    }
    expect(await JWResolver.run(condition)).toBe(false);
  });
});

describe('string is empty', () => {
  it('should return true if the string is empty', async () => {
    const condition: TOperationType = {
      type: __CONDITION__,
      condition: __STRING_IS_EMPTY__,
      valueGetter: {
        type: __STATIC__,
        value: ''
      }
    }
    expect(await JWResolver.run(condition)).toBe(true);
  });

  it('should return false if the string is not empty', async () => {
    const condition: TOperationType = {
      type: __CONDITION__,
      condition: __STRING_IS_EMPTY__,
      valueGetter: {
        type: __STATIC__, 
        value: 'hello'
      }
    }
    expect(await JWResolver.run(condition)).toBe(false);
  });
});

describe('string is not empty', () => {
  it('should return true if the string is not empty', async () => {
    const condition: TOperationType = {
      type: __CONDITION__,
      condition: __STRING_IS_NOT_EMPTY__,
      valueGetter: {
        type: __STATIC__,
        value: 'hello'
      }
    }
    expect(await JWResolver.run(condition)).toBe(true);
  });

  it('should return false if the string is empty', async () => {
    const condition: TOperationType = {
      type: __CONDITION__,
      condition: __STRING_IS_NOT_EMPTY__,
      valueGetter: {
        type: __STATIC__,
        value: ''
      }
    }
    expect(await JWResolver.run(condition)).toBe(false);
  });
});