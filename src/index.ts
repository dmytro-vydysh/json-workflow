/**
 * Public entrypoint for exported operation identifiers.
 *
 * These constants are used when building JSON-based condition and transformer
 * definitions that are later executed by the resolver.
 */
export * from "./Resolver";
export * from "./Resolver/assets";


/** Numeric transformer operation identifiers. */
export const __NUMBER_ADD__ = 'number.add';
export const __NUMBER_SUBSTRACT__ = 'number.substract';
export const __NUMBER_MULTIPLY__ = 'number.multiply';
export const __NUMBER_DIVIDE__ = 'number.divide';
export const __NUMBER_MODULO__ = 'number.modulo';
export const __NUMBER_POWER__ = 'number.power';
export const __NUMBER_NEGATE__ = 'number.negate';
export const __NUMBER_ABS__ = 'number.abs';
export const __NUMBER_ROUND__ = 'number.round';
export const __NUMBER_FLOOR__ = 'number.floor';
export const __NUMBER_CEIL__ = 'number.ceil';
export const __NUMBER_SQRT__ = 'number.sqrt';
export const __NUMBER_MAX__ = 'number.max';
export const __NUMBER_MIN__ = 'number.min';
export const __NUMBER_TO_INT__ = 'number.to_int';
export const __NUMBER_ROUND_TO_DECIMALS__ = 'number.round_to_decimals';
export const __NUMBER_TO_STRING__ = 'number.to_string';
export const __NUMBER_AVG__ = 'number.avg';
export const __NUMBER_FROM_STRING__ = 'number.from_string';

/** String transformer operation identifiers. */
export const __STRING_CONCAT__ = 'string.concat';
export const __STRING_JOIN__ = 'string.join';
export const __STRING_TO_UPPER__ = 'string.to_upper';
export const __STRING_TO_LOWER__ = 'string.to_lower';
export const __STRING_TRIM__ = 'string.trim';
export const __STRING_SUBSTRING__ = 'string.substring';
export const __STRING_REPLACE_ONE__ = 'string.replace_one';
export const __STRING_REPLACE_ALL__ = 'string.replace_all';
export const __STRING_REPLACE_REGEX__ = 'string.replace_regex';
export const __STRING_GET_LENGTH__ = 'string.length';
export const __STRING_SPLIT__ = 'string.split';

/** Array transformer operation identifiers. */
export const __ARRAY_APPEND__ = 'array.append';
export const __ARRAY_JOIN_ARRAYS__ = 'array.join_arrays';
export const __ARRAY_FLAT__ = 'array.flat';
export const __ARRAY_PREPEND__ = 'array.prepend';
export const __ARRAY_INSERT__ = 'array.insert';
export const __ARRAY_REDUCE__ = 'array.reduce';
export const __ARRAY_MAP__ = 'array.map';
export const __ARRAY_FILTER__ = 'array.filter';
export const __ARRAY_AT__ = 'array.at';
export const __ARRAY_GET_LENGTH__ = 'array.get_length';

/** Date transformer operation identifiers. */
export const __DATE_ADD__ = 'date.add';
export const __DATE_SUBTRACT__ = 'date.subtract';
export const __DATE_TOLOCALESTRING__ = 'date.toLocaleString';
export const __DATE_TOISOSTRING__ = 'date.toISOString';
export const __DATE_GET_TIME__ = 'date.get_time';
export const __DATE_DIFF_FROM_NOW__ = 'date.diff_from_now';


/**
 * All available date format tokens that can be used in the date.format transformer.
 * YYYY - full year
 * year_short - last two digits of the year
 * MM - month number, zero-padded
 * month_name - full month name
 * month_name_short - short month name
 * DD - day of the month, zero-padded
 * day_name - full day name
 * day_name_short - short day name
 * HH - hours, zero-padded
 * mm - minutes, zero-padded
 * ss - seconds, zero-padded
 */
export const __DATE_FORMAT__ = 'date.format';
export const __DATE_DATE_ONLY__ = 'date.date_only';

/** Object transformer operation identifiers. */
export const __OBJECT_GET_KEYS__ = 'object.get_keys';
export const __OBJECT_GET_VALUES__ = 'object.get_values';
export const __OBJECT_GET_KEY__ = 'object.get_key';
export const __OBJECT_SET_KEY__ = 'object.set_key';
export const __OBJECT_JOIN__ = 'object.join';


/** Numeric condition identifiers. */
export const __NUMBER_GT__ = 'number.gt';
export const __NUMBER_LT__ = 'number.lt';
export const __NUMBER_EQ__ = 'number.eq';
export const __NUMBER_NEQ__ = 'number.neq';
export const __NUMBER_GTE__ = 'number.gte';
export const __NUMBER_LTE__ = 'number.lte';
export const __NUMBER_BETWEEN__ = 'number.between';
export const __NUMBER_IS_NAN__ = 'number.is_nan';
export const __NUMBER_IS_NOT_NAN__ = 'number.is_not_nan';
export const __NUMBER_IS_INT__ = 'number.is_int';
export const __NUMBER_IS_FLOAT__ = 'number.is_float';
export const __NUMBER_IS_POSITIVE__ = 'number.is_positive';
export const __NUMBER_IS_NEGATIVE__ = 'number.is_negative';
export const __NUMBER_IS_EVEN__ = 'number.is_even';
export const __NUMBER_IS_ODD__ = 'number.is_odd';
export const __NUMBER_IS_NUMBER__ = 'number.is_number';
export const __NUMBER_IS_ZERO__ = 'number.is_zero';

/** String condition identifiers. */
export const __STRING_EQ__ = 'string.eq';
export const __STRING_NEQ__ = 'string.neq';
export const __STRING_CONTAINS__ = 'string.contains';
export const __STRING_NOT_CONTAINS__ = 'string.not_contains';
export const __STRING_STARTS_WITH__ = 'string.starts_with';
export const __STRING_NOT_STARTS_WITH__ = 'string.not_starts_with';
export const __STRING_ENDS_WITH__ = 'string.ends_with';
export const __STRING_NOT_ENDS_WITH__ = 'string.not_ends_with';
export const __STRING_MATCHES_REGEX__ = 'string.matches_regex';
export const __STRING_IS_STRING__ = 'string.is_string';
export const __STRING_IS_EMPTY__ = 'string.is_empty';
export const __STRING_IS_NOT_EMPTY__ = 'string.is_not_empty';

/** Array condition identifiers. */
export const __ARRAY_INCLUDES__ = 'array.includes';
export const __ARRAY_NOT_INCLUDES__ = 'array.not_includes';
export const __ARRAY_EVERY__ = 'array.every';
export const __ARRAY_SOME__ = 'array.some';
export const __ARRAY_IS_EMPTY__ = 'array.is_empty';
export const __ARRAY_IS_NOT_EMPTY__ = 'array.is_not_empty';

/** Object condition identifiers. */
export const __OBJECT_HAS_KEY__ = 'object.has_key';
export const __OBJECT_NOT_HAS_KEY__ = 'object.not_has_key';
export const __OBJECT_IS_EMPTY__ = 'object.is_empty';
export const __OBJECT_IS_NOT_EMPTY__ = 'object.is_not_empty';
export const __OBJECT_HAS_VALUE__ = 'object.has_value';
export const __OBJECT_SOME_VALUE__ = 'object.some_value';
export const __OBJECT_EVERY_VALUE__ = 'object.every_value';
export const __OBJECT_SOME_KEY__ = 'object.some_key';
export const __OBJECT_EVERY_KEY__ = 'object.every_key';

/** Date condition identifiers. */
export const __DATE_IS_BEFORE__ = 'date.is_before';
export const __DATE_IS_AFTER__ = 'date.is_after';
export const __DATE_IS_TODAY__ = 'date.is_today';

export const __DATE_IS_EQUAL_OR_BEFORE__ = 'date.is_equal_or_before';
export const __DATE_IS_EQUAL_OR_AFTER__ = 'date.is_equal_or_after';
export const __DATE_IS_EQUAL__ = 'date.is_equal';
export const __DATE_IS_PAST__ = 'date.is_past';
export const __DATE_IS_FUTURE__ = 'date.is_future';
export const __DATE_IS_WEEKEND__ = 'date.is_weekend';
export const __DATE_IS_WEEKDAY__ = 'date.is_weekday';
export const __DATE_IS_BETWEEN__ = 'date.is_between';
export const __DATE_IS_DAY_OF_WEEK__ = 'date.is_day_of_week';

/** Boolean condition identifiers. */
export const __BOOLEAN_IS_TRUE__ = 'boolean.is_true';
export const __BOOLEAN_IS_FALSE__ = 'boolean.is_false';


/** Shared static literal helpers for JSON operation payloads. */
export const __UNDEFINED__ = undefined;
export const __NULL__ = null;
export const __TRUE__ = true;
export const __FALSE__ = false;
export const __SECONDS__ = 'seconds';
export const __MINUTES__ = 'minutes';
export const __HOURS__ = 'hours';
export const __DAYS__ = 'days';
export const __MONTHS__ = 'months';
export const __YEARS__ = 'years';