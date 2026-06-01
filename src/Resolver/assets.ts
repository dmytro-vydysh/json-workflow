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
export type TValueTypeResolver = { $resolver: string, $args: TArgumentType[] }
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
  | IResolverOperationSwitchCallback
  | IResolverConditionalOperationCallback;
};


export type TArgumentType = TArgumentTypeStatic | TArgumentTypeResolver | TArgumentTypeOperation | TArgumentTypeContext | TArgumentTypeCallback;

/** Executes a named condition against a resolved value and optional arguments. */
export interface IResolverOperationCondition {
  $condition: {
    name: TJWConditionType;
    value: TValue;
    arguments?: TArgumentType[];
    expectedResult?: boolean;
    save?: string;
  };
};
export interface IResolverOperationConditionCallback {
  $condition: Omit<IResolverOperationCondition['$condition'], 'value'>
}

/** Executes a named transformer against a resolved value and optional arguments. */
export interface IResolverOperationTransformer {
  $transformer: {
    name: TJWTransformerType;
    value: TValue;
    arguments?: TArgumentType[];
    save?: string;
  };
}
export interface IResolverOperationTransformerCallback {
  $transformer: Omit<IResolverOperationTransformer['$transformer'], 'value'>
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
export interface IResolverConditionalOperationCallback {
  $conditional: {
    $if: IResolverOperationConditionCallback | IResolverOperationConditionAndCallback | IResolverOperationConditionOrCallback | IResolverOperationSwitchCallback | IResolverConditionalOperationCallback;
    $then:  IResolverOperationConditionCallback | IResolverOperationTransformerCallback | IResolverOperationConditionAndCallback | IResolverOperationConditionOrCallback | IResolverOperationSwitchCallback | IResolverConditionalOperationCallback;
    $else:  IResolverOperationConditionCallback | IResolverOperationTransformerCallback | IResolverOperationConditionAndCallback | IResolverOperationConditionOrCallback | IResolverOperationSwitchCallback | IResolverConditionalOperationCallback;
  }
}

export interface IResolverOperationConditionAnd {
  $and: {
    operations: Array<IResolverOperationCondition | IResolverOperationConditionAnd | IResolverOperationConditionOr | IResolverOperationSwitch | IResolverConditionalOperation>;
    expectedResult?: boolean;
    save?: string;
  }
}
export interface IResolverOperationConditionAndCallback {
  $and: {
    operations: Array<IResolverOperationConditionCallback | IResolverOperationConditionAndCallback | IResolverOperationConditionOrCallback | IResolverOperationSwitchCallback | IResolverConditionalOperationCallback>
  }
}

export interface IResolverOperationConditionOr {
  $or: {
    operations: Array<IResolverOperationCondition | IResolverOperationConditionAnd | IResolverOperationConditionOr | IResolverOperationSwitch | IResolverConditionalOperation>;
    expectedResult?: boolean;
    save?: string;
  }
}
export interface IResolverOperationConditionOrCallback {
  $or: {
    operations: Array<IResolverOperationConditionCallback | IResolverOperationConditionAndCallback | IResolverOperationConditionOrCallback | IResolverOperationSwitchCallback | IResolverConditionalOperationCallback>
  }
}


/** Associates a match value with the operation that should run for that value. */
export interface IResolverOperationSwitchCase {
  $case: {
    value: TValue;
    $operation: IResolverOperationCondition | IResolverOperationTransformer | IResolverOperationConditionAnd | IResolverOperationConditionOr | IResolverOperationSwitch | IResolverConditionalOperation;
  }
}
export interface IResolverOperationSwitchCaseCallback {
  $case: Omit<IResolverOperationSwitchCase, 'value'>;
}

/** Resolves a value, compares it against cases, and executes the first matching branch. */
export interface IResolverOperationSwitch {
  $switch: {
    value: TValue;
    cases: Array<IResolverOperationSwitchCase>;
    $default?: IResolverOperationCondition | IResolverOperationTransformer | IResolverOperationConditionAnd | IResolverOperationConditionOr | IResolverOperationSwitch | IResolverConditionalOperation;
    save?: string;
  };
}
export interface IResolverOperationSwitchCallback {
  $switch: {
    cases: Array<IResolverOperationSwitchCaseCallback>;
    $default?: IResolverOperationConditionCallback | IResolverOperationTransformerCallback | IResolverOperationConditionAndCallback | IResolverOperationConditionOrCallback | IResolverOperationSwitchCallback | IResolverConditionalOperationCallback;
  }

}

export interface IResolverGroup {
  $pipeline: TOperationTypeList;
}


/** Union of every executable resolver node supported by the engine. */
export type TOperationType = IResolverOperationCondition | IResolverOperationTransformer | IResolverOperationConditionAnd | IResolverOperationConditionOr | IResolverOperationSwitch | IResolverConditionalOperation | IResolverGroup;


export type TOperationTypeList = Array<TOperationType>;



export const __STATIC__: TStatic = '$static';
export const __RESOLVER__: TResolver = '$resolver';
export const __OPERATION__: TOperation = '$operation';
export const __CALLBACK__: TCallback = '$callback';
export const __CONTEXT__: TContext = '$context';
export const __ARGS__: TArgs = '$args';
export const __CONDITION__: TCondition = '$condition';
export const __TRANSFORMER__: TTransformer = '$transformer';
export const __CONDITIONAL__: TConditional = '$conditional';
export const __IF__: TIf = '$if';
export const __THEN__: TThen = '$then';
export const __ELSE__: TElse = '$else';
export const __AND__: TAnd = '$and';
export const __OR__: TOr = '$or';
export const __CASE__: TCase = '$case';
export const __SWITCH__: TSwitch = '$switch';
export const __DEFAULT__: TDefault = '$default';
export const __PIPELINE__: TPipeline = '$pipeline';
export const __JWROOT__: TJWRootContext = '$jwcontext';



export const Operations = [__CONDITION__, __TRANSFORMER__, __CONDITIONAL__, __SWITCH__, __PIPELINE__, __AND__, __OR__] as const;
export type TOperationTypeKey = typeof Operations[number];

export const Values = [__STATIC__, __RESOLVER__, __OPERATION__, __CONTEXT__] as const;
export type TValueTypeKey = typeof Values[number];

export const ArgumentTypes = [__STATIC__, __RESOLVER__, __OPERATION__, __CONTEXT__, __CALLBACK__] as const;
export type TArgumentTypeKey = typeof ArgumentTypes[number];

