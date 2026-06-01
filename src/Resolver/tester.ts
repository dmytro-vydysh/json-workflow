import { JWCondition } from '../Condition';
import { JWTransformer } from '../Transformer';
import { JWResolver } from '.';
import { JWOperationError } from '../Error';

import type {
  TValue,
  TArgumentType,
  TOperationType,
  IResolverOperationCondition,
  IResolverOperationTransformer,
  IResolverOperationConditionGroup,
  IResolverOperationSwitch,
  IResolverConditionalOperation
} from './types';

export class OperationTester {

  /**
   * Throws if the operation tree contains errors.
   */
  public static validate(operation: TOperationType): void {

    const errors = this.getErrors(operation);

    if (errors.length)
      throw new JWOperationError(`Operation validation failed:\n${errors.join('\n')}`);
  }

  /**
   * Returns all validation errors without throwing.
   */
  public static getErrors(operation: TOperationType): string[] {

    const errors: string[] = [];

    this.testOperation(operation, errors, 'root');

    return errors;
  }

  private static testOperation(
    operation: TOperationType,
    errors: string[],
    path: string,
    ignoreValueGetter = false
  ): void {

    if (!operation || typeof operation !== 'object') {
      errors.push(`${path}: operation must be an object`);
      return;
    }

    if (!('type' in operation)) {
      errors.push(`${path}: missing property "type"`);
      return;
    }

    switch (operation.type) {

      case 'condition':
        this.testCondition(operation, errors, path, ignoreValueGetter);
        break;

      case 'transformer':
        this.testTransformer(operation, errors, path, ignoreValueGetter);
        break;

      case 'condition_group':
        this.testConditionGroup(operation, errors, path);
        break;

      case 'switch':
        this.testSwitch(operation, errors, path);
        break;

      case 'conditional':
        this.testConditional(operation, errors, path, ignoreValueGetter);
        break;

      default:
        errors.push(`${path}: invalid operation type "${(operation as any).type}"`);
    }
  }

  private static testCondition(
    operation: IResolverOperationCondition,
    errors: string[],
    path: string,
    ignoreValueGetter = false
  ): void {

    if (!operation.condition)
      errors.push(`${path}: missing property "condition"`);

    try {
      JWCondition.get(operation.condition);
    } catch {
      errors.push(`${path}: condition "${operation.condition}" not registered`);
    }

    if (!ignoreValueGetter && !operation.valueGetter)
      errors.push(`${path}: missing property "valueGetter"`);
    else if (!ignoreValueGetter)
      this.testValue(
        operation.valueGetter,
        errors,
        `${path}.valueGetter`
      );

    if (operation.arguments) {
      operation.arguments.forEach((arg, index) => {
        this.testArgument(
          arg,
          errors,
          `${path}.arguments[${index}]`
        );
      });
    }
  }

  private static testTransformer(
    operation: IResolverOperationTransformer,
    errors: string[],
    path: string,
    ignoreValueGetter = false
  ): void {

    if (!operation.transformer)
      errors.push(`${path}: missing property "transformer"`);

    try {
      JWTransformer.get(operation.transformer);
    } catch {
      errors.push(`${path}: transformer "${operation.transformer}" not registered`);
    }

    if (!ignoreValueGetter && !operation.valueGetter)
      errors.push(`${path}: missing property "valueGetter"`);
    else if (!ignoreValueGetter)
      this.testValue(
        operation.valueGetter,
        errors,
        `${path}.valueGetter`
      );

    if (operation.arguments) {
      operation.arguments.forEach((arg, index) => {
        this.testArgument(
          arg,
          errors,
          `${path}.arguments[${index}]`
        );
      });
    }
  }

  private static testConditionGroup(
    operation: IResolverOperationConditionGroup,
    errors: string[],
    path: string,
    ignoreValueGetter = false
  ): void {

    if (
      operation.operator !== 'AND' &&
      operation.operator !== 'OR'
    ) {
      errors.push(
        `${path}: invalid operator "${(operation as any).operator}"`
      );
    }

    if (!Array.isArray(operation.conditions)) {
      errors.push(`${path}: conditions must be an array`);
      return;
    }

    if (operation.conditions.length === 0)
      errors.push(`${path}: conditions array cannot be empty`);

    operation.conditions.forEach((condition, index) => {
      this.testOperation(
        condition,
        errors,
        `${path}.conditions[${index}]`
      );
    });
  }

  private static testConditional(
    operation: IResolverConditionalOperation,
    errors: string[],
    path: string,
    ignoreValueGetter = false
  ): void {

    if (!operation.condition)
      errors.push(`${path}: missing property "condition"`);
    else
      this.testOperation(
        operation.condition,
        errors,
        `${path}.condition`,
        ignoreValueGetter
      );

    if (!operation.trueOperation)
      errors.push(`${path}: missing property "trueOperation"`);
    else
      this.testOperation(
        operation.trueOperation,
        errors,
        `${path}.trueOperation`,
        ignoreValueGetter
      );

    if (!operation.falseOperation)
      errors.push(`${path}: missing property "falseOperation"`);
    else
      this.testOperation(
        operation.falseOperation,
        errors,
        `${path}.falseOperation`,
        ignoreValueGetter
      );
  }

  private static testSwitch(
    operation: IResolverOperationSwitch,
    errors: string[],
    path: string,
    ignoreValueGetter = false
  ): void {

    if (!operation.switch)
      errors.push(`${path}: missing property "switch"`);
    else
      this.testValue(
        operation.switch,
        errors,
        `${path}.switch`
      );

    if (!Array.isArray(operation.cases)) {
      errors.push(`${path}: cases must be an array`);
      return;
    }

    operation.cases.forEach((caseItem, index) => {

      if (!caseItem)
        return errors.push(`${path}.cases[${index}]: case is invalid`);

      if (!caseItem.value)
        errors.push(`${path}.cases[${index}]: missing property "value"`);
      else
        this.testValue(
          caseItem.value,
          errors,
          `${path}.cases[${index}].value`,
        );

      if (!caseItem.operation)
        errors.push(`${path}.cases[${index}]: missing property "operation"`);
      else
        this.testOperation(
          caseItem.operation,
          errors,
          `${path}.cases[${index}].operation`,
          ignoreValueGetter
        );
    });

    if (operation.defaultCase) {
      this.testOperation(
        operation.defaultCase,
        errors,
        `${path}.defaultCase`,
        ignoreValueGetter
      );
    }
  }

  private static testValue(
    value: TValue,
    errors: string[],
    path: string
  ): void {

    if (!value || typeof value !== 'object') {
      errors.push(`${path}: invalid value`);
      return;
    }

    switch (value.type) {

      case 'static':
        return;

      case 'resolver':

        if (!value.resolver)
          errors.push(`${path}: missing resolver name`);

        if (!JWResolver.getResolver(value.resolver))
          errors.push(
            `${path}: resolver "${value.resolver}" not registered`
          );

        break;

      case 'operation':

        if (!value.operation)
          errors.push(`${path}: missing operation`);
        else
          this.testOperation(
            value.operation,
            errors,
            `${path}.operation`
          );

        break;

      default:
        errors.push(`${path}: invalid value type "${(value as any).type}"`);
    }
  }

  private static testArgument(
    argument: TArgumentType,
    errors: string[],
    path: string
  ): void {

    if (!argument || typeof argument !== 'object') {
      errors.push(`${path}: invalid argument`);
      return;
    }

    switch (argument.type) {

      case 'static':
        return;

      case 'resolver':

        if (!argument.resolver)
          errors.push(`${path}: missing resolver name`);

        if (!JWResolver.getResolver(argument.resolver))
          errors.push(
            `${path}: resolver "${argument.resolver}" not registered`
          );

        break;

      case 'operation':

        if (!argument.operation)
          errors.push(`${path}: missing operation`);
        else
          this.testOperation(
            argument.operation,
            errors,
            `${path}.operation`
          );

        break;

      case 'callback':

        if (!argument.callback)
          errors.push(`${path}: callback is missing`);
        else {


          this.testOperation(
            argument.callback as TOperationType,
            errors,
            `${path}.callback`,
            true
          );
        }

        break;

      default:
        errors.push(`${path}: invalid argument type "${(argument as any).type}"`);
    }
  }
}