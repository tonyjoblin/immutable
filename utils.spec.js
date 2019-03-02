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