const utils = require('./utils');

function clone(src) {
  if (utils.isObject(src)) {
    return Object.keys(src).reduce((dup, key) => {
      dup[key] = clone(src[key]);
      return dup;
    }, {});
  }
  if (Array.isArray(src)) {
    return src.map(x => clone(x));
  }
  return src; // primitive
}

function set(src, path, value) {
  const dup = clone(src);

  function _set(it, path, value) {
    const next = path[0];
    if (path.length === 1) {
      it[next] = value;
      return;
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
    _set(it, path.slice(1), value);
  }
  pathComponents = path.split('.');
  _set(dup, pathComponents, value);
  return dup;
}

module.exports = {
  set,
  clone
};
