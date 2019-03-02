const utils = require('./utils');

// given an iterator (object)
// walk down the keys described in path
// path is in a format like 'foo.bar'
// return an object { it, next } where it is
// the second last step and next is the last
// path component
// Example
// Given
// src = {
//   foo: {
//     bar: {
//       baz: 6
//     }
//   }
// }
// walk(src, 'foo.bar.bat') would return
// {
//   it: { baz: 6 },
//   next: 'bat'
// }
// The intention is that the caller can then 
// add/delete/update/set 'bat' at location it.
function walk(it, path) {
  const next = path[0];
  if (path.length === 1) {
    return { it: it, next };
  }
  if (utils.isObject(it[next])) {
    it = it[next];
  } else if (Array.isArray(it[next])) {
    it = it[next];
  } else {
    if (utils.isInteger(path[1])) {
      it[next] = [];
    } else {
      it[next] = {};
    }
    it = it[next];
  }
  return walk(it, path.slice(1));
}

// clone the source object
// walk the path
// invoke the action on the last step of the path
// return the cloned object
function do_walk(src, path, action) {
  const dup = utils.clone(src);
  pathComponents = path.split('.');
  const { it, next } = walk(dup, pathComponents);
  action(it, next);
  return dup;
}

function set(src, path, value) {
  return do_walk(src, path, (it, next) => it[next] = value);
}

function push(src, path, value) {
  return do_walk(src, path, (it, next) => {
    if (it[next] === undefined) {
      it[next] = [];
    }
    if (Array.isArray(it[next])) {
      it[next].push(value);
    }
  });
}

function del(src, path) {
  return do_walk(src, path, (it, next) => delete it[next]);
}

module.exports = {
  set, push, del
};
