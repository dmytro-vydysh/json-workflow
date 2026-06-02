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
  __NUMBER_FROM_STRING__,
  __CONTEXT_GET_KEY__,
  __CONTEXT_SET_KEY__,
  __CONTEXT_HAS_KEY__
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
      },
      {
        $transformer: {
          name: __CONTEXT_GET_KEY__,
          value: { $static: 'number_from_string_result' },
          arguments: [{ $context: 'string_result' }],
          save: 'final_result'
        }
      },
      {
        $transformer: {
          name: __CONTEXT_SET_KEY__,
          value: { $static: 'setted_key' },
          arguments: [{ $static: 20 }],
        }
      },
      {
        $condition: {
          name: __CONTEXT_HAS_KEY__,
          value: { $static: 'setted_key' },
          arguments: [{ $static: 'setted_key' }],
          expectedResult: true,
          save: 'has_setted_key'
        }
      }
    ]);
    expect(context).toEqual({ sum_result: 15, string_result: '15', number_from_string_result: 15, final_result: 15, setted_key: 20, has_setted_key: true });
  });
});