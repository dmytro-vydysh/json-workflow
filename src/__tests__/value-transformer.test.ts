import { describe, it, expect } from '@jest/globals';
import {
  JWResolver,
  TOperationType,
  __TRANSFORMER__,
  __STATIC__,
  __OPERATION__,
  __RESOLVER__,
  __CONDITION__,
  __ARRAY_INCLUDES__,
  __ARRAY_NOT_INCLUDES__,
  __ARRAY_EVERY__,
  __ARRAY_SOME__,
  __ARRAY_IS_EMPTY__,
  __ARRAY_IS_NOT_EMPTY__,
  __CALLBACK__,
  __NUMBER_IS_EVEN__,
  __ARRAY_MAP__,
  __ARRAY_FILTER__,
  __NUMBER_GTE__,
  __OBJECT_GET_KEY__,
  __NUMBER_LTE__,
  __NUMBER_BETWEEN__
} from '..';


describe('transform value inside callback', () => {
  it('should return true if all people are between 18 and 50 y o', async () => {
    const people = [
      { name: 'John', age: 16 },
      { name: 'Emma', age: 17 },
      { name: 'Liam', age: 18 },
      { name: 'Olivia', age: 19 },
      { name: 'Noah', age: 20 },
      { name: 'Sophia', age: 21 },
      { name: 'James', age: 22 },
      { name: 'Isabella', age: 23 },
      { name: 'Lucas', age: 24 },
      { name: 'Mia', age: 25 },
      { name: 'Benjamin', age: 26 },
      { name: 'Charlotte', age: 27 },
      { name: 'Henry', age: 28 },
      { name: 'Amelia', age: 29 },
      { name: 'Alexander', age: 30 },
      { name: 'Evelyn', age: 31 },
      { name: 'Daniel', age: 32 },
      { name: 'Harper', age: 33 },
      { name: 'Michael', age: 34 },
      { name: 'Abigail', age: 35 },
      { name: 'William', age: 36 },
      { name: 'Emily', age: 37 },
      { name: 'Jacob', age: 38 },
      { name: 'Ella', age: 39 },
      { name: 'Ethan', age: 40 },
      { name: 'Avery', age: 41 },
      { name: 'Matthew', age: 42 },
      { name: 'Scarlett', age: 43 },
      { name: 'David', age: 44 },
      { name: 'Grace', age: 45 },
      { name: 'Joseph', age: 46 },
      { name: 'Chloe', age: 47 },
      { name: 'Samuel', age: 48 },
      { name: 'Victoria', age: 49 },
      { name: 'Andrew', age: 50 },
      { name: 'Lily', age: 51 },
      { name: 'Christopher', age: 52 },
      { name: 'Hannah', age: 53 },
      { name: 'Joshua', age: 54 },
      { name: 'Zoey', age: 55 }
    ]
    const operation: TOperationType = {
      $transformer: {
        name: __ARRAY_FILTER__,
        value: { $static: people },
        arguments: [
          {
            $callback: {
              $and: {
                operations: [
                  {
                    $condition: {
                      name: __NUMBER_GTE__,
                      valueTransformer: {
                        $transformer: {
                          name: __OBJECT_GET_KEY__,
                          arguments: [{ $static: 'age' }]
                        }
                      },
                      arguments: [{ $static: 18 }]
                    }
                  },
                  {
                    $condition: {
                      name: __NUMBER_LTE__,
                      valueTransformer: {
                        $transformer: {
                          name: __OBJECT_GET_KEY__,
                          arguments: [{ $static: 'age' }]
                        }
                      },
                      arguments: [{ $static: 50 }]
                    }
                  }
                ]
              }
            }
          }
        ]
      }
    }
    const operation_filtered = await JWResolver.run(operation) as Array<{ name: string; age: number }>;
    const filtered = people.filter(person => person.age >= 18 && person.age <= 50)
    const resolver_ok = operation_filtered.length === filtered.length;
    const all_between_18_and_50 = operation_filtered.every(person => person.age >= 18 && person.age <= 50);
    expect(all_between_18_and_50 && resolver_ok).toBe(true);
  })
})