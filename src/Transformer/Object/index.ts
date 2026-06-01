import { JWContext } from "../..";
import { JWOperationError } from "../../Error";
import { JWChecker } from "../../utils/check";

/** Object transformation helpers used by resolver transformer operations. */
export class JWObjectTransformer {

  /** Returns all own enumerable keys of the object. */
  public static async get_keys(context: JWContext, obj: Record<string, any>): Promise<string[]> {
    JWChecker.isObject(obj, 1);
    return Object.keys(obj);
  }

  /** Returns all own enumerable values of the object. */
  public static async get_values(context: JWContext, obj: Record<string, any>): Promise<any[]> {
    JWChecker.isObject(obj, 1);
    return Object.values(obj);
  }

  /** Returns a value by key and throws when the key is missing. */
  public static async get_key(context: JWContext, obj: Record<string, any>, key: string): Promise<any> {
    JWChecker.isObject(obj, 1);
    JWChecker.isString(key, 2);
    if (!(key in obj))
      throw new JWOperationError(`Object does not have the key: ${key}`);
    return obj[key];
  }

  /** Returns a shallow copy with the provided key set to the provided value. */
  public static async set_key(context: JWContext, obj: Record<string, any>, key: string, value: any): Promise<Record<string, any>> {
    JWChecker.isObject(obj, 1);
    JWChecker.isString(key, 2);
    return { ...obj, [key]: value };
  }

  /** Shallow-merges two objects, letting the second object override duplicate keys. */
  public static async join(context: JWContext, obj1: Record<string, any>, obj2: Record<string, any>): Promise<Record<string, any>> {
    JWChecker.isObject(obj1, 1);
    JWChecker.isObject(obj2, 2);
    return { ...obj1, ...obj2 };
  }
}