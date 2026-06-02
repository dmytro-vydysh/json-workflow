import { JWCondition } from '../Condition';
import { JWTransformer } from '../Transformer';
import { JWOperationError } from '../Error';
import {
  type TResolverOperationTypeCondition,
  type TResolverOperationTypeTransformer,
  type TResolverOperationTypeConditionGroupOperatorAnd,
  type TResolverOperationTypeConditionGroupOperatorOr,
  type TResolverOperationTypeSwitch,
  type TStatic,
  type TResolver,
  type TOperation,
  type TCallback,
  type TValue,
  type TArgumentType,
  type IResolverOperationCondition,
  type IResolverOperationTransformer,
  type IResolverConditionalOperation,
  type IResolverOperationConditionAnd,
  type IResolverOperationConditionOr,
  type IResolverOperationSwitch,
  type TResolverOperationTypeConditional,
  type TOperationType,
  type JWContext,
  type TContext,
  type TOperationTypeList,
  type TAnd,
  type TArgs,
  type TCase,
  type TCondition,
  type TConditional,
  type TDefault,
  type TElse,
  type TIf,
  type TOr,
  type TPipeline,
  type TSwitch,
  type TThen,
  type TTransformer,
  type TJWRootContext,
  __STATIC__,
  __RESOLVER__,
  __OPERATION__,
  __CALLBACK__,
  __CONTEXT__,
  __ARGS__,
  __CONDITION__,
  __TRANSFORMER__,
  __CONDITIONAL__,
  __IF__,
  __THEN__,
  __ELSE__,
  __AND__,
  __OR__,
  __CASE__,
  __SWITCH__,
  __DEFAULT__,
  __PIPELINE__,
  __JWROOT__,
  Operations,
  type TOperationTypeKey,
  Values,
  type TValueTypeKey,
  ArgumentTypes,
  type TArgumentTypeKey,
  IResolverOperationSwitchCase,
  IResolverOperationResolver,
  TArgumentTypeCallback,
  IResolverOperationTransformerCallback
} from './assets';








/** Entry point for resolving JSON-defined condition and transformer trees. */
export class JWResolver {

  /**
   * Map to store custom resolvers registered by users. The key is the resolver name, and the value is the resolver function.
   */
  private static MCustomResolvers: Map<string, (...args: any[]) => any | Promise<any>> = new Map();


  /**
   * Registers a custom resolver function with a given name.
   * @param name - The name of the resolver.
   * @param resolverFn - The resolver function to register.
   */
  public static registerResolver(name: string, resolverFn: (...args: any[]) => any | Promise<any>): void {
    if (this.MCustomResolvers.has(name))
      throw new JWOperationError(`Resolver with name "${name}" is already registered.`);
    this.MCustomResolvers.set(name, resolverFn);
  }

  /**
   * 
   * @param context the context to read
   * @param key the key of the value
   * @returns the value from context, or undefined if key is not found. If key is "$jwcontext", returns the entire context.
   */
  public static readContextValue(context: JWContext, key: string | '$jwcontext'): any {
    if (key === __JWROOT__)
      return context;

    /** If there is a missing context key, emit a warning, but still return undefined */
    if (!context.has(key))
      process.emitWarning(`Context key "${key}" not found. `, { code: 'JWResolverContextKeyNotFound' });

    return context.get(key);
  }


  public static getResolver(name: string): ((...args: any[]) => any | Promise<any>) | undefined {

    return this.MCustomResolvers.get(name);
  }


  /** Removes a previously registered custom resolver. */
  public static removeResolver(name: string): boolean {
    return this.MCustomResolvers.delete(name);
  }


  /**
   * 
   * @param operation operation to launch
   * @param forcedvalue force a start value if you need (used by array.map/array.filter to set the item of array as the value.type = static, value.value = item)
   * @param forcedArgs force args if you need (used by array.reduce to set the accumulated value as an argument for the next operation)
   * @returns 
   */
  public static async run<T extends any>(operation: TOperationType, forcedvalue?: TValue, forcedArgs?: TArgumentType[]): Promise<T> {
    return await JWResolver.resolve(new Map<string, any>(), operation, forcedvalue, forcedArgs);
  }

  /**
   * 
   * @param operationList list of operations to be done
   * @returns the context (resulting from running the operation list)
   * @description it runs all operations in sequence, and returns the final context. This is useful when you want to run multiple operations and then inspect the context for the results, instead of relying on the return value of a single operation.
   */
  public static async runSequence(operationList: TOperationTypeList, context?: JWContext): Promise<Record<string, any>> {
    if (!context)
      context = new Map<string, any>();

    for (const operation of operationList)
      await JWResolver.resolve(context, operation);

    return Object.fromEntries(context);
  }

  private static overwriteValue(operation: TOperationType, value: TValue): void {
    if (__TRANSFORMER__ in operation)
      operation[__TRANSFORMER__].value = value;

    if (__CONDITION__ in operation)
      operation[__CONDITION__].value = value;

    if (__AND__ in operation)
      operation[__AND__].operations.forEach(op => JWResolver.overwriteValue(op, value));

    if (__OR__ in operation)
      operation[__OR__].operations.forEach(op => JWResolver.overwriteValue(op, value));

    if (__SWITCH__ in operation)
      operation[__SWITCH__].value = value;

    if (__CONDITIONAL__ in operation)
      JWResolver.overwriteValue(operation[__CONDITIONAL__].$if, value)
  }

  private static overwriteArgs(operation: TOperationType, args: TArgumentType[]): void {
    if (__TRANSFORMER__ in operation)
      operation[__TRANSFORMER__].arguments = args;

    if (__CONDITION__ in operation)
      operation[__CONDITION__].arguments = args;

    if (__AND__ in operation)
      operation[__AND__].operations.forEach(op => JWResolver.overwriteArgs(op, args));

    if (__OR__ in operation)
      operation[__OR__].operations.forEach(op => JWResolver.overwriteArgs(op, args));


  }


  /** 
   * Dispatches an operation node to the concrete resolver for its type. 
   *
   * @param context the context to resolve the operation against. Can be undefined when launching a top-level operation, in which case an empty context will be used. For nested operations, the context from the parent operation will be passed down, allowing for state sharing across the operation tree.
   * @param operation operation to launch
   * @param forcedvalue force a start value if you need (used by array.map/array.filter to set the item of array as the value.type = static, value.value = item)
   * @param forcedArgs force args if you need (used by array.reduce to set the accumulated value as an argument for the next operation)
   * @returns 
   */
  public static async resolve<T extends any>(context: JWContext | undefined, operation: TOperationType, forcedvalue?: TValue, forcedArgs?: TArgumentType[]): Promise<T> {
    if (typeof context === 'undefined')
      context = new Map<string, any>();

    if (Object.keys(operation).length !== 1)
      throw new JWOperationError(`Operation must have exactly one key indicating its type. Found keys: ${Object.keys(operation).join(', ')}`);

    const operationTypeKey = Object.keys(operation)[0] as keyof typeof operation;

    if (!(Operations.includes(operationTypeKey)))
      throw new JWOperationError(`Invalid operation "${operationTypeKey}". Operation must be one of: ${Operations.join(', ')}`);

    if (forcedvalue)
      JWResolver.overwriteValue(operation, forcedvalue);

    if (forcedArgs)
      JWResolver.overwriteArgs(operation, forcedArgs);

    return await JWResolver.resolveOperationType(context, operation);
  }

  private static async resolveOperationType<T extends any>(context: JWContext, operation: TOperationType): Promise<T> {
    if (__CONDITION__ in operation)
      return await OperationConditionResolver.resolve<T>(context, operation.$condition);

    if (__TRANSFORMER__ in operation)
      return await OperationTransformerResolver.resolve<T>(context, operation.$transformer);

    if (__AND__ in operation)
      return await OperationConditionANDResolver.resolve<T>(context, operation.$and);

    if (__OR__ in operation)
      return await OperationConditionORResolver.resolve<T>(context, operation.$or);

    if (__SWITCH__ in operation)
      return await OperationSwitchResolver.resolve<T>(context, operation.$switch);

    if (__CONDITIONAL__ in operation)
      return await OperationConditionalResolver.resolve<T>(context, operation.$conditional);

    if (__PIPELINE__ in operation)
      return await JWResolver.runSequence(operation.$pipeline, context) as unknown as T;

    if (__RESOLVER__ in operation)
      return await OperationResolverResolver.resolve<T>(context, operation.$resolver);

    throw new JWOperationError(`Invalid operation type "${(operation as any).type}".`);
  }
}

/** Resolves the value and arguments consumed by resolver operations. */
export class OperationValueResolver {


  /** Resolves a value descriptor into the runtime value it represents. */
  public static async resolveValue(context: JWContext, value: TValue, valueTransformer?: IResolverOperationTransformerCallback): Promise<any> {

    if (Object.keys(value).length !== 1)
      throw new JWOperationError(`Value descriptor must have exactly one key indicating its type. Found keys: ${Object.keys(value).join(', ')}`);

    if (!(Values.includes(Object.keys(value)[0] as keyof typeof value)))
      throw new JWOperationError(`Invalid value type "${Object.keys(value)[0]}". Value must be one of: ${Values.join(', ')}`);

    let resolvedValue: any;

    if (__STATIC__ in value)
      resolvedValue = value.$static;

    else if (__RESOLVER__ in value) {

      const resolver = JWResolver.getResolver(value.$resolver);
      if (!resolver) throw new JWOperationError(`Custom resolver "${value.$resolver}" not found.`);

      const args = value.$args ? await OperationValueResolver.resolveArguments(context, value.$args) : [];

      resolvedValue = await resolver(...args);
    }

    else if (__OPERATION__ in value)
      resolvedValue = await JWResolver.resolve(context, value.$operation);

    else if (__CONTEXT__ in value)
      resolvedValue = JWResolver.readContextValue(context, value.$context);
    else
      throw new JWOperationError(`Invalid value "${JSON.stringify(value)}".`);

    if (valueTransformer) {

      const operation = { $transformer: { ...valueTransformer.$transformer, value: { $static: resolvedValue } } } as IResolverOperationTransformer;
      resolvedValue = await JWResolver.resolve(context, operation);
    }


    return resolvedValue as any;



  }

  /** Resolves a single argument descriptor into a runtime argument. */
  public static async resolveArgument(context: JWContext, argument: TArgumentType): Promise<any> {

    if (Object.keys(argument).length !== 1)
      throw new JWOperationError(`Argument descriptor must have exactly one key indicating its type. Found keys: ${Object.keys(argument).join(', ')}`);

    if (!(ArgumentTypes.includes(Object.keys(argument)[0] as keyof typeof argument)))
      throw new JWOperationError(`Invalid argument type "${Object.keys(argument)[0]}". Argument must be one of: ${ArgumentTypes.join(', ')}`);

    if (__CALLBACK__ in argument)
      return argument.$callback;

    if (__OPERATION__ in argument)
      return await JWResolver.resolve(context, argument.$operation);

    if (__RESOLVER__ in argument) {
      const resolver = JWResolver.getResolver(argument.$resolver);

      if (!resolver) throw new JWOperationError(`Custom resolver "${argument.$resolver}" not found.`);
      const args = argument.$args ? await OperationValueResolver.resolveArguments(context, argument.$args) : [];

      return await resolver(...args);
    }

    if (__STATIC__ in argument)
      return argument.$static;

    if (__CONTEXT__ in argument)
      return JWResolver.readContextValue(context, argument.$context);

    throw new JWOperationError(`Invalid argument "${JSON.stringify(argument)}".`);
  }

  /** Resolves all argument descriptors in parallel. */
  public static async resolveArguments(context: JWContext, args: TArgumentType[]): Promise<any[]> {
    return Promise.all(args.map(arg => this.resolveArgument(context, arg)));
  }
}

/** Executes a single condition operation. */
export class OperationConditionResolver {

  /** Executes a single condition operation, saves it (optional) and returns the result */
  public static async resolve<T extends any>(context: JWContext, condition: IResolverOperationCondition['$condition']): Promise<T> {

    const conditionFN = JWCondition.get(condition.name);

    const value = await OperationValueResolver.resolveValue(context, condition.value, condition.valueTransformer);

    const args = condition.arguments ? await OperationValueResolver.resolveArguments(context, condition.arguments) : [];

    const conditionResult = await conditionFN(context, value, ...args) as unknown as T;

    const expectedResult = condition.expectedResult ?? true;

    const conditionMet = conditionResult === expectedResult;

    if (condition.save && typeof condition.save === 'string')
      context.set(condition.save, conditionMet);

    return conditionMet as unknown as T;
  }
}

/** Executes a single transformer operation, saves it (optional) and returns the result */
export class OperationTransformerResolver {

  /** Executes a transformation function, saves it (optional) and returns the result */
  public static async resolve<T extends any>(context: JWContext, transformer: IResolverOperationTransformer['$transformer']): Promise<T> {

    const transformerFN = JWTransformer.get(transformer.name);

    const value = await OperationValueResolver.resolveValue(context, transformer.value, transformer.valueTransformer);

    const args = transformer.arguments ? await OperationValueResolver.resolveArguments(context, transformer.arguments) : [];

    const transformationResult = await transformerFN(context, value, ...args) as unknown as T;

    if (transformer.save && typeof transformer.save === 'string')
      context.set(transformer.save, transformationResult);

    return transformationResult;
  }
}

/** Executes a single OR condition operation. */
export class OperationConditionORResolver {

  /** Executes a single OR condition operation, saves it (optional) and returns the result */
  public static async resolve<T extends any>(context: JWContext, $or: IResolverOperationConditionOr['$or']): Promise<T> {

    // Every branch is evaluated against the same resolved value/arguments context.
    const results = await Promise.all($or.operations.map(cond => {
      return JWResolver.resolve<T>(context, cond);
    }));

    const expectedResult = $or.expectedResult ?? true;
    const someTrue = results.some(res => res === true);

    const result = (someTrue === expectedResult) as unknown as T;

    if ($or.save && typeof $or.save === 'string')
      context.set($or.save, result);

    return result;
  }
}

/** Executes a single AND condition operation, saves it (optional) and returns the result */
export class OperationConditionANDResolver {
  public static async resolve<T extends any>(context: JWContext, $and: IResolverOperationConditionAnd['$and']): Promise<T> {

    // Every branch is evaluated against the same resolved value/arguments context.
    const results = await Promise.all($and.operations.map(cond => {
      return JWResolver.resolve<T>(context, cond);
    }));

    const expectedResult = $and.expectedResult ?? true;
    const allTrue = results.every(res => res === true);

    const result = (allTrue === expectedResult) as unknown as T;

    if ($and.save && typeof $and.save === 'string')
      context.set($and.save, result);

    return result;
  }
}

/** Implements switch-like branching over resolved values. */
export class OperationSwitchResolver {

  private static async checkCase(caseItem: IResolverOperationSwitchCase): Promise<void> {
    if (Object.keys(caseItem).length !== 1)
      throw new JWOperationError(`Switch case must have exactly one key indicating its type. Found keys: ${Object.keys(caseItem).join(', ')}`);

    if (!caseItem.$case)
      throw new JWOperationError(`Switch case must have a "$case" key.`);

    if (!caseItem.$case.value)
      throw new JWOperationError(`Switch case must have a "value" key.`);

    if (!caseItem.$case.$operation)
      throw new JWOperationError(`Switch case must have an "operation" key.`);
  }
  private static async resolveCase<T extends any>(context: JWContext, $case: IResolverOperationSwitchCase['$case']): Promise<boolean> {

    const { value: caseValue } = $case;

    const resolvedCaseValue = await OperationValueResolver.resolveValue(context, caseValue, $case.valueTransformer);

    return resolvedCaseValue;
  }

  public static async resolve<T extends any>(context: JWContext, $switch: IResolverOperationSwitch['$switch']): Promise<T> {

    const switchValue = await OperationValueResolver.resolveValue(context, $switch.value, $switch.valueTransformer);

    $switch.cases.forEach(OperationSwitchResolver.checkCase);

    let case_matched = false;
    let result: T | undefined = undefined;


    for (const { $case } of $switch.cases) {
      if (case_matched)
        break;
      const matched = await OperationSwitchResolver.resolveCase<T>(context, $case);
      if (matched) {
        case_matched = true;
        result = await JWResolver.resolve(context, $case.$operation);
      }
    }

    if (!case_matched) {
      if ($switch.$default)
        result = await JWResolver.resolve(context, $switch.$default);
      else
        throw new JWOperationError(`No matching case found for switch value "${switchValue}", and no default case provided.`);
    }
    if (typeof result === 'undefined')
      throw new JWOperationError(`Switch operation did not produce a result.`);

    if ($switch.save && typeof $switch.save === 'string')
      context.set($switch.save, result);

    return result as T;


  }
}

/** Resolves an if/else style operation tree. */
export class OperationConditionalResolver {


  public static async resolve<T extends any>(context: JWContext, $conditional: IResolverConditionalOperation['$conditional']): Promise<T> {

    if (!(__IF__ in $conditional))
      throw new JWOperationError(`Conditional operation missing "$if" condition.`);

    if (!(__THEN__ in $conditional))
      throw new JWOperationError(`Conditional operation missing "$then" condition.`);

    if (!(__ELSE__ in $conditional))
      throw new JWOperationError(`Conditional operation missing "$else" condition.`);


    const conditionResult = await JWResolver.resolve<boolean>(context, $conditional.$if);

    let result: T;

    if (conditionResult)
      result = await JWResolver.resolve<T>(context, $conditional.$then);
    else
      result = await JWResolver.resolve<T>(context, $conditional.$else);

    if ($conditional.save && typeof $conditional.save === 'string')
      context.set($conditional.save, result);

    return result;

  }
}

export class OperationResolverResolver {
  public static async resolve<T extends any>(context: JWContext, $resolver: IResolverOperationResolver['$resolver']): Promise<T> {


    const resolver = JWResolver.getResolver($resolver.name);
    if (!resolver) throw new JWOperationError(`Custom resolver "${$resolver.name}" not found.`);

    const value = await OperationValueResolver.resolveValue(context, $resolver.value ?? { $static: undefined }, $resolver.valueTransformer);

    const args = $resolver.arguments ? await OperationValueResolver.resolveArguments(context, $resolver.arguments) : [];

    const resolverValue = await resolver(value, ...args);
    if ($resolver.save && typeof $resolver.save === 'string')
      context.set($resolver.save, resolverValue);
    return resolverValue as T;
  }
}