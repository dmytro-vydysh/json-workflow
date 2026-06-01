import { JWOperationError } from "../Error";
import { JWContext } from "../Resolver/types";
import { JWArrayTransformer } from "./Array";
import { JWDateTransformer } from "./Date";
import { JWNumberTransformer } from "./Number";
import { JWObjectTransformer } from "./Object";
import { JWStringTransformer } from "./String";

export const JWTransformersMap = {

  /** Trasformatori numerici */
  'number.add': JWNumberTransformer.add,
  'number.substract': JWNumberTransformer.substract,
  'number.multiply': JWNumberTransformer.multiply,
  'number.divide': JWNumberTransformer.divide,
  'number.modulo': JWNumberTransformer.modulo,
  'number.power': JWNumberTransformer.power,
  'number.negate': JWNumberTransformer.negate,
  'number.abs': JWNumberTransformer.abs,
  'number.round': JWNumberTransformer.round,
  'number.floor': JWNumberTransformer.floor,
  'number.ceil': JWNumberTransformer.ceil,
  'number.sqrt': JWNumberTransformer.sqrt,
  'number.max': JWNumberTransformer.max,
  'number.min': JWNumberTransformer.min,
  'number.to_int': JWNumberTransformer.to_int,
  'number.round_to_decimals': JWNumberTransformer.round_to_decimals,
  'number.to_string': JWNumberTransformer.to_string,
  'number.avg': JWNumberTransformer.avg,
  'number.from_string': JWNumberTransformer.from_string,

  /** Trasformatori stringa */
  'string.concat': JWStringTransformer.concat,
  'string.join': JWStringTransformer.join,
  'string.to_upper': JWStringTransformer.to_upper,
  'string.to_lower': JWStringTransformer.to_lower,
  'string.trim': JWStringTransformer.trim,
  'string.substring': JWStringTransformer.substring,
  'string.replace_one': JWStringTransformer.replace_one,
  'string.replace_all': JWStringTransformer.replace_all,
  'string.replace_regex': JWStringTransformer.replace_regex,
  'string.length': JWStringTransformer.get_length,
  'string.split': JWStringTransformer.split,


  /** Trasformatori array */
  'array.append': JWArrayTransformer.append,
  'array.flat': JWArrayTransformer.flat,
  'array.join_arrays': JWArrayTransformer.join_arrays,
  'array.prepend': JWArrayTransformer.prepend,
  'array.insert': JWArrayTransformer.insert,
  'array.reduce': JWArrayTransformer.reduce,
  'array.map': JWArrayTransformer.map,
  'array.filter': JWArrayTransformer.filter,
  'array.at': JWArrayTransformer.at,
  'array.get_length': JWArrayTransformer.get_length,


  /** Trasformatori date */
  'date.add': JWDateTransformer.add,
  'date.subtract': JWDateTransformer.subtract,
  'date.toLocaleString': JWDateTransformer.toLocaleString,
  'date.toISOString': JWDateTransformer.toISOString,
  'date.get_time': JWDateTransformer.get_time,
  'date.diff_from_now': JWDateTransformer.diff_from_now,
  'date.format': JWDateTransformer.format,
  'date.date_only': JWDateTransformer.date_only,



  'object.get_keys': JWObjectTransformer.get_keys,
  'object.get_values': JWObjectTransformer.get_values,
  'object.get_key': JWObjectTransformer.get_key,
  'object.set_key': JWObjectTransformer.set_key,
  'object.join': JWObjectTransformer.join,
}

export type TJWTransformerType = keyof typeof JWTransformersMap;


export interface ITransformer {
  type: 'transformer';
  path: TJWTransformerType;
}

export class JWTransformer {
  public static get(type: TJWTransformerType): (context: JWContext, ...args: any[]) => Promise<any> {
    const transformer = JWTransformersMap[type];
    if (!transformer)
      throw new JWOperationError(`Transformer with type ${type} not found.`);
    return transformer;
  }
}