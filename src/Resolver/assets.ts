import { TJWConditionType } from "../Condition";
import { TJWTransformerType } from "../Transformer";



/** Supported resolver node kinds. */
export type TResolverOperationTypeCondition = '$condition';
export type TResolverOperationTypeTransformer = '$transformer';
export type TResolverOperationTypeConditional = '$conditional';
export type TResolverOperationTypeSwitch = '$switch';
export type TResolverOperationTypeSwitchCase = '$case';
export type TResolverOperationTypeConditionGroupOperatorAnd = '$and';
export type TResolverOperationTypeConditionGroupOperatorOr = '$or';


export type TStatic = '$static';
export type TResolver = '$resolver';
export type TOperation = '$operation';
export type TCallback = '$callback';
export type TContext = '$context';
export type TArgs = '$args';
export type TCondition = '$condition';
export type TTransformer = '$transformer';
export type TConditional = '$conditional';
export type TIf = '$if';
export type TThen = '$then';
export type TElse = '$else';
export type TAnd = '$and';
export type TOr = '$or';
export type TCase = '$case';
export type TSwitch = '$switch';
export type TDefault = '$default';
export type TPipeline = '$pipeline';
export type TJWRootContext = '$jwcontext';

export type JWContext = Map<string, any>;


/** Value sources that can be resolved before an operation runs. */
export type TValueTypeStatic = { $static: any };
export type TValueTypeResolver = { $resolver: string, $args?: TArgumentType[] }
export type TValueTypeOperation = { $operation: TOperationType; };
export type TValueTypeContext = { $context: string };
export type TValue = TValueTypeStatic | TValueTypeResolver | TValueTypeOperation | TValueTypeContext;

/** Argument sources accepted by conditions and transformers. */
export type TArgumentTypeStatic = { $static: any };
export type TArgumentTypeResolver = { $resolver: string; $args?: TArgumentType[] };
export type TArgumentTypeOperation = { $operation: TOperationType; };
export type TArgumentTypeContext = { $context: string };
export type TArgumentTypeCallback = {
  $callback:
  | IResolverOperationConditionCallback
  | IResolverOperationTransformerCallback
  | IResolverOperationConditionAndCallback
  | IResolverOperationConditionOrCallback
  | IResolverConditionalOperationCallback
  | IResolverOperationResolverCallback;
};


export interface IResolverOperationConditionCallback {
  $condition: Omit<IResolverOperationCondition['$condition'], 'value'>;
}

export interface IResolverOperationTransformerCallback {
  $transformer: Omit<IResolverOperationTransformer['$transformer'], 'value'>;
}


export interface IResolverOperationConditionAndCallback {
  $and: {
    operations: Array<IResolverOperationConditionCallback | IResolverOperationConditionAndCallback | IResolverOperationConditionOrCallback | IResolverConditionalOperationCallback | IResolverOperationResolverCallback>
  }
}


export interface IResolverOperationConditionOrCallback {
  $or: {
    operations: Array<IResolverOperationConditionCallback | IResolverOperationConditionAndCallback | IResolverOperationConditionOrCallback | IResolverConditionalOperationCallback | IResolverOperationResolverCallback>
  }
}



export interface IResolverConditionalOperationCallback {
  $conditional: {
    $if: IResolverOperationConditionCallback | IResolverOperationConditionAndCallback | IResolverOperationConditionOrCallback | IResolverConditionalOperationCallback | IResolverOperationResolverCallback;
    $then: IResolverOperationConditionCallback | IResolverOperationTransformerCallback | IResolverOperationConditionAndCallback | IResolverOperationConditionOrCallback | IResolverConditionalOperationCallback | IResolverOperationResolverCallback;
    $else: IResolverOperationConditionCallback | IResolverOperationTransformerCallback | IResolverOperationConditionAndCallback | IResolverOperationConditionOrCallback | IResolverConditionalOperationCallback | IResolverOperationResolverCallback;
  }
}


export interface IResolverOperationResolverCallback {
  $resolver: Omit<IResolverOperationResolver['$resolver'], 'value'>;
}



export type TArgumentType = TArgumentTypeStatic | TArgumentTypeResolver | TArgumentTypeOperation | TArgumentTypeContext | TArgumentTypeCallback;

/** Executes a named condition against a resolved value and optional arguments. */
export interface IResolverOperationCondition {
  $condition: {
    name: TJWConditionType;
    valueTransformer?: IResolverOperationTransformerCallback;
    value: TValue;
    arguments?: TArgumentType[];
    expectedResult?: boolean;
    save?: string;
  };
};

/** Executes a named transformer against a resolved value and optional arguments. */
export interface IResolverOperationTransformer {
  $transformer: {
    name: TJWTransformerType;
    value: TValue;
    valueTransformer?: IResolverOperationTransformerCallback;
    arguments?: TArgumentType[];
    save?: string;
  };
}

/** Branches between two operations using another resolver operation as the predicate. */
export interface IResolverConditionalOperation {
  $conditional: {
    $if: IResolverOperationCondition | IResolverOperationConditionAnd | IResolverOperationConditionOr | IResolverOperationSwitch;
    $then: IResolverOperationCondition | IResolverOperationTransformer | IResolverOperationConditionAnd | IResolverOperationConditionOr | IResolverOperationSwitch | IResolverConditionalOperation;
    $else: IResolverOperationCondition | IResolverOperationTransformer | IResolverOperationConditionAnd | IResolverOperationConditionOr | IResolverOperationSwitch | IResolverConditionalOperation;
    save?: string;
  }
}

export interface IResolverOperationConditionAnd {
  $and: {
    operations: Array<IResolverOperationCondition | IResolverOperationConditionAnd | IResolverOperationConditionOr | IResolverOperationSwitch | IResolverConditionalOperation | IResolverOperationResolver>;
    expectedResult?: boolean;
    save?: string;
  }
}

export interface IResolverOperationConditionOr {
  $or: {
    operations: Array<IResolverOperationCondition | IResolverOperationConditionAnd | IResolverOperationConditionOr | IResolverOperationSwitch | IResolverConditionalOperation | IResolverOperationResolver>;
    expectedResult?: boolean;
    save?: string;
  }
}


/** Associates a match value with the operation that should run for that value. */
export interface IResolverOperationSwitchCase {
  $case: {
    value: TValue;
    valueTransformer?: IResolverOperationTransformerCallback;
    $operation: IResolverOperationCondition | IResolverOperationTransformer | IResolverOperationConditionAnd | IResolverOperationConditionOr | IResolverOperationSwitch | IResolverConditionalOperation | IResolverOperationResolver;
  }
}

/** Resolves a value, compares it against cases, and executes the first matching branch. */
export interface IResolverOperationSwitch {
  $switch: {
    value: TValue;
    valueTransformer?: IResolverOperationTransformerCallback;
    cases: Array<IResolverOperationSwitchCase>;
    $default?: IResolverOperationCondition | IResolverOperationTransformer | IResolverOperationConditionAnd | IResolverOperationConditionOr | IResolverOperationSwitch | IResolverConditionalOperation | IResolverOperationResolver;
    save?: string;
  };
}

export interface IResolverOperationResolver {
  $resolver: {
    name: string;
    value?: TValue;
    valueTransformer?: IResolverOperationTransformerCallback;
    arguments?: TArgumentType[];
    save?: string;
  }
}

export interface IResolverPipeline {
  $pipeline: TOperationTypeList;
}


/** Union of every executable resolver node supported by the engine. */
export type TOperationType = IResolverOperationCondition | IResolverOperationTransformer | IResolverOperationConditionAnd | IResolverOperationConditionOr | IResolverOperationSwitch | IResolverConditionalOperation | IResolverPipeline | IResolverOperationResolver;


export type TOperationTypeList = Array<TOperationType>;


/**
 * An alias for the string constant '$static', used to indicate that a value is a static literal within the JSON Workflow system. This can be used in conditions, transformers, and resolver operations to specify that the value should be taken as-is without any further resolution or transformation.
 */
export const __STATIC__: TStatic = '$static';

/**
 * String constant representing the resolver operation type, used to identify operations that execute a named resolver with optional arguments and value transformation. This is a core part of the JSON Workflow system, allowing for modular and reusable logic encapsulated in resolvers that can be invoked from various conditions, transformers, and other operations.
 */
export const __RESOLVER__: TResolver = '$resolver';

/**
 * String constant representing the operation type for executing a named condition, used in resolver operations to specify that the operation should evaluate a condition against a resolved value and optional arguments. This allows for dynamic branching and decision-making based on the evaluation of conditions within the workflow.
 */
export const __OPERATION__: TOperation = '$operation';

/**
 * String constant representing the callback argument type, used to specify that an argument for a condition or transformer should be resolved by executing another resolver operation as a callback. This enables complex nested logic and dynamic argument resolution based on the results of other operations within the workflow.
 */
export const __CALLBACK__: TCallback = '$callback';

/**
 * String constant representing the context argument type, used to specify that an argument for a condition or transformer should be resolved from the current execution context. This allows conditions and transformers to access and utilize contextual information that may have been saved by previous operations or passed into the resolver, enabling more dynamic and stateful workflows.
 */
export const __CONTEXT__: TContext = '$context';

/**
 * String constant representing the arguments key, used to specify the list of arguments passed to a condition or transformer within a resolver operation. This allows for flexible and dynamic argument passing, where each argument can be a static value, a resolved value from another operation, or even a callback that executes another resolver operation to determine the argument value at runtime.
 */
export const __ARGS__: TArgs = '$args';

/**
 * String constant representing the condition operation type, used to identify operations that execute a named condition against a resolved value and optional arguments. This is a fundamental part of the JSON Workflow system, enabling dynamic decision-making and branching based on the evaluation of conditions within the workflow.
 */
export const __CONDITION__: TCondition = '$condition';

/**
 * String constant representing the transformer operation type, used to identify operations that execute a named transformer against a resolved value and optional arguments. This allows for dynamic data transformation and manipulation within the workflow, enabling the modification of values based on custom logic defined in transformers.
 */
export const __TRANSFORMER__: TTransformer = '$transformer';

/**
 * String constant representing the conditional operation type, used to identify operations that branch between two other operations based on the result of a resolver operation as the predicate. This enables complex branching logic within the workflow, allowing for different execution paths based on dynamic conditions evaluated at runtime.
 */
export const __CONDITIONAL__: TConditional = '$conditional';

/**
 * String constant representing the if key in conditional operations, used to specify the resolver operation that serves as the predicate for branching between the "then" and "else" operations. This is a critical part of the conditional operation structure, determining which branch of the operation will be executed based on the evaluation of the specified condition.
 */
export const __IF__: TIf = '$if';

/**
 * String constant representing the then key in conditional operations, used to specify the operation that should be executed if the condition specified in the "$if" key evaluates to true. This allows for defining the "true" branch of a conditional operation, enabling dynamic execution paths based on runtime conditions.
 */
export const __THEN__: TThen = '$then';

/**
 * String constant representing the else key in conditional operations, used to specify the operation that should be executed if the condition specified in the "$if" key evaluates to false. This allows for defining the "false" branch of a conditional operation, enabling dynamic execution paths based on runtime conditions.
 */
export const __ELSE__: TElse = '$else';

/**
 * String constant representing the logical AND operator for condition groups, used to specify that all conditions within the group must evaluate to true for the group to be considered true. This is used in resolver operations that combine multiple conditions together, allowing for more complex logical expressions and decision-making within the workflow.
 */
export const __AND__: TAnd = '$and';

/**
 * String constant representing the logical OR operator for condition groups, used to specify that at least one condition within the group must evaluate to true for the group to be considered true. This is used in resolver operations that combine multiple conditions together, allowing for more complex logical expressions and decision-making within the workflow.
 */
export const __OR__: TOr = '$or';

/**
 * String constant representing the case key in switch operations, used to specify a match value and the corresponding operation that should be executed if the resolved value matches that case. This is a critical part of the switch operation structure, enabling branching logic based on multiple potential values of a resolved expression.
 */
export const __CASE__: TCase = '$case';

/**
 * String constant representing the switch operation type, used to identify operations that resolve a value, compare it against multiple cases, and execute the first matching branch. This allows for complex branching logic based on multiple potential values of a resolved expression, enabling more dynamic and flexible workflows.
 */
export const __SWITCH__: TSwitch = '$switch';

/**
 * String constant representing the default case in switch operations, used to specify the operation that should be executed if none of the specified cases match the resolved value. This allows for defining a fallback execution path in switch operations, ensuring that there is a defined behavior even when the resolved value does not match any of the explicit cases.
 */
export const __DEFAULT__: TDefault = '$default';

/**
 * String constant representing the pipeline operation type, used to identify operations that execute a sequence of resolver operations in order. This allows for chaining multiple operations together, where the output of one operation can be used as the input for the next, enabling complex data processing and transformation workflows within the JSON Workflow system.
 */
export const __PIPELINE__: TPipeline = '$pipeline';

/**
 * String constant representing the root context key, used to specify the top-level execution context within the JSON Workflow system. This context can be used to store and access values that are relevant throughout the entire execution of a workflow, allowing for stateful operations and data sharing across different conditions, transformers, and resolver operations.
 */
export const __JWROOT__: TJWRootContext = '$jwcontext';


/**
 * Array of all supported resolver operation type keys, used for type checking and validation within the JSON Workflow system. This array includes all the string constants that represent the different types of operations that can be executed by the resolver, ensuring that only valid operation types are used in conditions, transformers, and other operations.
 */
export const Operations = [__CONDITION__, __TRANSFORMER__, __CONDITIONAL__, __SWITCH__, __PIPELINE__, __AND__, __OR__, __RESOLVER__] as const;
export type TOperationTypeKey = typeof Operations[number];

/**
 * Array of all supported value type keys, used for type checking and validation within the JSON Workflow system. This array includes all the string constants that represent the different sources of values that can be resolved before an operation runs, ensuring that only valid value types are used in conditions, transformers, and resolver operations.
 */
export const Values = [__STATIC__, __RESOLVER__, __OPERATION__, __CONTEXT__] as const;
export type TValueTypeKey = typeof Values[number];

/**
 * Array of all supported argument type keys, used for type checking and validation within the JSON Workflow system. This array includes all the string constants that represent the different sources of arguments that can be passed to conditions and transformers, ensuring that only valid argument types are used in operations.
 */
export const ArgumentTypes = [__STATIC__, __RESOLVER__, __OPERATION__, __CONTEXT__, __CALLBACK__] as const;
export type TArgumentTypeKey = typeof ArgumentTypes[number];

