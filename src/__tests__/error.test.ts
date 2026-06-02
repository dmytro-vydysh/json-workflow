import { describe, it, expect, beforeAll, beforeEach, afterEach, jest } from '@jest/globals';
import { JWResolver } from '../Resolver';
import { JWOperationArgumentError, JWOperationError } from '../Error';
import { __JWROOT__, IResolverOperationTransformer, TOperationType, TOperationTypeList } from '../Resolver/assets';
import { JWChecker } from '../utils/check';
import { __ARRAY_MAP__, __NUMBER_POWER__, __OBJECT_GET_KEY__, __STRING_CONCAT__, __STRING_SPLIT__, __STRING_TO_UPPER__ } from '..';

describe('Error handling', () => {
  it('should throw an error when an invalid unit is used in date.add transformer', async () => {
    const transformer: TOperationType = {
      $transformer: {
        name: 'date.add',
        value: { $static: new Date() },
        arguments: [
          { $static: 1 },
          { $static: 'invalid_unit' }
        ]
      }
    };
    await expect(JWResolver.run(transformer)).rejects.toBeInstanceOf(JWOperationError);
  });

  it('should throw an error when an invalid unit is used in date.subtract transformer', async () => {
    const transformer: TOperationType = {
      $transformer: {
        name: 'date.subtract',
        value: { $static: new Date() },
        arguments: [
          { $static: 1 },
          { $static: 'invalid_unit' }
        ]
      }
    };
    await expect(JWResolver.run(transformer)).rejects.toBeInstanceOf(JWOperationError);
  });

  it('should throw an error checking for a type mismatch in JWChecker', () => {
    expect(() => JWChecker.isNumber('ciao', 1)).toThrow(JWOperationArgumentError);
  });

  it('should throw an error getting an invalid transformer', async () => {
    const transformer: TOperationType = {
      $transformer: {
        // @ts-ignore
        name: 'non_existent_transformer',
        value: { $static: 'test' },
        arguments: []
      }
    };
    await expect(JWResolver.run(transformer)).rejects.toBeInstanceOf(JWOperationError);
  })



  it('should throw an error getting an invalid condition', async () => {
    const condition: TOperationType = {
      $condition: {
        // @ts-ignore
        name: 'non_existent_condition',
        value: { $static: 'test' },
        arguments: []
      }
    };
    await expect(JWResolver.run(condition)).rejects.toBeInstanceOf(JWOperationError);
  })


  it('should throw an error searching for a key in an object', async () => {
    const transformer: TOperationType = {
      $transformer: {
        name: __OBJECT_GET_KEY__,
        value: { $static: { a: 1, b: 2, c: 3 } },
        arguments: [
          { $static: 'non_existent_key' }
        ]
      }
    }
    await expect(JWResolver.run(transformer)).rejects.toBeInstanceOf(JWOperationError);
  });


  it('should throw an error if i try to register a resolver multiple times', () => {
    JWResolver.registerResolver('test_resolver', async () => 'test');
    expect(() => JWResolver.registerResolver('test_resolver', async () => 'test')).toThrow(JWOperationError);
  });


  it('should read all context values', async () => {
    // also, testing context root reader here
    const operations: TOperationTypeList = [
      {
        $transformer: {
          name: __STRING_SPLIT__,
          value: { $static: 'a,b,c' },
          arguments: [{ $static: ',' }],
          save: 'array',
        }
      },
      {
        $transformer: {
          name: __ARRAY_MAP__,
          value: {
            $operation: {
              $transformer: {
                name: __OBJECT_GET_KEY__,
                value: { $context: __JWROOT__ },
                arguments: [
                  { $static: 'array' }
                ]
              }
            }
          },
          arguments: [
            { $callback: { $transformer: { name: __STRING_TO_UPPER__ } } }
          ],
          save: 'array'
        }
      },
    ];
    expect(await JWResolver.runSequence(operations)).toEqual({ array: ['A', 'B', 'C'] });
  });

  it('should emit process warning when a context key is missing', async () => {
    const processWarnSpy = jest.spyOn(process, 'emitWarning').mockImplementation(() => true);

    const transformer: IResolverOperationTransformer = {
      $transformer: {
        name: __STRING_CONCAT__,
        value: { $static: 'Hello' },
        arguments: [
          { $context: 'missing_key' },
          { $static: ' ' },
          { $static: 'World' },
        ]
      }
    };
    await JWResolver.run(transformer);

    expect(processWarnSpy).toHaveBeenCalledWith('Context key "missing_key" not found');
    processWarnSpy.mockRestore();
  });


  it('should throw an error if a resolver does not exists', async () => {
    JWResolver.registerResolver('existing_resolver', async () => 'test');
    JWResolver.removeResolver('existing_resolver');
    const resolver: TOperationType = {
      $resolver: {
        name: 'existing_resolver',
        arguments: []
      }
    }
    await expect(JWResolver.run(resolver)).rejects.toBeInstanceOf(JWOperationError);
  });

  it('should throw an error if an operation has more than one operator', async () => {
    const operation: TOperationType = {
      $transformer: {
        name: __NUMBER_POWER__,
        value: { $static: 2 },
        arguments: [{ $static: 3 }],
      },
      // @ts-ignore
      not_supposed_to_be_here: 'hello'
    };
    await expect(JWResolver.run(operation)).rejects.toBeInstanceOf(JWOperationError);
  });



  it('should throw an error due to unknown operator', async () => {
    const operation: TOperationType = {
      // @ts-ignore
      $unknown_operator: {
        name: __NUMBER_POWER__,
        value: { $static: 2 },
        arguments: [{ $static: 3 }],
      },
    };
    await expect(JWResolver.run(operation)).rejects.toBeInstanceOf(JWOperationError);
  });



  it('should throw an error due to more than 1 key in value', async () => {
    const operation: TOperationType = {
      $transformer: {
        name: __NUMBER_POWER__,
        value: {
          $static: 2,

          // @ts-ignore
          not_supposed_to_be_here: 'hello'
        },
        arguments: [{ $static: 3 }],
      },
    };
    await expect(JWResolver.run(operation)).rejects.toBeInstanceOf(JWOperationError);
  });


  it('should throw an error due to unknown value getter', async () => {
    const operation: TOperationType = {
      $transformer: {
        name: __NUMBER_POWER__,
        value: {

          // @ts-ignore
          $unknown_value_getter: 2,
        },
        arguments: [{ $static: 3 }],
      },
    };
    await expect(JWResolver.run(operation)).rejects.toBeInstanceOf(JWOperationError);
  });


  it('should throw an error if there are more than 1 key in arg getter', async () => {
    const operation: TOperationType = {
      $transformer: {
        name: __NUMBER_POWER__,
        value: {
          $static: 2,
        },
        arguments: [{
          $static: 3,
          // @ts-ignore
          not_supposed_to_be_here: 'hello'
        }],
      },
    };
    await expect(JWResolver.run(operation)).rejects.toBeInstanceOf(JWOperationError);
  });




  it('should throw an error due to unknown arg getter', async () => {
    const operation: TOperationType = {
      $transformer: {
        name: __NUMBER_POWER__,
        value: {
          $static: 2,
        },
        // @ts-ignore
        arguments: [{ $unknown_arg_getter: 3 }],
      },
    };
    await expect(JWResolver.run(operation)).rejects.toBeInstanceOf(JWOperationError);
  });


  it('should throw an error if there is no $if in conditional operation', async () => {
    const operation: TOperationType = {
      $conditional: {
        // @ts-ignore
        $then: {},
        // @ts-ignore
        $else: {}
      }
    };
    await expect(JWResolver.run(operation)).rejects.toBeInstanceOf(JWOperationError);
  });




  it('should throw an error if there is no $then in conditional operation', async () => {
    const operation: TOperationType = {
      $conditional: {
        // @ts-ignore
        $if: {},
        // @ts-ignore
        $else: {}
      }
    };
    await expect(JWResolver.run(operation)).rejects.toBeInstanceOf(JWOperationError);
  });


  it('should throw an error if there is no $else in conditional operation', async () => {
    const operation: TOperationType = {
      $conditional: {
        // @ts-ignore
        $if: {},
        // @ts-ignore
        $then: {}
      }
    };
    await expect(JWResolver.run(operation)).rejects.toBeInstanceOf(JWOperationError);
  });

});


