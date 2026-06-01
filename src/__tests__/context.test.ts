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
  __NUMBER_TO_STRING__
} from '..';

beforeAll(() => {
  JWResolver.registerResolver('context_as_object', async (context: Map<string, any>) => {
    const obj: Record<string, any> = {};
    for (const [key, value] of context.entries())
      obj[key] = value;
    return obj;
  });
})


describe('context', () => {
  it('should return the context', async () => {
    const context = await JWResolver.runSequence([
      {
        type: __TRANSFORMER__,
        transformer: __NUMBER_ADD__,
        valueGetter: {
          type: __STATIC__,
          value: 5
        },
        arguments: [
          { type: __STATIC__, value: 10 }
        ],
        save: 'sum_result'
      },
      {
        type: __TRANSFORMER__,
        transformer: __NUMBER_TO_STRING__,
        valueGetter: {
          type: __CONTEXT__,
          key: 'sum_result'
        },
        save: 'string_result'
      }
    ]);
    console.log(context)
    expect(context).toBeInstanceOf(Map);
  });
});