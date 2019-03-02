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
    debugger;
    const result = immutable.set({}, 'foo.2', 5);
    expect(Array.isArray(result.foo)).toBeTruthy();
    expect(result.foo).toEqual([,,5]);
    // expect(result.foo.length).toEqual(3);
    // expect(result.foo[2]).toEqual(5);
  });
});

describe('push', () => {
  it('onto existing array', () => {
    const result = immutable.push({ array: [] }, 'array', 1);
    expect(result.array).toEqual([1]);
  });
  it('into new array', () => {
    const result = immutable.push({ }, 'array', 1);
    expect(result.array).toEqual([1]);
  });
  it('onto nested array', () => {
    const result = immutable.push({ foo: { bar: [1, 2] } }, 'foo.bar', 3);
    expect(result.foo.bar).toEqual([1, 2, 3]);
  });
});
