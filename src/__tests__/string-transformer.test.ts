import { describe, it, expect } from '@jest/globals';
import {
  JWResolver,
  IOperation,
  __TRANSFORMER__,
  __STRING_CONCAT__,
  __STATIC__,
  __OPERATION__,
  __STRING_JOIN__,
  __STRING_TO_UPPER__
} from '../';













describe('concat', () => {
  it('should concatenate string correctly, event the transformer passed as a string to concatenate inside arguments', async () => {
    const transformer: IOperation = {
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
    expect(await JWResolver.resolve(transformer)).toMatchInlineSnapshot(`"Hello World"`);
  });
})


describe('join', () => {
  it('should join an array of strings in one string joined by an one space separator', async () => {
    const transformer: IOperation = {
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
    expect(await JWResolver.resolve(transformer)).toMatchInlineSnapshot(`"Hello World"`);
  });
})


describe('to_upper', () => {
  it('should transform a string in uppercase', async () => {
    const transformer: IOperation = {
      type: __TRANSFORMER__,
      transformer: __STRING_TO_UPPER__,
      valueGetter: {
        type: __STATIC__,
        value: 'hello'
      }
    }
    expect(await JWResolver.resolve(transformer)).toMatchInlineSnapshot(`"HELLO"`);
  });
})


// describe('to_lower', () => {
//   it('should pass', () => {
//     expect(true).toBe(true);
//   });
// })


// describe('trim', () => {
//   it('should pass', () => {
//     expect(true).toBe(true);
//   });
// })


// describe('substring', () => {
//   it('should pass', () => {
//     expect(true).toBe(true);
//   });
// })


// describe('replace_one', () => {
//   it('should pass', () => {
//     expect(true).toBe(true);
//   });
// })


// describe('replace_all', () => {
//   it('should pass', () => {
//     expect(true).toBe(true);
//   });
// })


// describe('replace_regex', () => {
//   it('should pass', () => {
//     expect(true).toBe(true);
//   });
// })


// describe('get_length', () => {
//   it('should pass', () => {
//     expect(true).toBe(true);
//   });
// })


// describe('split', () => {
//   it('should pass', () => {
//     expect(true).toBe(true);
//   });
// })