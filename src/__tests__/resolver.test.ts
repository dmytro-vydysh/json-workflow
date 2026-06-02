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
  __NUMBER_EQ__
} from '..';



/**
 * This is a test for use a custom resolver as operation, value and arguments
 */

beforeAll(() => {
  JWResolver.registerResolver('fetch_todos', async () => {
    let _return: Record<string, any> = {};
    const response = await fetch('https://jsonplaceholder.typicode.com/todos');
    _return.status = response.status;
    _return.ok = response.ok;
    _return.statusText = response.statusText;

    if (response.ok)
      _return.data = await response.json();

    return _return;
  })
})

describe('resolver', () => {

  it('should return only completed todos of user with id 10', async () => {
    const pipeline: TOperationTypeList = [
      {
        $resolver: {
          name: 'fetch_todos',
          save: 'todos_response'
        }
      },
      {
        $conditional: {
          $if: {
            $condition: {
              name: __BOOLEAN_IS_TRUE__,
              value: { $operation: { $transformer: { name: __OBJECT_GET_KEY__, value: { $context: 'todos_response' }, arguments: [{ $static: 'ok' }] } } }
            }
          },
          $then: {
            $transformer: { name: __OBJECT_GET_KEY__, value: { $context: 'todos_response' }, arguments: [{ $static: 'data' }], save: 'todos' }
          },
          $else: {
            $transformer: { name: __CONTEXT_SET_KEY__, value: { $static: 'todos' }, arguments: [{ $static: [] }] }
          }
        }
      },
      {
        $conditional: {
          $if: {
            $condition: {
              name: __ARRAY_IS_NOT_EMPTY__,
              value: { $context: 'todos' }
            }
          },
          $then: {
            $transformer: {
              name: __ARRAY_FILTER__,
              value: { $context: 'todos' },
              arguments: [
                {
                  $callback: {
                    $and: {
                      operations: [
                        {
                          $condition: {
                            name: __BOOLEAN_IS_TRUE__,
                            valueTransformer: {
                              $transformer: {
                                name: __OBJECT_GET_KEY__,
                                arguments: [{ $static: 'completed' }]
                              },
                            }
                          },
                        },
                        {
                          $condition: {
                            name: __NUMBER_EQ__,
                            valueTransformer: {
                              $transformer: {
                                name: __OBJECT_GET_KEY__,
                                arguments: [{ $static: 'userId' }]
                              },
                            },
                            arguments: [{ $static: 10 }]
                          },
                        }
                      ]
                    }
                  }
                }
              ],
              save: 'completed_todos_user_10'
            }
          },
          $else: {
            $transformer: { name: __CONTEXT_SET_KEY__, value: { $static: [] }, save: 'completed_todos_user_10' }
          }
        }
      }
    ]


    expect(((await JWResolver.runSequence(pipeline))['completed_todos_user_10'] as Array<any>).every(todo => todo.userId === 10 && todo.completed === true)).toBeTruthy();
  })

})

describe('resolver semplified', () => {
  it('should return only completed todos of user with id 10', async () => {
    const operation: TOperationType = {
      $transformer: {
        name: __ARRAY_FILTER__,
        value: { $resolver: 'fetch_todos' },
        valueTransformer: { $transformer: { name: __OBJECT_GET_KEY__, arguments: [{ $static: 'data' }] } },
        arguments: [
          {
            $callback: {
              $and: {
                operations: [
                  { $condition: { name: __BOOLEAN_IS_TRUE__, valueTransformer: { $transformer: { name: __OBJECT_GET_KEY__, arguments: [{ $static: 'completed' }] } } } },
                  { $condition: { name: __NUMBER_EQ__, valueTransformer: { $transformer: { name: __OBJECT_GET_KEY__, arguments: [{ $static: 'userId' }] } }, arguments: [{ $static: 10 }] } }
                ]
              }
            }
          }
        ]
      }
    }
    expect((await JWResolver.run(operation) as Array<any>).every(todo => todo.userId === 10 && todo.completed === true)).toBeTruthy();
  })
})




describe('resolver semplified 2', () => {
  it('should return only completed todos of user with id 10', async () => {
    const operation: TOperationType = {
      $transformer: {
        name: __ARRAY_FILTER__,
        value: {
          $operation: {
            $transformer: {
              name: __OBJECT_GET_KEY__,
              value: { $resolver: 'fetch_todos' },
              arguments: [{ $static: 'data' }]
            }
          }
        },
        arguments: [
          {
            $callback: {
              $and: {
                operations: [
                  { $condition: { name: __BOOLEAN_IS_TRUE__, valueTransformer: { $transformer: { name: __OBJECT_GET_KEY__, arguments: [{ $static: 'completed' }] } } } },
                  { $condition: { name: __NUMBER_EQ__, valueTransformer: { $transformer: { name: __OBJECT_GET_KEY__, arguments: [{ $static: 'userId' }] } }, arguments: [{ $static: 10 }] } }
                ]
              }
            }
          }
        ]
      }
    }
    expect((await JWResolver.run(operation) as Array<any>).every(todo => todo.userId === 10 && todo.completed === true)).toBeTruthy();
  })
})




describe('resolver semplified 2', () => {
  it('should return only completed todos of user with id 10', async () => {
    const operation: TOperationType = {
      $transformer: {
        name: __ARRAY_FILTER__,
        value: {
          $operation: {
            $transformer: {
              name: __OBJECT_GET_KEY__,
              value: { $resolver: 'fetch_todos' },
              arguments: [{ $static: 'data' }]
            }
          }
        },
        arguments: [
          {
            $callback: {
              $or: {
                operations: [
                  { $condition: { name: __BOOLEAN_IS_TRUE__, valueTransformer: { $transformer: { name: __OBJECT_GET_KEY__, arguments: [{ $static: 'completed' }] } } } },
                  { $condition: { name: __NUMBER_EQ__, valueTransformer: { $transformer: { name: __OBJECT_GET_KEY__, arguments: [{ $static: 'userId' }] } }, arguments: [{ $static: 10 }] } }
                ]
              }
            }
          }
        ]
      }
    }
    expect((await JWResolver.run(operation) as Array<any>).every(todo => todo.userId === 10 || todo.completed === true)).toBeTruthy();
  })
})