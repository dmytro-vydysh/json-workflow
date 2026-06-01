import { TJWConditionType } from "../Condition";
import { TJWTransformerType } from "../Transformer";



/** Supported resolver node kinds. */
export type TResolverOperationTypeCondition = 'condition';
export type TResolverOperationTypeTransformer = 'transformer';
export type TResolverOperationTypeConditional = 'conditional';
export type TResolverOperationTypeConditionGroup = 'condition_group';
export type TResolverOperationTypeConditionGroupOperatorAnd = 'AND';
export type TResolverOperationTypeGroup = 'group';
export type TResolverOperationTypeConditionGroupOperatorOr = 'OR';

export type TResolverOperationTypeConditionGroupOperator = TResolverOperationTypeConditionGroupOperatorAnd | TResolverOperationTypeConditionGroupOperatorOr;
export type TResolverOperationTypeSwitch = 'switch';


export type TStatic = 'static';
export type TResolver = 'resolver';
export type TOperation = 'operation';
export type TCallback = 'callback';
export type TContext = 'context';

export type JWContext = Map<string, any>;


/** Value sources that can be resolved before an operation runs. */
export type TValueTypeStatic = { type: TStatic; value: any };
export type TValueTypeResolver = { type: TResolver; resolver: string; resolverArgs?: any[] };
export type TValueTypeOperation = { type: TOperation; operation: TOperationType; };
export type TValueTypeContext = { type: TContext; key: string };
export type TValue = TValueTypeStatic | TValueTypeResolver | TValueTypeOperation | TValueTypeContext;

/** Argument sources accepted by conditions and transformers. */
export type TArgumentTypeStatic = { type: TStatic; value: any };
export type TArgumentTypeResolver = { type: TResolver; resolver: string; resolverArgs?: any[] };
export type TArgumentTypeOperation = { type: TOperation; operation: TOperationType; };
export type TArgumentTypeContext = { type: TContext; key: string };
export type TArgumentTypeCallback = {
  type: TCallback;
  callback: Omit<IResolverOperationCondition, 'valueGetter'> | Omit<IResolverOperationTransformer, 'valueGetter'> | Omit<IResolverOperationConditionGroup, 'conditions'> | Omit<IResolverOperationSwitch, 'cases'> | Omit<IResolverConditionalOperation, 'condition'>;
};


export type TArgumentType = TArgumentTypeStatic | TArgumentTypeResolver | TArgumentTypeOperation | TArgumentTypeContext | TArgumentTypeCallback;

/** Executes a named condition against a resolved value and optional arguments. */
export interface IResolverOperationCondition {
  type: TResolverOperationTypeCondition;
  condition: TJWConditionType;
  expectedResult?: boolean;
  valueGetter: TValue;
  arguments?: TArgumentType[];
  save?: string;
}

/** Executes a named transformer against a resolved value and optional arguments. */
export interface IResolverOperationTransformer {
  type: TResolverOperationTypeTransformer;
  transformer: TJWTransformerType
  valueGetter: TValue;
  arguments?: TArgumentType[];
  save?: string;
}

/** Branches between two operations using another resolver operation as the predicate. */
export interface IResolverConditionalOperation {
  type: TResolverOperationTypeConditional;
  condition: IResolverOperationCondition | IResolverOperationConditionGroup | IResolverOperationSwitch;
  trueOperation: IResolverOperationCondition | IResolverOperationTransformer | IResolverOperationConditionGroup | IResolverOperationSwitch | IResolverConditionalOperation;
  falseOperation: IResolverOperationCondition | IResolverOperationTransformer | IResolverOperationConditionGroup | IResolverOperationSwitch | IResolverConditionalOperation;
  save?: string;
}

/** Evaluates multiple conditions with a logical operator. */
export interface IResolverOperationConditionGroup {
  type: TResolverOperationTypeConditionGroup;
  operator: TResolverOperationTypeConditionGroupOperator;
  conditions: Array<IResolverOperationCondition | IResolverOperationConditionGroup | IResolverOperationSwitch | IResolverConditionalOperation>;
  expectedResult?: boolean;
  save?: string;
}

/** Associates a match value with the operation that should run for that value. */
export interface IResolverOperationSwitchCase {
  value: TValue;
  operation: IResolverOperationCondition | IResolverOperationTransformer | IResolverOperationConditionGroup | IResolverOperationSwitch | IResolverConditionalOperation;
}

/** Resolves a value, compares it against cases, and executes the first matching branch. */
export interface IResolverOperationSwitch {

  type: TResolverOperationTypeSwitch;
  switch: TValue;
  cases: Array<IResolverOperationSwitchCase>;
  defaultCase?: IResolverOperationCondition | IResolverOperationTransformer | IResolverOperationConditionGroup | IResolverOperationSwitch | IResolverConditionalOperation;
  save?: string;
}

export interface IResolverGroup {
  type: TResolverOperationTypeGroup;
  operations: TOperationTypeList
}


/** Union of every executable resolver node supported by the engine. */
export type TOperationType = IResolverOperationCondition | IResolverOperationTransformer | IResolverOperationConditionGroup | IResolverOperationSwitch | IResolverConditionalOperation | IResolverGroup;


export type TOperationTypeList = Array<TOperationType>;

