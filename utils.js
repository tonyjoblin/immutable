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

module.exports = {
  isObject,
  isInteger
};
