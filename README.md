# JSON Workflow

A lightweight TypeScript library for building, executing and composing JSON-based workflows.

JSON Workflow allows you to describe conditions, transformations, branching logic, switches, pipelines and custom resolvers entirely in JSON objects. The same workflow can run on both frontend and backend environments.


---

[![Test](https://github.com/dmytro-vydysh/json-workflow/actions/workflows/node.js.yml/badge.svg)](https://github.com/dmytro-vydysh/json-workflow/actions/workflows/node.js.yml)
[![codecov](https://codecov.io/gh/dmytro-vydysh/json-workflow/graph/badge.svg)](https://codecov.io/gh/dmytro-vydysh/json-workflow)

--

# Features

* Conditions
* Transformers
* If / Else branching
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
    value: {
      $static: 5
    },
    arguments: [
      {
        $static: 10
      }
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

---

# Transformers

Transformers receive a value and return a transformed value.

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
    value: {
      $static: 10
    },
    arguments: [
      {
        $static: 5
      }
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
          value: {
            $static: 5
          },
          arguments: [
            {
              $static: 3
            }
          ]
        }
      }
    },
    arguments: [
      {
        $static: 10
      }
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
        {
          $static: 1
        }
      ]
    },
    arguments: [
      {
        $static: "name"
      }
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
    value: {
      $static: 5
    },
    arguments: [
      {
        $static: 10
      }
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

# Conditional (If / Else)

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
    ]
  }
}
```

---

# Pipelines

Execute multiple operations sequentially.

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

# Real World Example

Filter completed todos belonging to user 10.

```ts
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
