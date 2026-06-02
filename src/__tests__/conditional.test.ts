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
  __NUMBER_IS_EVEN__,
  __NUMBER_SQRT__,
  __NUMBER_POWER__,
  __ARRAY_FILTER__,
  __NUMBER_MULTIPLY__,
  __NUMBER_IS_ODD__
} from '..';


/**
 This test is a replica of the following function:

    function conditionalExample() {

      const sqrt = Math.sqrt(16);

      if(sqrt % 2 === 0) 
        return Math.pow(sqrt, 2);
      else 
        return Math.pow(sqrt, 3);
    }

  It also uses context to save the result of the sqrt operation and use it in $then and $else branches
 */

describe('conditional', () => {
  const it_description = `
  replica of:
  function conditionalExample() {
    const sqrt = Math.sqrt(16);
    if(sqrt % 2 === 0) 
      return Math.pow(sqrt, 2);
    else 
      return Math.pow(sqrt, 3);
  }
  `;


  it(it_description, async () => {
    const operation: TOperationType = {
      $conditional: {
        $if: {
          $condition: {
            name: __NUMBER_IS_EVEN__,
            value: {
              $operation: {
                $transformer: {
                  name: __NUMBER_SQRT__,
                  value: { $static: 9 },
                  save: 'result_to_use'
                }
              }
            }
          }
        },
        $then: {
          $transformer: {
            name: __NUMBER_POWER__,
            value: { $context: 'result_to_use' },
            arguments: [{ $static: 2 }],
          }
        },
        $else: {
          $transformer: {
            name: __NUMBER_POWER__,
            value: { $context: 'result_to_use' },
            arguments: [{ $static: 3 }],
          }
        },
        save: 'final_result'
      }
    };

    expect(await JWResolver.run(operation)).toEqual(27);
  })
});


describe('conditional filter for array', () => {
  it('should return filtered array based on conditional operation', async () => {
    const operation: TOperationType = {
      $transformer: {
        name: __ARRAY_FILTER__,
        value: { $static: [1, 2, 3, 4, 5] },
        arguments: [
          {
            $callback: {
              $conditional: {
                $if: {
                  $condition: {
                    name: __NUMBER_IS_ODD__,
                  }
                },
                $then: {
                  $condition: {
                    name: __NUMBER_IS_EVEN__,
                    valueTransformer: { $transformer: { name: __NUMBER_POWER__, arguments: [{ $static: 2 }] } }
                  }
                },
                $else: {
                  $condition: {
                    name: __NUMBER_IS_EVEN__,
                    valueTransformer: { $transformer: { name: __NUMBER_POWER__, arguments: [{ $static: 3 }] } }
                  }
                },
              }
            }
          }
        ]
      },
    };
    expect(await JWResolver.resolve(undefined, operation)).toEqual([]);
  })
});