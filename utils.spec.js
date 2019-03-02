const utils = require('./utils');

describe('isObject', () => {
  it('null', () => {
    expect(utils.isObject(null)).toBeFalsy();
  });
  it('numbers', () => {
    expect(utils.isObject(1)).toBeFalsy();
  })
  it('strings', () => {
    expect(utils.isObject('a')).toBeFalsy();
  })
  it('object', () => {
    expect(utils.isObject({})).toBeTruthy();
  })
  it('array', () => {
    expect(utils.isObject([])).toBeFalsy();
  })
  it('function', () => {
    expect(utils.isObject(function(){})).toBeFalsy();
  })
});

describe('isInteger', () => {
  it('integer', () => {
    expect(utils.isInteger('1')).toBeTruthy();
  });
  it('text', () => {
    expect(utils.isInteger('1asd')).toBeFalsy();
    expect(utils.isInteger('asd213')).toBeFalsy();
    expect(utils.isInteger('asd1qwe')).toBeFalsy();
  });
  it('empty string', () => {
    expect(utils.isInteger('')).toBeFalsy();
  });
});

describe('clone', () => {
  it('null', () => {
    expect(utils.clone(null)).toBe(null);
  });
  it('clones simple object', () => {
    const original = {
      foo: 5,
      bar: 'cat'
    };
    const dup = utils.clone(original);
    expect(dup).toEqual(original);
  });
  it('clones nested object', () => {
    const original = {
      foo: 5,
      bar: {
        foo: 7
      }
    };
    const dup = utils.clone(original);
    expect(dup).toEqual(original);
    expect(dup.bar.foo).toBe(7);
    expect(original.bar).not.toBe(dup.bar);
  });
  it('an array', () => {
    expect(utils.clone([1, 2, 3])).toEqual([1, 2, 3]);
  })
  it ('object with array property', () => {
    const src = {
      foo: [1, 2, 3]
    };
    const dup = utils.clone(src);
    expect(dup).toEqual(src);
    expect(dup).not.toBe(src);
  })
});