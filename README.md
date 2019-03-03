# immutable

My immutable project. Similar to object path immutable.

Clones the source object and allows you to set individual
propertes on the data structure by specifying a path using
a notation like a.b.c. You can also use arrays by specifying
paths like a.2.c.

## Supported functions:

* set
* del
* push

Why? Just because I wanted to, and it looked like a fun little
exercise.

## Examples:

### set

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

### push

```
immutable.push({ foo: [] }, 'foo', 5)
```

returns

```
{
  foo: [5]
}
```

### del

```
immutable.del({ foo: { bar: 6, baz: [1, 2, 3] } }, 'foo.bar', 5)
```

returns

```
{
  foo: {
    baz: [1, 2, 3]
  }
}
```

## Interesting results

The final code makes use of a do_walk function that walks a path like
'foo.bar.baz' and applies some action at the end of the walk. The functions
set, del and push then reduce to simply writing the action function that
describes what action is taken at the last position in the walk. This allows
a lot of code to be reused amongst all the functions.

The set function is simply

```
function set(src, path, value) {
  return do_walk(src, path, (it, next) => it[next] = value);
}
```

The action function here is

```
(it, next) => it[next] = value
```

which is basically setting a property on the final object in the walk.
