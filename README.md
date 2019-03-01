# immutable

My immutable project. Similar to object path immutable.

Clones the source object and allows you to set individual
propertes on the data structure by specifying a path using
a notation like a.b.c. You can also use arrays by specifying
paths like a.2.c.

## Supported functions:

* set

Why? Just because I wanted to, and it looked like a fun little
exercise.

## Examples:

```
immutable.set({}, 'foo.bar', 5)
```

returns

```
{
  foo: {
    bar: 5
  }
}
```