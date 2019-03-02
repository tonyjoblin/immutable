const utils = require('./utils');

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

function set(src, path, value) {
  const dup = utils.clone(src);
  pathComponents = path.split('.');
  const { it, next } = walk(dup, pathComponents);
  it[next] = value;
  return dup;
}

function push(src, path, value) {
  const dup = utils.clone(src);

  // function _set(it, path, value) {
  //   const next = path[0];
  //   if (path.length === 1) {
  //     if (it[next] === undefined) {
  //       it[next] = [];
  //     }
  //     if (Array.isArray(it[next])) {
  //       it[next].push(value);
  //     }
  //     return;
  //   }
  //   if (utils.isObject(it[next])) {
  //     it = it[next];
  //   } else if (Array.isArray(it[next])) {
  //     it = it[next];
  //   } else {
  //     if (utils.isInteger(path[1])) {
  //       it[next] = [];
  //     } else {
  //       it[next] = {};
  //     }
  //     it = it[next];
  //   }
  //   _set(it, path.slice(1), value);
  // }

  pathComponents = path.split('.');
  // _set(dup, pathComponents, value);
  const { it, next } = walk(dup, pathComponents);
  if (it[next] === undefined) {
    it[next] = [];
  }
  if (Array.isArray(it[next])) {
    it[next].push(value);
  }
  return dup;
}

module.exports = {
  set, push
};
