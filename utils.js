function isObject(val) {
  if (val === null) {
    return false;
  }
  if (Array.isArray(val)) {
    return false;
  }
  return (typeof val === 'object'); 
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
  if (Array.isArray(src)) {
    return src.map(x => clone(x));
  }
  return src; // primitive
}

module.exports = {
  isObject,
  isInteger,
  clone
};
