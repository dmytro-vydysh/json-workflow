import { describe, it, expect, beforeAll } from '@jest/globals';
import {
  JWResolver,
  TOperationType,
  __TRANSFORMER__,
  __STATIC__,
  __OPERATION__,
  __RESOLVER__,
  __CONDITION__,
  __CONTEXT__,
  __NUMBER_ADD__,
  __NUMBER_TO_STRING__,
  __NUMBER_FROM_STRING__
} from '..';



describe('context mini test', () => {
  it('should return the context using values from context in different transformers', async () => {
    const context = await JWResolver.runSequence([
      {
        $transformer: {
          name: __NUMBER_ADD__,
          value: { $static: 5 },
          arguments: [{ $static: 10 }],
          save: 'sum_result'
        },
      },
      {
        $transformer: {
          name: __NUMBER_TO_STRING__,
          value: { $context: 'sum_result' },
          save: 'string_result'
        },
      },
      {
        $transformer: {
          name: __NUMBER_FROM_STRING__,
          value: { $context: 'string_result' },
          save: 'number_from_string_result'
        }
      }
    ]);
    expect(context).toEqual({ sum_result: 15, string_result: '15', number_from_string_result: 15 });
  });
});