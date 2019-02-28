const immutable = require('./immutable');

describe('set', () => {
  it('returns a new object', () => {
    const src = {};
    const result = immutable.set(src, 'foo', 'bar');
    expect(result).not.toBe(src);
  });
  it('sets foo to be bar', () => {
    const result = immutable.set({}, 'foo', 'bar');
    expect(result.foo).toEqual('bar');
  });
  it('original object unchanged', () => {
    const src = {};
    immutable.set(src, 'foo', 'bar');
    expect(src).toEqual({});
  });
  it('nested property', () => {
    const result = immutable.set({}, 'foo.bar', 5);
    expect(result.foo.bar).toBe(5);
  });
  it('sets nested property on nested property', () => {
    const result = immutable.set({ foo: { cat: 6 } }, 'foo.bar.dude', 5);
    expect(result.foo.bar.dude).toBe(5);
  });
  it('sets value in array', () => {
    const result = immutable.set({ foo: [1, 2, 3] }, 'foo.2', 5);
    expect(result.foo[2]).toBe(5);
  });
  it('sets array', () => {
    const result = immutable.set({}, 'foo.2', 5);
    expect(Array.isArray(result.foo)).toBeTruthy();
    expect(result.foo.length).toEqual(3);
    expect(result.foo[2]).toEqual(5);
  });
});

describe('clone', () => {
  it('null', () => {
    expect(immutable.clone(null)).toBe(null);
  });
  it('clones simple object', () => {
    const original = {
      foo: 5,
      bar: 'cat'
    };
    const dup = immutable.clone(original);
    expect(dup).toEqual(original);
  });
  it('clones nested object', () => {
    const original = {
      foo: 5,
      bar: {
        foo: 7
      }
    };
    const dup = immutable.clone(original);
    expect(dup).toEqual(original);
    expect(dup.bar.foo).toBe(7);
    expect(original.bar).not.toBe(dup.bar);
  });
  it('an array', () => {
    expect(immutable.clone([1, 2, 3])).toEqual([1, 2, 3]);
  })
  it ('object with array property', () => {
    const src = {
      foo: [1, 2, 3]
    };
    const dup = immutable.clone(src);
    expect(dup).toEqual(src);
    expect(dup).not.toBe(src);
  })
});

describe('isObject', () => {
  it('null', () => {
    expect(immutable.isObject(null)).toBeFalsy();
  });
  it('numbers', () => {
    expect(immutable.isObject(1)).toBeFalsy();
  })
  it('strings', () => {
    expect(immutable.isObject('a')).toBeFalsy();
  })
  it('object', () => {
    expect(immutable.isObject({})).toBeTruthy();
  })
  it('array', () => {
    expect(immutable.isObject([])).toBeFalsy();
  })
  it('function', () => {
    expect(immutable.isObject(function(){})).toBeFalsy();
  })
});

describe('isArray', () => {
  it('null', () => {
    expect(immutable.isArray(null)).toBeFalsy();
  });
  it('numbers', () => {
    expect(immutable.isArray(1)).toBeFalsy();
  })
  it('strings', () => {
    expect(immutable.isArray('a')).toBeFalsy();
  })
  it('object', () => {
    expect(immutable.isArray({})).toBeFalsy();
  })
  it('array', () => {
    expect(immutable.isArray([])).toBeTruthy();
  })
  it('function', () => {
    expect(immutable.isArray(function(){})).toBeFalsy();
  })
});
describe('isInteger', () => {
  it('integer', () => {
    expect(immutable.isInteger('1')).toBeTruthy();
  });
  it('text', () => {
    expect(immutable.isInteger('1asd')).toBeFalsy();
    expect(immutable.isInteger('asd213')).toBeFalsy();
    expect(immutable.isInteger('asd1qwe')).toBeFalsy();
  });
  it('empty string', () => {
    expect(immutable.isInteger('')).toBeFalsy();
  });
});