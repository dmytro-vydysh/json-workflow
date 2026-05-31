import { JWOperationError } from "../../Error";
import { JWResolver, OperationValueResolver } from "../../Resolver";
import { IOperation, TValue } from "../../Resolver/types";
import { JWChecker } from "../../utils/check";


/**
 * Collection of array transformer helpers used to manipulate
 * and transform array values.
 */
export class JWArrayTransformer {

  /**
   * Merges multiple arrays into a new array.
   *
   * @param array - Base array.
   * @param values - Arrays to append.
   * @returns A new array containing all elements.
   */
  public static async join_arrays(array: any[], ...values: any[]): Promise<any[]> {
    JWChecker.isArray(array, 1);
    values.forEach((value, index) => JWChecker.isArray(value, index + 2));
    return [...array, ...values.flat()];
  }

  /**
   * Appends a value to the end of an array.
   *
   * @param array - Source array.
   * @param value - Value to append.
   * @returns A new array with the value added at the end.
   */
  public static async append(array: any[], value: any): Promise<any[]> {
    JWChecker.isArray(array, 1);
    return [...array, value];
  }

  /**
   * Prepends a value to the beginning of an array.
   *
   * @param array - Source array.
   * @param value - Value to prepend.
   * @returns A new array with the value added at the beginning.
   */
  public static async prepend(array: any[], value: any): Promise<any[]> {
    JWChecker.isArray(array, 1);
    return [value, ...array];
  }

  /**
   * Inserts a value at the specified index.
   *
   * @param array - Source array.
   * @param index - Target insertion index.
   * @param value - Value to insert.
   * @returns A new array with the value inserted.
   */
  public static async insert(array: any[], index: number, value: any): Promise<any[]> {
    JWChecker.isArray(array, 1);
    return [...array.slice(0, index), value, ...array.slice(index)];
  }

  /**
   * Reduces an array using a operation as reducer function.
   *
   * The current accumulator is passed as the operation value,
   * while the current array item is passed as the first argument.
   *
   * @param array - Source array.
   * @param operation - Operation executed for each iteration.
   * @param initialValue - Initial accumulator value.
   * @returns The final accumulated value.
   *
   * @throws {JWOperationError}
   * Thrown when the initial value is undefined.
   */
  public static async reduce(array: any[], operation: IOperation, initialValue: TValue): Promise<any> {

    JWChecker.isArray(array, 1);

    if (typeof initialValue === 'undefined')
      throw new JWOperationError('Initial value for reduce cannot be undefined');


    return await array.reduce(
      async (accPromise, item) => {
        const acc = await accPromise;
        return await JWResolver.resolve(operation, { type: 'static', value: item }, [{ type: 'static', value: acc }]);
      },
      initialValue
    );
  }
  /**
   * Maps all array items through the specified operation.
   *
   * @param array - Source array.
   * @param operation - Operation executed for each item.
   * @returns A new array containing transformed values.
   */
  public static async map(array: any[], operation: IOperation): Promise<Array<any>> {
    JWChecker.isArray(array, 1);

    return await Promise.all(array.map(async item => await JWResolver.resolve(operation, { type: 'static', value: item })));
  }

  /**
   * Filters array items using the specified operation.
   *
   * The operation must return a boolean-compatible value.
   *
   * @param array - Source array.
   * @param operation - Operation used as filter predicate.
   * @returns A new array containing matching items.
   */
  public static async filter(array: any[], operation: IOperation): Promise<Array<any>> {
    JWChecker.isArray(array, 1);

    const results = await Promise.all(array.map(async item => await JWResolver.resolve(operation, { type: 'static', value: item })));
    return array.filter((_, index) => results[index] === true);
  }

  /**
   * Returns the element at the specified index.
   *
   * @param array - Source array.
   * @param index - Index to retrieve.
   * @returns The array element at the given index.
   */
  public static async at(array: any[], index: number): Promise<any> {
    JWChecker.isArray(array, 1);
    return array[index];
  }

  /**
   * Returns the number of elements in the array.
   *
   * @param array - Source array.
   * @returns The array length.
   */
  public static async get_length(array: any[]): Promise<number> {
    JWChecker.isArray(array, 1);
    return array.length;
  }

}