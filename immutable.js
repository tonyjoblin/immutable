function isObject(val) {
  if (val === null) {
    return false;
  }
  if (Array.isArray(val)) {
    return false;
  }
  return (typeof val === 'object'); 
}

function isArray(val) {
  return Array.isArray(val);
}

function isInteger(val) {
  if (isNaN(val)) {
    return false;
  }
  return !isNaN(parseInt(val));
}

function clone(src) {
  if (isObject(src)) {
    return Object.keys(src).reduce((dup, key) => {
      dup[key] = clone(src[key]);
      return dup;
    }, {});
  }
  if (isArray(src)) {
    return src.map(x => clone(x));
  }
  return src; // primitive
}

function set(src, path, value) {
  const dup = clone(src);

  function _set(it, path, value) {
    if (path.length === 1) {
      it[path[0]] = value;
      return;
    }
    if (isObject(it[path[0]])) {
      it = it[path[0]];
    } else if (isArray(it[path[0]])) {
      it = it[path[0]];
    } else {
      if (isInteger(path[1])) {
        it[path[0]] = [];
      } else {
        it[path[0]] = {};
      }
      it = it[path[0]];
    }
    _set(it, path.slice(1), value);
  }
  pathComponents = path.split('.');
  _set(dup, pathComponents, value);
  return dup;
}

module.exports = {
  set,
  clone,
  isObject,
  isArray,
  isInteger
};
