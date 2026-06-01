import { JWCondition } from '../Condition';
import { JWTransformer } from '../Transformer';
import { JWOperationError } from '../Error';
import type {
  TResolverOperationTypeCondition,
  TResolverOperationTypeTransformer,
  TResolverOperationTypeConditionGroup,
  TResolverOperationTypeConditionGroupOperatorAnd,
  TResolverOperationTypeConditionGroupOperatorOr,
  TResolverOperationTypeSwitch,
  TStatic,
  TResolver,
  TOperation,
  TCallback,
  TValue,
  TArgumentType,
  IResolverOperationCondition,
  IResolverOperationTransformer,
  IResolverConditionalOperation,
  IResolverOperationConditionGroup,
  IResolverOperationSwitch,
  TResolverOperationTypeConditional,
  TOperationType,
  JWContext,
  TContext,
  TOperationTypeList,
  TResolverOperationTypeGroup,
} from './types';


export const __STATIC__: TStatic = 'static';
export const __RESOLVER__: TResolver = 'resolver';
export const __OPERATION__: TOperation = 'operation';
export const __CALLBACK__: TCallback = 'callback';
export const __TRANSFORMER__: TResolverOperationTypeTransformer = 'transformer';
export const __OPERATOR__ = 'operator';
export const __AND__: TResolverOperationTypeConditionGroupOperatorAnd = 'AND';
export const __OR__: TResolverOperationTypeConditionGroupOperatorOr = 'OR';
export const __SWITCH__: TResolverOperationTypeSwitch = 'switch';
export const __CONDITION_GROUP__: TResolverOperationTypeConditionGroup = 'condition_group';
export const __CONDITION__: TResolverOperationTypeCondition = 'condition';
export const __CONDITIONAL__: TResolverOperationTypeConditional = 'conditional';
export const __CONTEXT__: TContext = 'context';
export const __JWROOT__ = '$jwcontext';
export const __GROUP__: TResolverOperationTypeGroup = 'group';


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
   * @param forcedValueGetter force a start value if you need (used by array.map/array.filter to set the item of array as the valueGetter.type = static, valueGetter.value = item)
   * @param forcedArgs force args if you need (used by array.reduce to set the accumulated value as an argument for the next operation)
   * @returns 
   */
  public static async run<T extends any>(operation: TOperationType, forcedValueGetter?: TValue, forcedArgs?: TArgumentType[]): Promise<T> {
    return await JWResolver.resolve(new Map<string, any>(), operation, forcedValueGetter, forcedArgs);
  }

  /**
   * 
   * @param operationList list of operations to be done
   * @returns the context (resulting from running the operation list)
   * @description it runs all operations in sequence, and returns the final context. This is useful when you want to run multiple operations and then inspect the context for the results, instead of relying on the return value of a single operation.
   */
  public static async runSequence(operationList: TOperationTypeList, context?: JWContext): Promise<JWContext> {
    if (!context)
      context = new Map<string, any>();
    for (const operation of operationList)
      await JWResolver.resolve(context, operation);

    return context;
  }


  /** 
   * Dispatches an operation node to the concrete resolver for its type. 
   *
   * @param context the context to resolve the operation against. Can be undefined when launching a top-level operation, in which case an empty context will be used. For nested operations, the context from the parent operation will be passed down, allowing for state sharing across the operation tree.
   * @param operation operation to launch
   * @param forcedValueGetter force a start value if you need (used by array.map/array.filter to set the item of array as the valueGetter.type = static, valueGetter.value = item)
   * @param forcedArgs force args if you need (used by array.reduce to set the accumulated value as an argument for the next operation)
   * @returns 
   */
  public static async resolve<T extends any>(context: JWContext | undefined, operation: TOperationType, forcedValueGetter?: TValue, forcedArgs?: TArgumentType[]): Promise<T> {
    if (typeof context === 'undefined')
      context = new Map<string, any>();

    if (!('type' in operation)) {
      console.error(operation);
      throw new JWOperationError(`Operation must have a "type" property`);
    }

    if (forcedValueGetter)
      if (operation.type === __CONDITION__ || operation.type === __TRANSFORMER__)
        operation.valueGetter = forcedValueGetter;
      else console.error('No valueGetter forced, and operation has no valueGetter:', operation);

    if (forcedArgs)
      if (operation.type === __CONDITION__ || operation.type === __TRANSFORMER__)
        operation.arguments = forcedArgs;



    switch (operation.type) {

      case __GROUP__: {
        let lastResult: any = undefined;
        for (const op of operation.operations)
          lastResult = await JWResolver.resolve(context, op);
        return lastResult as T;
      }


      case __CONDITION__: {
        const result = await OperationConditionResolver.resolve<T>(context, operation);
        const expectedResult = operation.expectedResult ?? true;
        const finalResult = (result === expectedResult) as unknown as T;
        if (operation.save && typeof operation.save === 'string')
          context.set(operation.save, finalResult);
        return finalResult;
      }


      case __TRANSFORMER__: {
        const result = await OperationTransformerResolver.resolve<T>(context, operation);
        if (operation.save && typeof operation.save === 'string')
          context.set(operation.save, result);
        return result;
      }

      case __CONDITION_GROUP__: {
        const result = await OperationConditionGroupResolver.resolve<T>(context, operation);
        if (operation.save && typeof operation.save === 'string')
          context.set(operation.save, result);
        return result;
      }


      case __SWITCH__: {
        const result = await OperationSwitchResolver.resolve<T>(context, operation);
        if (operation.save && typeof operation.save === 'string')
          context.set(operation.save, result);
        return result;
      }



      case __CONDITIONAL__: {
        const result = await OperationConditionalResolver.resolve<T>(context, operation);
        if (operation.save && typeof operation.save === 'string')
          context.set(operation.save, result);
        return result;
      }


      default: throw new JWOperationError(`Invalid operation type "${(operation as any).type}"`);
    }
  }
}

/** Resolves the value and arguments consumed by resolver operations. */
export class OperationValueResolver {


  /** Resolves a value descriptor into the runtime value it represents. */
  public static async resolveValue(context: JWContext, valueGetter: TValue): Promise<any> {

    switch (valueGetter.type) {

      case __STATIC__:
        return valueGetter.value;

      case __RESOLVER__: {

        const resolver = JWResolver.getResolver(valueGetter.resolver);

        if (!resolver) throw new JWOperationError(`Custom resolver "${valueGetter.resolver}" not found.`);

        const args = valueGetter.resolverArgs ? await OperationValueResolver.resolveArguments(context, valueGetter.resolverArgs) : [];

        return await resolver(...args);
      }


      case __OPERATION__:
        return await JWResolver.resolve(context, valueGetter.operation);

      case __CONTEXT__:
        return JWResolver.readContextValue(context, valueGetter.key);
    }
  }

  /** Resolves a single argument descriptor into a runtime argument. */
  public static async resolveArgument(context: JWContext, argument: TArgumentType): Promise<any> {

    switch (argument.type) {
      case __CALLBACK__:
        return argument.callback as TOperationType;


      case __OPERATION__:
        return await JWResolver.resolve(context, argument.operation);


      case __RESOLVER__: {

        const resolver = JWResolver.getResolver(argument.resolver);

        if (!resolver) throw new JWOperationError(`Custom resolver "${argument.resolver}" not found.`);

        const args = await OperationValueResolver.resolveArguments(context, argument.resolverArgs || []);

        return await resolver(...args);
      }


      case __STATIC__:
        return argument.value;


      case __CONTEXT__:
        return JWResolver.readContextValue(context, argument.key);

      default:
        throw new JWOperationError(`Invalid argument type "${(argument as any).type}"`);
    }
  }

  /** Resolves all argument descriptors in parallel. */
  public static async resolveArguments(context: JWContext, args: TArgumentType[]): Promise<any[]> {
    return Promise.all(args.map(arg => this.resolveArgument(context, arg)));
  }
}

/** Executes a single condition operation. */
export class OperationConditionResolver {

  public static async resolve<T extends any>(context: JWContext, operation: IResolverOperationCondition): Promise<T> {



    const conditionFN = JWCondition.get(operation.condition);

    const value = await OperationValueResolver.resolveValue(context, operation.valueGetter);

    const args = operation.arguments ? await OperationValueResolver.resolveArguments(context, operation.arguments) : [];

    return await conditionFN(context, value, ...args) as unknown as T;
  }
}

/** Executes a single transformer operation. */
export class OperationTransformerResolver {

  public static async resolve<T extends any>(context: JWContext, operation: IResolverOperationTransformer): Promise<T> {

    const transformerFN = JWTransformer.get(operation.transformer);

    const value = await OperationValueResolver.resolveValue(context, operation.valueGetter);

    const args = operation.arguments ? await OperationValueResolver.resolveArguments(context, operation.arguments) : [];

    return await transformerFN(context, value, ...args) as unknown as T;
  }
}

/** Evaluates nested condition groups with AND/OR semantics. */
export class OperationConditionGroupResolver {

  public static async resolve<T extends any>(context: JWContext, operation: IResolverOperationConditionGroup): Promise<T> {

    // Every branch is evaluated against the same resolved value/arguments context.
    const results = await Promise.all(operation.conditions.map(cond => {

      if (__OPERATOR__ in cond)
        return OperationConditionGroupResolver.resolve(context, cond);


      if (cond.type === __CONDITION__)
        return OperationConditionResolver.resolve(context, cond);

      else
        throw new JWOperationError(`Invalid condition group member.`);
    }));

    if (operation.operator === __AND__)
      return results.every(res => res === true) as unknown as T;


    if (operation.operator === __OR__) {

      let result = false;

      for (const res of results) {
        if (res === true) {
          result = true;
          break;
        }
      }

      return (result === (operation.expectedResult ?? true)) as unknown as T;
    }

    throw new JWOperationError(`Invalid condition group operator "${operation.operator}".`);
  }
}

/** Implements switch-like branching over resolved values. */
export class OperationSwitchResolver {

  public static async resolve<T extends any>(context: JWContext, operation: IResolverOperationSwitch): Promise<T> {

    if (!operation.switch)
      throw new JWOperationError(`Switch operation missing "switch" value.`);

    if (!operation.cases || !Array.isArray(operation.cases) || operation.cases.length === 0)
      throw new JWOperationError(`Switch operation missing "cases".`);

    const switchValue = await OperationValueResolver.resolveValue(context, operation.switch);


    for (const caseItem of operation.cases) {

      const { value: caseValue, operation: caseOperation } = caseItem;

      const resolvedCaseValue = await OperationValueResolver.resolveValue(context, caseValue);

      if (resolvedCaseValue === switchValue)
        return await JWResolver.resolve(context, caseOperation);
    }

    if (operation.defaultCase)
      return await JWResolver.resolve(context, operation.defaultCase);

    throw new JWOperationError(`No matching case found for switch value "${switchValue}", and no default case provided.`);
  }
}

/** Resolves an if/else style operation tree. */
export class OperationConditionalResolver {


  public static async resolve<T extends any>(context: JWContext, operation: IResolverConditionalOperation): Promise<T> {

    if (!operation.trueOperation)
      throw new JWOperationError(`Conditional operation missing "trueOperation".`);

    if (!operation.falseOperation)
      throw new JWOperationError(`Conditional operation missing "falseOperation".`);

    const conditionResult = await JWResolver.resolve<boolean>(context, operation.condition);

    // Conditions default to expecting true when no explicit expectedResult is supplied.
    const expectedResult = ('expectedResult' in operation.condition) ? operation.condition.expectedResult ?? true : true;

    const conditionMet = conditionResult === expectedResult;

    if (conditionMet)
      return await JWResolver.resolve(context, operation.trueOperation);

    return await JWResolver.resolve(context, operation.falseOperation);

  }
}