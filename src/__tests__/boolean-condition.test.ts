import { describe, it, expect, beforeAll } from '@jest/globals';
import { __BOOLEAN_IS_FALSE__, __BOOLEAN_IS_TRUE__, JWResolver, TOperationType } from '..';


describe('boolean condition', () => {
  it('should return true if the condition is true', async () => {
    const condition: TOperationType = {
      $condition: {
        name: __BOOLEAN_IS_TRUE__,
        value: { $static: true }
      }
    }
    expect(await JWResolver.run(condition)).toBe(true);
  });

  it('should return false if the condition is false', async () => {
    const condition: TOperationType = {
      $condition: {
        name: __BOOLEAN_IS_TRUE__,
        value: { $static: false }
      }
    }
    expect(await JWResolver.run(condition)).toBe(false);
  });


  
  it('should return true if the condition is true', async () => {
    const condition: TOperationType = {
      $condition: {
        name: __BOOLEAN_IS_FALSE__,
        value: { $static: false }
      }
    }
    expect(await JWResolver.run(condition)).toBe(true);
  });

  it('should return false if the condition is false', async () => {
    const condition: TOperationType = {
      $condition: {
        name: __BOOLEAN_IS_FALSE__,
        value: { $static: true }
      }
    }
    expect(await JWResolver.run(condition)).toBe(false);
  });
});
