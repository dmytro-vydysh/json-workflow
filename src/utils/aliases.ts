/**
 * This file defines string constants that serve as unique identifiers for various transformer 
 * operations and conditions in the JSON Workflow system. 
 * 
 * These identifiers are used to specify which transformation or condition should be applied to 
 * data within the workflow. By using string constants, we can avoid hardcoding strings 
 * throughout the codebase, making it easier to maintain and less error-prone when 
 * referencing these operations and conditions.
 */


/**
 * Transformer operation identifier for appending values to an array.
 * 
 * Equivalent to (array, element) => [...array, element].
 */
export const __ARRAY_APPEND__ = 'array.append';


/**
 * Transformer operation identifier for joining multiple arrays into one.
 * 
 * Equivalent to (array, ...arrays) => [...array, ...arrays.flat()].
 */
export const __ARRAY_JOIN_ARRAYS__ = 'array.join_arrays';

/**
 * Transformer operation identifier for flattening an array to a specified depth.
 * 
 * Equivalent to (array, depth) => array.flat(depth).
 */
export const __ARRAY_FLAT__ = 'array.flat';

/**
 * Transformer operation identifier for prepending values to an array.
 * 
 * Equivalent to (array, value) => [value, ...array].
 */
export const __ARRAY_PREPEND__ = 'array.prepend';

/**
 * Transformer operation identifier for inserting a value at a specific index in an array.
 * 
 * Equivalent to (array, index, value) => {
 *    const newArray = [...array];
 *    newArray.splice(index, 0, value);
 *    return newArray;
 * }
 */
export const __ARRAY_INSERT__ = 'array.insert';

/**
 * Transformer operation identifier for reducing an array using a specified reducer function.
 * 
 * Equivalent to (array, reducer, initialValue) => array.reduce((acc, item) => reducer(acc, item), initialValue).
 * 
 * Reducer is a JSON-Workflow operation, when the value will be passed as the item of array and the first argument to array.reduce will be the accumulator
 */
export const __ARRAY_REDUCE__ = 'array.reduce';

/**
 * Transformer operation identifier for mapping an array using a specified mapping function.
 * 
 * Equivalent to (array, mapper) => array.map((item) => mapper(item)).
 * 
 * Mapper is a JSON-Workflow operation in which the value will be automatically passed as the item of array.
 */
export const __ARRAY_MAP__ = 'array.map';

/**
 * Transformer operation identifier for filtering an array using a specified predicate function.
 * 
 * Equivalent to (array, predicate) => array.filter((item) => predicate(item)).
 * 
 * Predicate is a JSON-Workflow operation in which the value will be automatically passed as the item of array.
 */
export const __ARRAY_FILTER__ = 'array.filter';

/**
 * Transformer operation identifier for getting an element at a specific index in an array.
 * 
 * Equivalent to (array, index) => array[index].
 */
export const __ARRAY_AT__ = 'array.at';

/**
 * Transformer operation identifier for getting the length of an array.
 * 
 * Equivalent to (array) => array.length.
 */
export const __ARRAY_GET_LENGTH__ = 'array.get_length';

/**
 * Transformer operation identifier for finding the index of the first element in an array that satisfies a specified condition.
 * 
 * Equivalent to (array, condition) => array.findIndex((item) => condition(item)).
 * 
 * Condition is a JSON-Workflow operation in which the value will be automatically passed as the item of array.
 */
export const __ARRAY_FIND_INDEX__ = 'array.find_index';

/**
 * Transformer operation identifier for finding the first element in an array that satisfies a specified condition.
 * 
 * Equivalent to (array, condition) => {
 *    const index = array.findIndex((item) => condition(item));
 *    return index !== -1 ? array[index] : undefined;
 * }
 */
export const __ARRAY_FIND__ = 'array.find';


/**
 * Transformer operation identifier for sorting an array using a specified comparator function.
 * 
 * Equivalent to (number1, number2) => number1 + number2.
 */
export const __NUMBER_ADD__ = 'number.add';

/**
 * Transformer operation identifier for subtracting two numbers.
 * 
 * Equivalent to (number1, number2) => number1 - number2.
 */
export const __NUMBER_SUBTRACT__ = 'number.subtract';

/**
 * Transformer operation identifier for multiplying two numbers.
 * 
 * Equivalent to (number1, number2) => number1 * number2.
 */
export const __NUMBER_MULTIPLY__ = 'number.multiply';

/**
 * Transformer operation identifier for dividing two numbers.
 * 
 * Equivalent to (number1, number2) => number1 / number2.
 */
export const __NUMBER_DIVIDE__ = 'number.divide';

/**
 * Transformer operation identifier for calculating the remainder of dividing two numbers.
 * 
 * Equivalent to (number1, number2) => number1 % number2.
 */
export const __NUMBER_MODULO__ = 'number.modulo';

/**
 * Transformer operation identifier for raising a number to the power of another number.
 * 
 * Equivalent to (number1, number2) => Math.pow(number1, number2).
 */
export const __NUMBER_POWER__ = 'number.power';

/**
 * Transformer operation identifier for negating a number (flipping its sign).
 * 
 * Equivalent to (number) => -number.
 */
export const __NUMBER_NEGATE__ = 'number.negate';

/**
 * Transformer operation identifier for getting the absolute value of a number.
 * 
 * Equivalent to (number) => Math.abs(number).
 */
export const __NUMBER_ABS__ = 'number.abs';

/**
 * Transformer operation identifier for rounding a number to the nearest integer.
 * 
 * Equivalent to (number) => Math.round(number).
 */
export const __NUMBER_ROUND__ = 'number.round';

/**
 * Transformer operation identifier for rounding a number down to the nearest integer.
 * 
 * Equivalent to (number) => Math.floor(number).
 */
export const __NUMBER_FLOOR__ = 'number.floor';

/**
 * Transformer operation identifier for rounding a number up to the nearest integer.
 * 
 * Equivalent to (number) => Math.ceil(number).
 */
export const __NUMBER_CEIL__ = 'number.ceil';

/**
 * Transformer operation identifier for calculating the square root of a number.
 * 
 * Equivalent to (number) => Math.sqrt(number).
 */
export const __NUMBER_SQRT__ = 'number.sqrt';

/**
 * Transformer operation identifier for getting the maximum of a list of numbers.
 * 
 * Equivalent to (...numbers) => Math.max(...numbers).
 */
export const __NUMBER_MAX__ = 'number.max';

/**
 * Transformer operation identifier for getting the minimum of a list of numbers.
 * 
 * Equivalent to (...numbers) => Math.min(...numbers).
 */
export const __NUMBER_MIN__ = 'number.min';

/**
 * Transformer operation identifier for converting a number to an integer by truncating the decimal part.
 * 
 * Equivalent to (number) => Math.trunc(number).
 */
export const __NUMBER_TO_INT__ = 'number.to_int';

/**
 * Transformer operation identifier for rounding a number to a specified number of decimal places.
 * 
 * Equivalent to (number, decimals) => {
 *    const factor = Math.pow(10, decimals);
 *    return Math.round(number * factor) / factor;
 * }
 */
export const __NUMBER_ROUND_TO_DECIMALS__ = 'number.round_to_decimals';

/**
 * Transformer operation identifier for converting a number to a string.
 * 
 * Equivalent to (number) => number.toString().
 */
export const __NUMBER_TO_STRING__ = 'number.to_string';

/**
 * Transformer operation identifier for calculating the average of a list of numbers.
 * 
 * Equivalent to (numbers) => numbers.reduce((acc, num) => acc + num, 0) / numbers.length.
 */
export const __NUMBER_AVG__ = 'number.avg';

/**
 * Transformer operation identifier for parsing a string and converting it to a number.
 * 
 * Equivalent to (string) => Number(string).
 */
export const __NUMBER_FROM_STRING__ = 'number.from_string';



/**
 * Transformer operation identifier for concatenating multiple strings into one.
 * It will automatically eliminate any undefined or null values from the input.
 * 
 * Equivalent to (...strings) => strings.join('').
 */
export const __STRING_CONCAT__ = 'string.concat';

/**
 * Transformer operation identifier for joining an array of strings using a specified separator.
 * 
 * Equivalent to (strings, separator) => strings.join(separator).
 */
export const __STRING_JOIN__ = 'string.join';

/**
 * Transformer operation identifier for converting a string to uppercase.
 * 
 * Equivalent to (str) => str.toUpperCase().
 */
export const __STRING_TO_UPPER__ = 'string.to_upper';

/**
 * Transformer operation identifier for converting a string to lowercase.
 * 
 * Equivalent to (str) => str.toLowerCase().
 */
export const __STRING_TO_LOWER__ = 'string.to_lower';

/**
 * Transformer operation identifier for trimming leading and trailing whitespace from a string.
 * 
 * Equivalent to (str) => str.trim().
 */
export const __STRING_TRIM__ = 'string.trim';

/**
 * Transformer operation identifier for getting a substring from a string using specified start and optional end indices.
 * 
 * Equivalent to (str, start, end?) => str.substring(start, end).
 */
export const __STRING_SUBSTRING__ = 'string.substring';

/**
 * Transformer operation identifier for replacing the first occurrence of a substring in a string with a new value.
 * 
 * Equivalent to (str, searchValue, replaceValue) => str.replace(searchValue, replaceValue).
 */
export const __STRING_REPLACE_ONE__ = 'string.replace_one';

/**
 * Transformer operation identifier for replacing all occurrences of a substring in a string with a new value, without using regular expressions.
 * 
 * Equivalent to (str, searchValue, replaceValue) => str.split(searchValue).join(replaceValue).
 */
export const __STRING_REPLACE_ALL__ = 'string.replace_all';

/**
 * Transformer operation identifier for replacing matches in a string using a regular expression pattern.
 * 
 * Equivalent to (str, regex, replaceValue) => str.replace(regex, replaceValue).
 */
export const __STRING_REPLACE_REGEX__ = 'string.replace_regex';

/**
 * Transformer operation identifier for getting the length of a string.
 * 
 * Equivalent to (str) => str.length.
 */
export const __STRING_GET_LENGTH__ = 'string.length';

/**
 * Transformer operation identifier for splitting a string into an array of substrings using a specified separator.
 * 
 * Equivalent to (str, separator) => str.split(separator).
 */
export const __STRING_SPLIT__ = 'string.split';


/**
 * Transformer operation identifier for adding a specified amount of time to a date.
 * 
 * Equivalent to (date, amount, unit: 'seconds' | 'minutes' | 'hours' | 'days' | 'months' | 'years') => calculatedDate
 */
export const __DATE_ADD__ = 'date.add';

/**
 * Transformer operation identifier for subtracting a specified amount of time from a date.
 * 
 * Equivalent to (date, amount, unit: 'seconds' | 'minutes' | 'hours' | 'days' | 'months' | 'years') => calculatedDate
 */
export const __DATE_SUBTRACT__ = 'date.subtract';

/**
 * Transformer operation identifier for formatting a date using a specified format string.
 * 
 * Equivalent to (date, locale) => new Date(date).toLocaleString(locale)
 * 
 */
export const __DATE_TOLOCALESTRING__ = 'date.toLocaleString';

/**
 * Transformer operation identifier for converting a date to an ISO-8601 string.
 * 
 * Equivalent to (date) => new Date(date).toISOString().
 */
export const __DATE_TOISOSTRING__ = 'date.toISOString';

/**
 * Transformer operation identifier for getting the time value of a date as the number of milliseconds since the Unix epoch.
 * 
 * Equivalent to (date) => new Date(date).getTime().
 */
export const __DATE_GET_TIME__ = 'date.get_time';

/**
 * Transformer operation identifier for calculating the difference between a date and the current date
 * 
 * Equivalent to (date, unit: 'seconds' | 'minutes' | 'hours' | 'days' | 'months' | 'years') => difference
 */
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

/**
 * Transformer operation identifier for extracting the date part (year, month, day) from a Date object, effectively setting the time to 00:00:00.
 * 
 * Equivalent to (date) => new Date(date.getFullYear(), date.getMonth(), date.getDate()).
 */
export const __DATE_DATE_ONLY__ = 'date.date_only';

/**
 * Transformer that returns all keys of an object as an array.
 * 
 * Equivalent to (obj) => Object.keys(obj).
 */
export const __OBJECT_GET_KEYS__ = 'object.get_keys';

/**
 * Transformer that returns all values of an object as an array.
 * 
 * Equivalent to (obj) => Object.values(obj).
 */
export const __OBJECT_GET_VALUES__ = 'object.get_values';

/**
 * Transformer that returns the value of a specific key in an object, throwing an error if the key does not exist.
 * 
 * Equivalent to (obj, key) => obj[key] 
 */
export const __OBJECT_GET_KEY__ = 'object.get_key';

/**
 * Transformer that returns a new object with a specific key set to a given value, without modifying the original object.
 * 
 * Equivalent to (obj, key, value) => ({ ...obj, [key]: value })
 */
export const __OBJECT_SET_KEY__ = 'object.set_key';

/**
 * Transformer that merges two objects into one, with the second object overriding any duplicate keys from the first object.
 * 
 * Equivalent to (obj1, obj2) => ({ ...obj1, ...obj2 })
 */
export const __OBJECT_JOIN__ = 'object.join';

/**
 * Transformer operation identifier for retrieving a value from the workflow context by key, throwing an error if the key is not found.
 * 
 * Equivalent to (key) => PipelineContext[key]
 */
export const __CONTEXT_GET_KEY__ = 'context.get_key';

/**
 * Transformer operation identifier for setting a value in the workflow context by key, returning the value that was set.
 */
export const __CONTEXT_SET_KEY__ = 'context.set_key';


/**
 * Condition identifier for checking if a number is greater than another number.
 * 
 * Equivalent to (number, threshold) => number > threshold.
 */
export const __NUMBER_GT__ = 'number.gt';

/**
 * Condition identifier for checking if a number is less than another number.
 * 
 * Equivalent to (number, threshold) => number < threshold.
 */
export const __NUMBER_LT__ = 'number.lt';

/**
 * Condition identifier for checking if a number is equal to another number.
 * 
 * Equivalent to (number, target) => number === target.
 */
export const __NUMBER_EQ__ = 'number.eq';

/**
 * Condition identifier for checking if a number is not equal to another number.
 * 
 * Equivalent to (number, target) => number !== target.
 */
export const __NUMBER_NEQ__ = 'number.neq';

/**
 * Condition identifier for checking if a number is greater than or equal to another number.
 * 
 * Equivalent to (number, threshold) => number >= threshold.
 */
export const __NUMBER_GTE__ = 'number.gte';

/**
 * Condition identifier for checking if a number is less than or equal to another number.
 * 
 * Equivalent to (number, threshold) => number <= threshold.
 */
export const __NUMBER_LTE__ = 'number.lte';

/**
 * Condition identifier for checking if a number is between two other numbers (inclusive).
 * 
 * Equivalent to (number, min, max) => number >= min && number <= max.
 */
export const __NUMBER_BETWEEN__ = 'number.between';

/**
 * Condition identifier for checking if a number is NaN (Not a Number).
 * 
 * Equivalent to (number) => isNaN(Number(number)).
 */
export const __NUMBER_IS_NAN__ = 'number.is_nan';

/**
 * Condition identifier for checking if a number is not NaN (Not a Number).
 * 
 * Equivalent to (number) => !isNaN(Number(number)).
 */
export const __NUMBER_IS_NOT_NAN__ = 'number.is_not_nan';

/**
 * Condition identifier for checking if a number is an integer.
 * 
 * Equivalent to (number) => Number.isInteger(number).
 */
export const __NUMBER_IS_INT__ = 'number.is_int';

/**
 * Condition identifier for checking if a number is a floating-point number (not an integer).
 * 
 * Equivalent to (number) => !Number.isInteger(number).
 */
export const __NUMBER_IS_FLOAT__ = 'number.is_float';

/**
 * Condition identifier for checking if a number is greater than zero.
 * 
 * Equivalent to (number) => number > 0.
 */
export const __NUMBER_IS_POSITIVE__ = 'number.is_positive';

/**
 * Condition identifier for checking if a number is equal to zero.
 * 
 * Equivalent to (number) => number === 0.
 */
export const __NUMBER_IS_NEGATIVE__ = 'number.is_negative';

/**
 * Condition identifier for checking if a number is even.
 * 
 * Equivalent to (number) => number % 2 === 0.
 */
export const __NUMBER_IS_EVEN__ = 'number.is_even';

/**
 * Condition identifier for checking if a number is odd.
 * 
 * Equivalent to (number) => number % 2 !== 0.
 */
export const __NUMBER_IS_ODD__ = 'number.is_odd';

/**
 * Condition identifier for checking if a value is a number (not NaN).
 * 
 * Equivalent to (number) => typeof number === 'number' && !isNaN(number).
 */
export const __NUMBER_IS_NUMBER__ = 'number.is_number';

/**
 * Condition identifier for checking if a number is zero.
 * 
 * Equivalent to (number) => number === 0.
 */
export const __NUMBER_IS_ZERO__ = 'number.is_zero';



/**
 * Condition identifier for checking if a string is equal to another string.
 * 
 * Equivalent to (str, target) => str === target.
 */
export const __STRING_EQ__ = 'string.eq';

/**
 * Condition identifier for checking if a string is not equal to another string.
 * 
 * Equivalent to (str, target) => str !== target.
 */
export const __STRING_NEQ__ = 'string.neq';

/**
 * Condition identifier for checking if a string contains a specified substring.
 * 
 * Equivalent to (str, substring) => str.includes(substring).
 */
export const __STRING_CONTAINS__ = 'string.contains';

/**
 * Condition identifier for checking if a string does not contain a specified substring.
 * 
 * Equivalent to (str, substring) => !str.includes(substring).
 */
export const __STRING_NOT_CONTAINS__ = 'string.not_contains';

/**
 * Condition identifier for checking if a string starts with a specified substring.
 * 
 * Equivalent to (str, prefix) => str.startsWith(prefix).
 */
export const __STRING_STARTS_WITH__ = 'string.starts_with';

/**
 * Condition identifier for checking if a string does not start with a specified substring.
 * 
 * Equivalent to (str, prefix) => !str.startsWith(prefix).
 */
export const __STRING_NOT_STARTS_WITH__ = 'string.not_starts_with';

/**
 * Condition identifier for checking if a string ends with a specified substring.
 * 
 * Equivalent to (str, suffix) => str.endsWith(suffix).
 */
export const __STRING_ENDS_WITH__ = 'string.ends_with';

/**
 * Condition identifier for checking if a string does not end with a specified substring.
 * 
 * Equivalent to (str, suffix) => !str.endsWith(suffix).
 */
export const __STRING_NOT_ENDS_WITH__ = 'string.not_ends_with';

/**
 * Condition identifier for checking if a string matches a specified regular expression pattern.
 * 
 * Equivalent to (str, regex) => new RegExp(regex).test(str).
 */
export const __STRING_MATCHES_REGEX__ = 'string.matches_regex';

/**
 * Condition identifier for checking if a value is a string.
 * 
 * Equivalent to (str) => typeof str === 'string'.
 */
export const __STRING_IS_STRING__ = 'string.is_string';

/**
 * Condition identifier for checking if a string is empty (has a length of zero).
 * 
 * Equivalent to (str) => str.length === 0.
 */
export const __STRING_IS_EMPTY__ = 'string.is_empty';

/**
 * Condition identifier for checking if a string is not empty (has a length greater than zero).
 * 
 * Equivalent to (str) => str.length > 0.
 */
export const __STRING_IS_NOT_EMPTY__ = 'string.is_not_empty';


/**
 * Condition identifier for checking if an array includes a specified element.
 * It only works for arrays of primitive values (string, number, boolean, null, undefined). If the array contains objects, it will throw an error. For arrays of objects, use the "some" or "every" conditions with a operation that checks for the desired properties.
 * 
 * Equivalent to (array, value) => array.includes(value).
 */
export const __ARRAY_INCLUDES__ = 'array.includes';

/**
 * Condition identifier for checking if an array does not include a specified element.
 * It only works for arrays of primitive values (string, number, boolean, null, undefined). If the array contains objects, it will throw an error. For arrays of objects, use the "some" or "every" conditions with a operation that checks for the desired properties.
 * 
 * Equivalent to (array, value) => !array.includes(value).
 */
export const __ARRAY_NOT_INCLUDES__ = 'array.not_includes';

/**
 * Condition identifier for checking if every element in an array satisfies a specified condition.
 * 
 * Equivalent to (array, condition) => array.every((item, index, arrayRef) => condition(item, index, arrayRef)).
 * 
 * Condition is a JSON-Workflow operation in which the value will be automatically passed as the item of array, and the arguments will be the index and the reference to the entire array.
 */
export const __ARRAY_EVERY__ = 'array.every';

/**
 * Condition identifier for checking if at least one element in an array satisfies a specified condition.
 * 
 * Equivalent to (array, condition) => array.some((item, index, arrayRef) => condition(item, index, arrayRef)).
 * 
 * Condition is a JSON-Workflow operation in which the value will be automatically passed as the item of array, and the arguments will be the index and the reference to the entire array.
 */
export const __ARRAY_SOME__ = 'array.some';

/**
 * Condition identifier for checking if an array is empty (has a length of zero).
 * 
 * Equivalent to (array) => array.length === 0.
 */
export const __ARRAY_IS_EMPTY__ = 'array.is_empty';

/**
 * Condition identifier for checking if an array is not empty (has a length greater than zero).
 * 
 * Equivalent to (array) => array.length > 0.
 */
export const __ARRAY_IS_NOT_EMPTY__ = 'array.is_not_empty';


/**
 * Condition identifier for checking if an object has a specific key.
 * 
 * Equivalent to (obj, key) => key in obj.
 */
export const __OBJECT_HAS_KEY__ = 'object.has_key';

/**
 * Condition identifier for checking if an object does not have a specific key.
 * 
 * Equivalent to (obj, key) => !(key in obj).
 */
export const __OBJECT_NOT_HAS_KEY__ = 'object.not_has_key';

/**
 * Condition identifier for checking if an object has a specific value among its values.
 * 
 * Equivalent to (obj, value) => Object.values(obj).includes(value).
 */
export const __OBJECT_HAS_VALUE__ = 'object.has_value';

/**
 * Condition identifier for checking if an object is empty (has no own enumerable properties).
 * 
 * Equivalent to (obj) => Object.keys(obj).length === 0.
 */
export const __OBJECT_IS_EMPTY__ = 'object.is_empty';

/**
 * Condition identifier for checking if an object is not empty (has at least one own enumerable property).
 * 
 * Equivalent to (obj) => Object.keys(obj).length > 0.
 */
export const __OBJECT_IS_NOT_EMPTY__ = 'object.is_not_empty';


/**
 * Condition identifier for checking if at least one value in an object satisfies a specified condition.
 * 
 * Equivalent to (obj, condition) => Object.values(obj).some((value) => condition(value)).
 * 
 * Condition is a JSON-Workflow operation in which the value will be automatically passed as the value of object property.
 */
export const __OBJECT_SOME_VALUE__ = 'object.some_value';

/**
 * Condition identifier for checking if every value in an object satisfies a specified condition.
 * 
 * Equivalent to (obj, condition) => Object.values(obj).every((value) => condition(value)).
 */
export const __OBJECT_EVERY_VALUE__ = 'object.every_value';

/**
 * Condition identifier for checking if at least one key in an object satisfies a specified condition.
 * 
 * Equivalent to (obj, condition) => Object.keys(obj).some((key) => condition(key)).
 * 
 * Condition is a JSON-Workflow operation in which the value will be automatically passed as the key of object property.
 */
export const __OBJECT_SOME_KEY__ = 'object.some_key';

/**
 * Condition identifier for checking if every key in an object satisfies a specified condition.
 * 
 * Equivalent to (obj, condition) => Object.keys(obj).every((key) => condition(key)).
 */
export const __OBJECT_EVERY_KEY__ = 'object.every_key';



/**
 * Condition identifier for checking if a date is before another date.
 * 
 * Equivalent to (date, targetDate) => new Date(date) < new Date(targetDate).
 */
export const __DATE_IS_BEFORE__ = 'date.is_before';

/**
 * Condition identifier for checking if a date is after another date.
 * 
 * Equivalent to (date, targetDate) => new Date(date) > new Date(targetDate).
 */
export const __DATE_IS_AFTER__ = 'date.is_after';

/**
 * Condition identifier for checking if a date is today (has the same year, month, and day as the current date).
 */
export const __DATE_IS_TODAY__ = 'date.is_today';


/**
 * Condition identifier for checking if a date is equal to or before another date.
 */
export const __DATE_IS_EQUAL_OR_BEFORE__ = 'date.is_equal_or_before';

/**
 * Condition identifier for checking if a date is equal to or after another date.
 */
export const __DATE_IS_EQUAL_OR_AFTER__ = 'date.is_equal_or_after';

/**
 * Condition identifier for checking if a date is equal to another date (has the same year, month, day, hour, minute, second, and millisecond).
 * 
 * Equivalent to (date, targetDate) => new Date(date).getTime() === new Date(targetDate).getTime().
 */
export const __DATE_IS_EQUAL__ = 'date.is_equal';

/**
 * Condition identifier for checking if a date is past (before the current date and time).
 */
export const __DATE_IS_PAST__ = 'date.is_past';

/**
 * Condition identifier for checking if a date is in the future (after the current date and time).
 * 
 * Equivalent to (date) => new Date(date) > new Date().
 */
export const __DATE_IS_FUTURE__ = 'date.is_future';

/**
 * Condition identifier for checking if a date falls on a weekend (Saturday or Sunday).
 */
export const __DATE_IS_WEEKEND__ = 'date.is_weekend';

/**
 * Condition identifier for checking if a date falls on a weekday (Monday to Friday).
 */
export const __DATE_IS_WEEKDAY__ = 'date.is_weekday';

/**
 * Condition identifier for checking if a date is between two other dates (inclusive).
 */
export const __DATE_IS_BETWEEN__ = 'date.is_between';

/**
 * Condition identifier for checking if a date falls on a specific day of the week (0 for Sunday, 1 for Monday, ..., 6 for Saturday).
 */
export const __DATE_IS_DAY_OF_WEEK__ = 'date.is_day_of_week';


/**
 * Condition identifier for checking if a boolean value is true.
 * 
 * Equivalent to (value) => value === true.
 */
export const __BOOLEAN_IS_TRUE__ = 'boolean.is_true';

/**
 * Condition identifier for checking if a boolean value is false.
 * 
 * Equivalent to (value) => value === false.
 */
export const __BOOLEAN_IS_FALSE__ = 'boolean.is_false';


/**
 * Condition identifier for checking if a value exists in the workflow context by key (i.e., the key is present and its value is not undefined).
 */
export const __CONTEXT_HAS_KEY__ = 'context.has_key';

/**
 * An alias for the JavaScript value `undefined`, used to represent the absence of a value in a more explicit way within the JSON Workflow system. This can be useful for transformers and conditions that need to check for or return an undefined value without ambiguity.
 */
export const __UNDEFINED__ = undefined;

/**
 * An alias for the JavaScript value `null`, used to represent the intentional absence of any object value in a more explicit way within the JSON Workflow system. This can be useful for transformers and conditions that need to check for or return a null value without ambiguity.
 */
export const __NULL__ = null;

/**
 * An alias for the boolean value `true`, used to represent a true condition in a more explicit way within the JSON Workflow system. This can be useful for transformers and conditions that need to check for or return a true value without ambiguity.
 */
export const __TRUE__ = true;

/**
 * An alias for the boolean value `false`, used to represent a false condition in a more explicit way within the JSON Workflow system. This can be useful for transformers and conditions that need to check for or return a false value without ambiguity.
 */
export const __FALSE__ = false;

/**
 * String constant representing the unit of time "seconds", used in date manipulation transformers and conditions to specify that the amount of time being added, subtracted, or compared is in seconds.
 */
export const __SECONDS__ = 'seconds';

/**
 * String constant representing the unit of time "minutes", used in date manipulation transformers and conditions to specify that the amount of time being added, subtracted, or compared is in minutes.
 */
export const __MINUTES__ = 'minutes';

/**
 * String constant representing the unit of time "hours", used in date manipulation transformers and conditions to specify that the amount of time being added, subtracted, or compared is in hours.
 */
export const __HOURS__ = 'hours';

/**
 * String constant representing the unit of time "days", used in date manipulation transformers and conditions to specify that the amount of time being added, subtracted, or compared is in days.
 */
export const __DAYS__ = 'days';

/**
 * String constant representing the unit of time "months", used in date manipulation transformers and conditions to specify that the amount of time being added, subtracted, or compared is in months.
 */
export const __MONTHS__ = 'months';

/**
 * String constant representing the unit of time "years", used in date manipulation transformers and conditions to specify that the amount of time being added, subtracted, or compared is in years.
 */
export const __YEARS__ = 'years';