import { TOperationType, JWContext } from "../..";
import { JWChecker } from "../../utils/check";
import { JWArrayCondition } from "../Array";

/**
 * Collection of object condition helpers used to validate
 * object structure, keys and values.
 */
export class JWObjectCondition {

  /**
   * Checks whether the specified key exists in the object.
   *
   * @param object - Object to inspect.
   * @param key - Key to search for.
   * @returns True if the key exists in the object, otherwise false.
   */
  public static async has_key(context: JWContext, object: any, key: string): Promise<boolean> {
    JWChecker.isObject(object, 1);
    JWChecker.isString(key, 2);
    return key in object;
  }

  /**
   * Checks whether the specified key does not exist in the object.
   *
   * @param object - Object to inspect.
   * @param key - Key to search for.
   * @returns True if the key does not exist in the object, otherwise false.
   */
  public static async not_has_key(context: JWContext, object: any, key: string): Promise<boolean> {
    JWChecker.isObject(object, 1);
    JWChecker.isString(key, 2);
    return !(key in object);
  }

  /**
   * Checks whether the object contains no own enumerable properties.
   *
   * @param object - Object to validate.
   * @returns True if the object is empty.
   */
  public static async is_empty(context: JWContext, object: any): Promise<boolean> {
    JWChecker.isObject(object, 1);
    return Object.keys(object).length === 0;
  }

  /**
   * Checks whether the object contains at least one own enumerable property.
   *
   * @param object - Object to validate.
   * @returns True if the object is not empty.
   */
  public static async is_not_empty(context: JWContext, object: any): Promise<boolean> {
    JWChecker.isObject(object, 1);
    return Object.keys(object).length > 0;
  }

  /**
   * Checks whether at least one object value matches the provided operation.
   *
   * Alias of {@link some_value}.
   *
   * @param object - Object whose values will be evaluated.
   * @param operation - Operation executed against each value.
   * @returns True if at least one value satisfies the operation condition.
   */
  public static async has_value(context: JWContext, object: any, operation: TOperationType,): Promise<boolean> {
    JWChecker.isObject(object, 1);
    return await JWArrayCondition.some(context, Object.values(object), operation);
  }

  /**
   * Checks whether at least one object key matches the provided operation.
   *
   * @param object - Object whose keys will be evaluated.
   * @param operation - Operation executed against each key.
   * @returns True if at least one key satisfies the operation condition.
   */
  public static async some_key(context: JWContext, object: any, operation: TOperationType): Promise<boolean> {
    JWChecker.isObject(object, 1);
    return await JWArrayCondition.some(context, Object.keys(object), operation);
  }

  /**
   * Checks whether all object keys match the provided operation.
   * 
   * @param object - Object whose keys will be evaluated.
   * @param operation - Operation executed against each key.
   * @returns True if every key satisfies the operation condition.
   */
  public static async every_key(context: JWContext, object: any, operation: TOperationType): Promise<boolean> {
    JWChecker.isObject(object, 1);
    return await JWArrayCondition.every(context, Object.keys(object), operation);
  }



  /**
   * Checks whether all object values match the provided operation.
   *
   * @param object - Object whose values will be evaluated.
   * @param operation - Operation executed against each value.
   * @returns True if every value satisfies the operation condition.
   */
  public static async every_value(context: JWContext, object: any, operation: TOperationType): Promise<boolean> {
    JWChecker.isObject(object, 1);
    return await JWArrayCondition.every(context, Object.values(object), operation);
  }

  /**
   * Checks whether at least one object value matches the provided operation.
   *
   * @param object - Object whose values will be evaluated.
   * @param operation - Operation executed against each value.
   * @returns True if at least one value satisfies the operation condition.
   */
  public static async some_value(context: JWContext, object: any, operation: TOperationType): Promise<boolean> {
    JWChecker.isObject(object, 1);
    return await JWArrayCondition.some(context, Object.values(object), operation);
  }

}