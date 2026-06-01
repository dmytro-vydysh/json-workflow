import { JWContext } from "../../Resolver/assets";
import { JWChecker } from "../../utils/check";

/**
 * @class JWBooleanCondition
 * @description Class containing static methods for boolean conditions. These methods can be used in operations to check conditions on boolean values.
 */
export class JWBooleanCondition {

  /**
   * @param value value to check
   * @return true if value is true, false otherwise
   */
  public static async is_true(context: JWContext, value: any): Promise<boolean> {
    JWChecker.isBoolean(value, 1);
    return value === true;
  }

  /**
   * @param value value to check
   * @return true if value is false, false otherwise
   */
  public static async is_false(context: JWContext, value: any): Promise<boolean> {
    JWChecker.isBoolean(value, 1);
    return value === false;
  }
}