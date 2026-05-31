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
  IOperation,
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


/** Entry point for resolving JSON-defined condition and transformer trees. */
export class JWResolver {

  /**
   * Map to store custom resolvers registered by users. The key is the resolver name, and the value is the resolver function.
   */
  private static MCustomResolvers: Map<string, (args?: any[]) => Promise<any>> = new Map();


  /**
   * Registers a custom resolver function with a given name.
   * @param name - The name of the resolver.
   * @param resolverFn - The resolver function to register.
   */
  public static registerResolver(name: string, resolverFn: (args?: any[]) => Promise<any>): void {
    if (this.MCustomResolvers.has(name))
      throw new JWOperationError(`Resolver with name "${name}" is already registered.`);
    this.MCustomResolvers.set(name, resolverFn);
  }


  public static getResolver(name: string): ((args?: any[]) => Promise<any>) | undefined {

    return this.MCustomResolvers.get(name);
  }


  /** Removes a previously registered custom resolver. */
  public static removeResolver(name: string): void {

    this.MCustomResolvers.delete(name);
  }


  /** Dispatches an operation node to the concrete resolver for its type. */
  public static async resolve<T extends any>(operation: IOperation, forcedValueGetter?: TValue, forcedArgs?: TArgumentType[]): Promise<T> {

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

      case __CONDITION__:
        const result = await OperationConditionResolver.resolve<T>(operation);
        const expectedResult = operation.expectedResult ?? true;
        return (result === expectedResult) as unknown as T;


      case __TRANSFORMER__:
        return await OperationTransformerResolver.resolve<T>(operation);


      case __CONDITION_GROUP__:
        return await OperationConditionGroupResolver.resolve<T>(operation);


      case __SWITCH__:
        return await OperationSwitchResolver.resolve<T>(operation);



      case __CONDITIONAL__:
        return await OperationConditionalResolver.resolve<T>(operation);


      default: throw new JWOperationError(`Invalid operation type "${(operation as any).type}"`);
    }
  }
}


/** Resolves the value and arguments consumed by resolver operations. */
export class OperationValueResolver {


  /** Resolves a value descriptor into the runtime value it represents. */
  public static async resolveValue(valueGetter: TValue): Promise<any> {

    switch (valueGetter.type) {

      case __STATIC__:
        return valueGetter.value;


      case __RESOLVER__: {

        const resolver = JWResolver.getResolver(valueGetter.resolver);

        if (!resolver) throw new JWOperationError(`Custom resolver "${valueGetter.resolver}" not found.`);

        const args = valueGetter.resolverArgs ? await OperationValueResolver.resolveArguments(valueGetter.resolverArgs) : [];

        return await resolver(args);
      }


      case __OPERATION__:
        return await JWResolver.resolve(valueGetter.operation);
    }
  }


  /** Resolves a single argument descriptor into a runtime argument. */
  public static async resolveArgument(argument: TArgumentType): Promise<any> {

    switch (argument.type) {
      case __CALLBACK__:
        return argument.callback as IOperation;


      case __OPERATION__:
        return await JWResolver.resolve(argument.operation);


      case __RESOLVER__: {

        const resolver = JWResolver.getResolver(argument.resolver);

        if (!resolver) throw new JWOperationError(`Custom resolver "${argument.resolver}" not found.`);

        const args = await OperationValueResolver.resolveArguments(argument.resolverArgs || []);

        return await resolver(...args);
      }


      case __STATIC__:
        return argument.value;


      default:
        throw new JWOperationError(`Invalid argument type "${(argument as any).type}"`);
    }
  }

  /** Resolves all argument descriptors in parallel. */
  public static async resolveArguments(args: TArgumentType[]): Promise<any[]> {
    return Promise.all(args.map(arg => this.resolveArgument(arg)));
  }
}

/** Executes a single condition operation. */
export class OperationConditionResolver {

  public static async resolve<T extends any>(operation: IResolverOperationCondition): Promise<T> {



    const conditionFN = JWCondition.get(operation.condition);

    const value = await OperationValueResolver.resolveValue(operation.valueGetter);

    const args = operation.arguments ? await OperationValueResolver.resolveArguments(operation.arguments) : [];

    return await conditionFN(value, ...args) as unknown as T;
  }
}

/** Executes a single transformer operation. */
export class OperationTransformerResolver {

  public static async resolve<T extends any>(operation: IResolverOperationTransformer): Promise<T> {

    const transformerFN = JWTransformer.get(operation.transformer);

    const value = await OperationValueResolver.resolveValue(operation.valueGetter);

    const args = operation.arguments ? await OperationValueResolver.resolveArguments(operation.arguments) : [];

    return await transformerFN(value, ...args) as unknown as T;
  }
}


/** Evaluates nested condition groups with AND/OR semantics. */
export class OperationConditionGroupResolver {

  public static async resolve<T extends any>(operation: IResolverOperationConditionGroup): Promise<T> {

    // Every branch is evaluated against the same resolved value/arguments context.
    const results = await Promise.all(operation.conditions.map(cond => {

      if (__OPERATOR__ in cond)
        return OperationConditionGroupResolver.resolve(cond);


      if (cond.type === __CONDITION__)
        return OperationConditionResolver.resolve(cond);


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

  public static async resolve<T extends any>(operation: IResolverOperationSwitch): Promise<T> {

    const switchValue = await OperationValueResolver.resolveValue(operation.switch);

    for (const caseItem of operation.cases) {

      const { value: caseValue, operation: caseOperation } = caseItem;

      const resolvedCaseValue = await OperationValueResolver.resolveValue(caseValue);

      if (resolvedCaseValue === switchValue)
        return await JWResolver.resolve(caseOperation);
    }

    if (operation.defaultCase)
      return await JWResolver.resolve(operation.defaultCase);

    throw new JWOperationError(`No matching case found for switch value "${switchValue}", and no default case provided.`);
  }
}


/** Resolves an if/else style operation tree. */
export class OperationConditionalResolver {


  public static async resolve<T extends any>(operation: IResolverConditionalOperation): Promise<T> {

    const conditionResult = await JWResolver.resolve<boolean>(operation.condition);

    // Conditions default to expecting true when no explicit expectedResult is supplied.
    const expectedResult = ('expectedResult' in operation.condition) ? operation.condition.expectedResult ?? true : true;

    const conditionMet = conditionResult === expectedResult;

    if (conditionMet)
      return await JWResolver.resolve(operation.trueOperation);

    return await JWResolver.resolve(operation.falseOperation);

  }
}