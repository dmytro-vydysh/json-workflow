import { describe, it, expect } from '@jest/globals';
import {
  JWResolver,
  TOperationType,
  __TRANSFORMER__,
  __STRING_CONCAT__,
  __STATIC__,
  __OPERATION__,
  __STRING_JOIN__,
  __STRING_TO_UPPER__,
  __STRING_TO_LOWER__,
  __STRING_TRIM__,
  __STRING_SUBSTRING__,
  __STRING_REPLACE_ONE__,
  __STRING_REPLACE_ALL__,
  __STRING_REPLACE_REGEX__,
  __STRING_GET_LENGTH__,
  __STRING_SPLIT__
} from '../';













describe('concat', () => {
  it('should concatenate string correctly, event the transformer passed as a string to concatenate inside arguments', async () => {
    const transformer: TOperationType = {
      type: __TRANSFORMER__,
      transformer: __STRING_CONCAT__,
      valueGetter: {
        type: __STATIC__,
        value: 'Hello'
      },
      arguments: [
        {
          type: __OPERATION__, operation: {
            type: __TRANSFORMER__,
            transformer: __STRING_CONCAT__,
            valueGetter: {
              type: __STATIC__,
              value: ' '
            },
            arguments: [
              { type: __STATIC__, value: 'World' }
            ]
          }
        }
      ]
    }
    expect(await JWResolver.run(transformer)).toMatchInlineSnapshot(`"Hello World"`);
  });
})


describe('join', () => {
  it('should join an array of strings in one string joined by an one space separator', async () => {
    const transformer: TOperationType = {
      type: __TRANSFORMER__,
      transformer: __STRING_JOIN__,
      valueGetter: {
        type: __STATIC__,
        value: ['Hello', 'World']
      },
      arguments: [
        {
          type: __STATIC__,
          value: ' '
        }
      ]
    }
    expect(await JWResolver.run(transformer)).toMatchInlineSnapshot(`"Hello World"`);
  });
})


describe('to_upper', () => {
  it('should transform a string in uppercase', async () => {
    const transformer: TOperationType = {
      type: __TRANSFORMER__,
      transformer: __STRING_TO_UPPER__,
      valueGetter: {
        type: __STATIC__,
        value: 'hello'
      }
    }
    expect(await JWResolver.run(transformer)).toMatchInlineSnapshot(`"HELLO"`);
  });
})


describe('to_lower', () => {
  it('should transform a string in lowercase', async () => {
    const transformer: TOperationType = {
      type: __TRANSFORMER__,
      transformer: __STRING_TO_LOWER__,
      valueGetter: {
        type: __STATIC__,
        value: 'HELLO'
      }
    }
    expect(await JWResolver.run(transformer)).toMatchInlineSnapshot(`"hello"`);
  });
})



describe('trim', () => {
  it('should trim a string', async () => {
    const transformer: TOperationType = {
      type: __TRANSFORMER__,
      transformer: __STRING_TRIM__,
      valueGetter: {
        type: __STATIC__,
        value: '  HELLO  '
      }
    }
    expect(await JWResolver.run(transformer)).toMatchInlineSnapshot(`"HELLO"`);
  });
})

describe('substring', () => {
  it('should cut a string', async () => {
    const transformer: TOperationType = {
      type: __TRANSFORMER__,
      transformer: __STRING_SUBSTRING__,
      valueGetter: {
        type: __STATIC__,
        value: 'Hello World'
      },
      arguments: [
        {
          type: __STATIC__,
          value: 6
        },
        {
          type: __STATIC__,
          value: 11
        }
      ]
    }
    expect(await JWResolver.run(transformer)).toMatchInlineSnapshot(`"World"`);
  });
})


describe('replace_one', () => {
  it('should replace the first occurrence of a string in another string', async () => {
    const transformer: TOperationType = {
      type: __TRANSFORMER__,
      transformer: __STRING_REPLACE_ONE__,
      valueGetter: {
        type: __STATIC__,
        value: 'Hello World'
      },
      arguments: [
        {
          type: __STATIC__,
          value: 'o'
        },
        {
          type: __STATIC__,
          value: 'a'
        }
      ]
    }
    expect(await JWResolver.run(transformer)).toMatchInlineSnapshot(`"Hella World"`);
  });
});


describe('replace_all', () => {
  it('should replace all occurrences of a string in another string', async () => {
    const transformer: TOperationType = {
      type: __TRANSFORMER__,
      transformer: __STRING_REPLACE_ALL__,
      valueGetter: {
        type: __STATIC__,
        value: 'Hello World'
      },
      arguments: [
        {
          type: __STATIC__,
          value: 'o'
        },
        {
          type: __STATIC__,
          value: 'a'
        }
      ]
    }
    expect(await JWResolver.run(transformer)).toMatchInlineSnapshot(`"Hella Warld"`);
  });
})





describe('replace_regex', () => {
  it('should replace a string using a regular expression', async () => {
    const transformer: TOperationType = {
      type: __TRANSFORMER__,
      transformer: __STRING_REPLACE_REGEX__,
      valueGetter: {
        type: __STATIC__,
        value: 'Hello World'
      },
      arguments: [
        {
          type: __STATIC__,
          value: new RegExp(/o/g).source
        },
        {
          type: __STATIC__,
          value: 'a'
        }
      ]
    }
    expect(await JWResolver.run(transformer)).toMatchInlineSnapshot(`"Hella Warld"`);
  });
})


describe('get_length', () => {
  it('should get the length of a string', async () => {
    const transformer: TOperationType = {
      type: __TRANSFORMER__,
      transformer: __STRING_GET_LENGTH__,
      valueGetter: {
        type: __STATIC__,
        value: 'Hello World'
      }
    }
    expect(await JWResolver.run(transformer)).toMatchInlineSnapshot(`11`);
  });
})


describe('split', () => {
  it('should split a string into an array', async () => {
    const transformer: TOperationType = {
      type: __TRANSFORMER__,
      transformer: __STRING_SPLIT__,
      valueGetter: {
        type: __STATIC__,
        value: 'Hello World'
      },
      arguments: [
        {
          type: __STATIC__,
          value: ' '
        }
      ]
    }
    expect(await JWResolver.run(transformer)).toMatchInlineSnapshot(`
      [
        "Hello",
        "World",
      ]
    `);
  });
})