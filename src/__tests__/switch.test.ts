import { describe, it, expect } from '@jest/globals';
import { TOperationType, IResolverOperationSwitch } from '../Resolver/assets';
import { __ARRAY_FILTER__, __CONTEXT_SET_KEY__, __NUMBER_EQ__, __NUMBER_IS_EVEN__, __NUMBER_MULTIPLY__, __NUMBER_POWER__, JWResolver } from '..';
import { JWOperationError } from '../Error';


describe('switch', () => {
  it('should return the correct value based on the cases', async () => {
    const $switch: IResolverOperationSwitch = {
      $switch: {
        value: { $static: 2 },
        // valueTransformer: {
        //   $transformer: {
        //     name: 'number.add',
        //     arguments: [{ $static: 3 }]
        //   }
        // },
        cases: [
          { $case: { value: { $static: 2 }, $operation: { $transformer: { name: __CONTEXT_SET_KEY__, value: { $static: 'case' }, arguments: [{ $static: 2 }] } } } },
        ],
        save: 'switch_result',
      }
    }

    expect(await JWResolver.run($switch)).toBe(2);
  })


  it('should return the default operation result', async () => {
    const $switch: IResolverOperationSwitch = {
      $switch: {
        value: { $static: 2 },
        valueTransformer: {
          $transformer: {
            name: 'number.add',
            arguments: [{ $static: 3 }]
          }
        },
        cases: [
          { $case: { value: { $static: 2 }, $operation: { $transformer: { name: __CONTEXT_SET_KEY__, value: { $static: 'case' }, arguments: [{ $static: 2 }] } } } },
        ],
        $default: {
          $transformer: { name: __CONTEXT_SET_KEY__, value: { $static: 'case' }, arguments: [{ $static: 5 }] }
        }
      }
    }
    expect(await JWResolver.run($switch)).toBe(5);
  })





  it('should throw error due to non-existing case/default match', async () => {
    const $switch: IResolverOperationSwitch = {
      $switch: {
        value: { $static: 2 },
        valueTransformer: {
          $transformer: {
            name: 'number.multiply',
            arguments: [{ $static: 3 }]
          }
        },
        cases: [
          { $case: { value: { $static: 2 }, $operation: { $transformer: { name: __CONTEXT_SET_KEY__, value: { $static: 'case' }, arguments: [{ $static: 2 }] } } } },
        ],
      }
    }
    await expect(JWResolver.run($switch)).rejects.toBeInstanceOf(JWOperationError);
  });






})