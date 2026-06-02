import { JWStringCondition } from "./String";
import { JWNumberCondition } from "./Number";
import { JWArrayCondition } from "./Array";
import { JWObjectCondition } from "./Object";
import { JWDateCondition } from "./Date";
import { JWBooleanCondition } from "./Boolean";
import { JWOperationError } from "../Error";
import { JWContext } from "../Resolver/assets";
import { JWContextCondition } from "./Context";


/**
 * Registry containing all available condition functions.
 *
 * The key represents the unique condition identifier used by the operation,
 * while the value is the corresponding implementation function.
 */
export const JWConditionsMap = {
  'number.gt': JWNumberCondition.gt,
  'number.lt': JWNumberCondition.lt,
  'number.eq': JWNumberCondition.eq,
  'number.neq': JWNumberCondition.neq,
  'number.gte': JWNumberCondition.gte,
  'number.lte': JWNumberCondition.lte,
  'number.between': JWNumberCondition.between,
  'number.is_nan': JWNumberCondition.is_nan,
  'number.is_not_nan': JWNumberCondition.is_not_nan,
  'number.is_int': JWNumberCondition.is_int,
  'number.is_float': JWNumberCondition.is_float,
  'number.is_positive': JWNumberCondition.is_positive,
  'number.is_negative': JWNumberCondition.is_negative,
  'number.is_even': JWNumberCondition.is_even,
  'number.is_odd': JWNumberCondition.is_odd,
  'number.is_zero': JWNumberCondition.is_zero,
  'number.is_number': JWNumberCondition.is_number,
  'string.eq': JWStringCondition.eq,
  'string.neq': JWStringCondition.neq,
  'string.contains': JWStringCondition.contains,
  'string.not_contains': JWStringCondition.not_contains,
  'string.starts_with': JWStringCondition.starts_with,
  'string.not_starts_with': JWStringCondition.not_starts_with,
  'string.ends_with': JWStringCondition.ends_with,
  'string.not_ends_with': JWStringCondition.not_ends_with,
  'string.matches_regex': JWStringCondition.matches_regex,
  'string.is_string': JWStringCondition.is_string,
  'string.is_empty': JWStringCondition.is_empty,
  'string.is_not_empty': JWStringCondition.is_not_empty,
  'array.includes': JWArrayCondition.includes,
  'array.not_includes': JWArrayCondition.not_includes,
  'array.every': JWArrayCondition.every,
  'array.some': JWArrayCondition.some,
  'array.is_empty': JWArrayCondition.is_empty,
  'array.is_not_empty': JWArrayCondition.is_not_empty,
  'object.has_key': JWObjectCondition.has_key,
  'object.not_has_key': JWObjectCondition.not_has_key,
  'object.is_empty': JWObjectCondition.is_empty,
  'object.is_not_empty': JWObjectCondition.is_not_empty,
  'object.has_value': JWObjectCondition.has_value,
  'object.some_value': JWObjectCondition.some_value,
  'object.every_value': JWObjectCondition.every_value,
  'object.some_key': JWObjectCondition.some_key,
  'object.every_key': JWObjectCondition.every_key,
  'date.is_before': JWDateCondition.is_before,
  'date.is_after': JWDateCondition.is_after,
  'date.is_today': JWDateCondition.is_today,
  'date.is_equal_or_before': JWDateCondition.is_equal_or_before,
  'date.is_equal_or_after': JWDateCondition.is_equal_or_after,
  'date.is_equal': JWDateCondition.is_equal,
  'date.is_past': JWDateCondition.is_past,
  'date.is_future': JWDateCondition.is_future,
  'date.is_weekend': JWDateCondition.is_weekend,
  'date.is_weekday': JWDateCondition.is_weekday,
  'date.is_between': JWDateCondition.is_between,
  'date.is_day_of_week': JWDateCondition.is_day_of_week,
  'boolean.is_true': JWBooleanCondition.is_true,
  'boolean.is_false': JWBooleanCondition.is_false,
  'context.has_key': JWContextCondition.hasKey,
};



/**
 * Union type containing all registered condition identifiers.
 */
export type TJWConditionType = keyof typeof JWConditionsMap;



/**
 * Factory class used to retrieve condition implementations
 * from the condition registry.
 */
export class JWCondition {



  /**
   * Returns the condition function associated with the specified type.
   *
   * @param type - Registered condition identifier.
   * @returns The condition function associated with the provided type.
   *
   * @throws {JWOperationError}
   * Thrown when the requested condition type is not registered.
   *
   * @example
   * ```ts
   * const condition = JWCondition.get('number.gt');
   * const result = condition(10, 5);
   * // true
   * ```
   */
  public static get(type: TJWConditionType): (context: JWContext,...args: any[]) => Promise<any> {
    const condition = JWConditionsMap[type];
    if (!condition)
      throw new JWOperationError(`Condition with type ${type} not found.`);
    return condition;
  }
}