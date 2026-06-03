
[![Test](https://github.com/dmytro-vydysh/json-workflow/actions/workflows/node.js.yml/badge.svg)](https://github.com/dmytro-vydysh/json-workflow/actions/workflows/node.js.yml)
[![codecov](https://codecov.io/gh/dmytro-vydysh/json-workflow/graph/badge.svg)](https://codecov.io/gh/dmytro-vydysh/json-workflow)
[![Socket Badge](https://badge.socket.dev/npm/package/json-workflow/0.0.1)](https://badge.socket.dev/npm/package/json-workflow/0.0.1)
[![npm version](https://img.shields.io/npm/v/json-workflow.svg)](https://www.npmjs.com/package/json-workflow)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
---
# JSON Workflow

A lightweight TypeScript library for building, executing and composing JSON-based workflows.

JSON Workflow allows you to describe conditions, transformations, branching logic, switches, pipelines and custom resolvers entirely in JSON objects. The same workflow can run on both frontend and backend environments.


---


# Features

* Conditions
* Transformers 
* If / Then / Else branching
* Switch / Case
* AND / OR condition groups
* Nested operations
* Shared execution context
* Custom resolvers
* Sequential pipelines
* Array callbacks (`map`, `filter`, `reduce`, `some`, `every`)
* Fully asynchronous execution
* TypeScript support
* Frontend and backend compatible

---

# Installation

```bash
npm install json-workflow
```

---

# Quick Start

```ts
import {
  JWResolver,
  __NUMBER_MULTIPLY__
} from "json-workflow";

const result = await JWResolver.run<number>({
  $transformer: {
    name: __NUMBER_MULTIPLY__,
    value: { $static: 5 },
    arguments: [
      { $static: 10 }
    ]
  }
});

console.log(result);
// 50
```

---

# Core Concepts

Every workflow is composed of operations.

Supported operation types:

```ts
$condition
$transformer
$conditional
$switch
$and
$or
$resolver
$pipeline
```

Operations consume values from:

```ts
$static
$resolver
$operation
$context
```
The value is the first, main argument you want to use in a function. Other values are rappresented by "arguments"

---



Arguments consume values from:

```ts
$static
$resolver
$operation
$context
$callback
```


# Transformers

Transformers receive a main value and other arguments, and then return a transformed value.

```ts
{
  $transformer: {
    name: "string.to_upper",
    value: {
      $static: "hello world"
    }
  }
}
```

Result:

```ts
"HELLO WORLD"
```

---

# Conditions

Conditions always return a boolean.

```ts
{
  $condition: {
    name: "number.gt",
    value: { $static: 10 },
    arguments: [
      {  $static: 5 }
    ]
  }
}
```

Result:

```ts
true
```

---

# Nested Operations

The output of an operation can be used as the input of another operation.

```ts
{
  $transformer: {
    name: "number.multiply",
    value: {
      $operation: {
        $transformer: {
          name: "number.add",
          value: { $static: 5 },
          arguments: [
            { $static: 3 }
          ]
        }
      }
    },
    arguments: [
      { $static: 10 }
    ]
  }
}
```

Result:

```ts
80
```

---

# Custom Resolvers

Register custom application-specific functions.

```ts
JWResolver.registerResolver(
  "get_user",
  async (id: number) => {
    return {
      id,
      name: "John Doe"
    };
  }
);
```

Usage:

```ts
{
  $resolver: {
    name: "get_user",
    arguments: [
      {
        $static: 1
      }
    ]
  }
}
```

---

# Resolver Values

Custom resolvers can also be used as value sources.

```ts
{
  $transformer: {
    name: "object.get_key",
    value: {
      $resolver: "get_user",
      $args: [
        { $static: 1 }
      ]
    },
    arguments: [
      { $static: "name" }
    ]
  }
}
```

Result:

```ts
"John Doe"
```

---

# Context

Results can be stored in a shared execution context.

```ts
{
  $transformer: {
    name: "number.multiply",
    value: { $static: 5 },
    arguments: [
      { $static: 10 }
    ],
    save: "result"
  }
}
```

Read a value from context:

```ts
{
  $context: "result"
}
```

Access the entire context:

```ts
{
  $context: "$jwcontext"
}
```

---

# Conditional (If / Then / Else)

```ts
{
  $conditional: {
    $if: {
      $condition: {
        name: "number.gt",
        value: {
          $static: 10
        },
        arguments: [
          {
            $static: 5
          }
        ]
      }
    },
    $then: {
      $transformer: {
        name: "string.to_upper",
        value: {
          $static: "approved"
        }
      }
    },
    $else: {
      $transformer: {
        name: "string.to_upper",
        value: {
          $static: "rejected"
        }
      }
    }
  }
}
```

Result:

```ts
"APPROVED"
```

---

# AND / OR Conditions

## AND

```ts
{
  $and: {
    operations: [
      {
        $condition: {
          name: "number.gt",
          value: {
            $static: 10
          },
          arguments: [
            {
              $static: 5
            }
          ]
        }
      },
      {
        $condition: {
          name: "number.lt",
          value: {
            $static: 10
          },
          arguments: [
            {
              $static: 20
            }
          ]
        }
      }
    ]
  }
}
```

## OR

```ts
{
  $or: {
    operations: [
      ...
    ]
  }
}
```

---

# Switch

```ts
{
  $switch: {
    value: {
      $static: "approved"
    },
    cases: [
      {
        $case: {
          value: {
            $static: "approved"
          },
          $operation: {
            $transformer: {
              name: "string.to_upper",
              value: {
                $static: "approved"
              }
            }
          }
        }
      }
    ],
    $default: {
      $transformer: {
        name: "string.to_lower",
        value: { $static: "NOT APPROVED" }
      }
    }
  }
}
```

---

# Pipelines

Execute multiple operations sequentially and returns a context as object.

```ts
await JWResolver.runSequence([
  {
    $transformer: {
      name: "number.multiply",
      value: {
        $static: 10
      },
      arguments: [
        {
          $static: 5
        }
      ],
      save: "result"
    }
  }
]);
```

Result:

```ts
{
  result: 50
}
```

---

# Array Operations

## Map

```ts
{
  $transformer: {
    name: "array.map",
    value: {
      $static: [" hello ", " world "]
    },
    arguments: [
      {
        $callback: {
          $transformer: {
            name: "string.trim"
          }
        }
      }
    ]
  }
}
```

Result:

```ts
["hello", "world"]
```

## Filter

```ts
{
  $transformer: {
    name: "array.filter",
    value: {
      $static: [1, 2, 3, 4, 5]
    },
    arguments: [
      {
        $callback: {
          $condition: {
            name: "number.gt",
            arguments: [
              {
                $static: 2
              }
            ]
          }
        }
      }
    ]
  }
}
```

Result:

```ts
[3, 4, 5]
```


---

# Value transformer

You can access the "value" inside $callback using another operation inside valueTransformer.\
You'll have the ability to transform the value (which will in turn be injected into the $callback operation,\
for example using $callback as an operation inside array.map/filter/reduce) and override it.

---
``` ts
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
      ...
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
```
---

# Real World Example

Filter completed todos belonging to user 10.

```ts
JWResolver.registerResolver('fetch_todos', async () => {
  let _return: Record<string, any> = {};
  const response = await fetch('https://jsonplaceholder.typicode.com/todos');
  _return.ok = response.ok;
  _return.statusText = response.statusText;

  if (response.ok)
    _return.data = await response.json();

  return _return;
})

const operation = {
  $transformer: {
    name: "array.filter",
    value: {
      $operation: {
        $transformer: {
          name: "object.get_key",
          value: {
            $resolver: "fetch_todos"
          },
          arguments: [
            {
              $static: "data"
            }
          ]
        }
      }
    },
    arguments: [
      {
        $callback: {
          $and: {
            operations: [
              {
                $condition: {
                  name: "boolean.is_true",
                  valueTransformer: {
                    $transformer: {
                      name: "object.get_key",
                      arguments: [
                        {
                          $static: "completed"
                        }
                      ]
                    }
                  }
                }
              },
              {
                $condition: {
                  name: "number.eq",
                  valueTransformer: {
                    $transformer: {
                      name: "object.get_key",
                      arguments: [
                        {
                          $static: "userId"
                        }
                      ]
                    }
                  },
                  arguments: [
                    {
                      $static: 10
                    }
                  ]
                }
              }
            ]
          }
        }
      }
    ]
  }
};
```

---

# Error Handling

Library-specific errors:

```ts
JWOperationError
JWOperationArgumentError
```

Example:

```ts
try {
  await JWResolver.run(operation);
}
catch (error) {
  console.error(error);
}
```

---

# Design Goals

* JSON-first
* Frontend and backend compatible
* Async-first architecture
* Extensible through custom resolvers
* Low-code / no-code friendly
* Predictable execution model
* Deeply nestable workflows
* No code generation required

---

# License

MIT



## Author

- [@dmytro-vydysh](https://github.com/dmytro-vydysh/deep-json-validation)


![Logo](https://dmytrovydysh.com/logo.png)



## Support

For support, email info@dmytrovydysh.com
