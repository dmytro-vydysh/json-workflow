import { JWOperationError } from "../../Error";
import { TOperationType, JWContext } from "../../Resolver/assets";
import { JWResolver } from "../../Resolver";
import { JWChecker } from "../../utils/check";


/**
 * @class JWArrayCondition
 * @description Class containing static methods for array conditions. These methods can be used in operations to check conditions on arrays.
 */
export class JWArrayCondition {

  /**
   * @param array array to check
   * @param value value to check for in the array
   * @returns true if the array includes the value, false otherwise
   * @warning This condition only works for arrays of primitive values (string, number, boolean, null, undefined). If the array contains objects, it will throw an error. For arrays of objects, use the "some" or "every" conditions with a operation that checks for the desired properties.
   */
  public static async includes(context: JWContext, array: Array<any>, value: any): Promise<boolean> {
    JWChecker.isArray(array, 1);
    if (array.some(item => typeof item === 'object' && item !== null))
      throw new JWOperationError(`Argument at position 1 must be an array of primitive values, got objects. For array of objects use the "some" or "every" conditions with a operation that checks for the desired properties.`);
    return array.includes(value);
  }

  /**
   * @param array array to check
   * @param value  value to check for in the array
   * @returns true if the array does not include the value, false otherwise
   * @warning This condition only works for arrays of primitive values (string, number, boolean, null, undefined). If the array contains objects, it will throw an error. For arrays of objects, use the "some" or "every" conditions with a operation that checks for the desired properties.
   */
  public static async not_includes(context: JWContext, array: Array<any>, value: any): Promise<boolean> {
    JWChecker.isArray(array, 1);
    if (array.some(item => typeof item === 'object' && item !== null))
      throw new JWOperationError(`Argument at position 1 must be an array of primitive values, got objects. For array of objects use the "some" or "every" conditions with a operation that checks for the desired properties.`);
    return !(await JWArrayCondition.includes(context, array, value));
  }

  /**
   * @param array Array to check
   * @param operation operation that check every item of array
   * @returns true if every item of array return true from the operation
   */
  public static async every(context: JWContext, array: Array<any>, operation: TOperationType,): Promise<boolean> {
    JWChecker.isArray(array, 1);



    const results = await Promise.all(array.map(async (item, index, arrayRef) => await JWResolver.resolve(context, { ...operation }, { $static: item }, [{ $static: index }, { $static: arrayRef }])));

    return results.every(result => result === true);

  }

  /**
   * @param array Array to check
   * @param operation operation that check every item of array
   * @returns true if at least one item of array return true from the operation
   */
  public static async some(context: JWContext, array: Array<any>, operation: TOperationType): Promise<boolean> {
    JWChecker.isArray(array, 1);
    const results = await Promise.all(array.map(async (item, index, arrayRef) => await JWResolver.resolve(context, { ...operation }, { $static: item }, [{ $static: index }, { $static: arrayRef }])));

    return results.some(result => result === true);
  }

  /**
   * @param array Array to check
   * @returns true if array is empty
   */
  public static async is_empty(context: JWContext, array: Array<any>): Promise<boolean> {
    JWChecker.isArray(array, 1);
    return array.length === 0;
  }

  /**
   * @param array Array to check
   * @returns true if array is not empty
   */
  public static async is_not_empty(context: JWContext, array: Array<any>): Promise<boolean> {
    JWChecker.isArray(array, 1);
    return array.length > 0;
  }
}