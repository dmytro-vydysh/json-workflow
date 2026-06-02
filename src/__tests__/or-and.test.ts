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
  TOperationTypeList,
  __BOOLEAN_IS_TRUE__,
  __OBJECT_GET_KEY__,
  __ARRAY_FILTER__,
  __OBJECT_HAS_KEY__,
  __CONTEXT_SET_KEY__,
  __ARRAY_IS_NOT_EMPTY__,
  __NUMBER_EQ__,
  __NUMBER_IS_EVEN__,
  __NUMBER_IS_ODD__
} from '..';


describe('or & and', () => {
  it('should return true if at least one condition is true', async () => {
    const operation: TOperationType = {
      $or: {
        operations: [
          {
            $and: {
              operations: [
                {
                  $condition: {
                    name: __NUMBER_EQ__,
                    value: { $static: 5 },
                    arguments: [{ $static: 5 }]
                  }
                },
                {
                  $condition: {
                    name: __NUMBER_IS_EVEN__,
                    value: { $static: 4 },
                  }
                }
              ],
              save: 'and_result'
            },
          },

          {
            $condition: {
              name: __NUMBER_IS_ODD__,
              value: { $static: 4 },
            }
          }
        ],
        save: 'or_result'
      }
    }
    expect(await JWResolver.run(operation)).toBe(true);
  });
});