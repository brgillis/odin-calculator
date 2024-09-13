const script = require('./script');

describe('add', () => {
  test('adds 0 and 0', () => {
    expect(script.add(0, 0)).toBe(0);
  });
  test('adds 1 and 4', () => {
    expect(script.add(1, 4)).toBe(5);
  });
  test('adds 4 and 1', () => {
    expect(script.add(4, 1)).toBe(5);
  });
  test('adds -2 and 2', () => {
    expect(script.add(-2, 2)).toBe(0);
  });
});

describe('subtract', () => {
  test('subtracts 0 and 0', () => {
    expect(script.subtract(0, 0)).toBe(0);
  });
  test('subtracts 1 and 4', () => {
    expect(script.subtract(1, 4)).toBe(-3);
  });
  test('subtracts 4 and 1', () => {
    expect(script.subtract(4, 1)).toBe(3);
  });
  test('subtracts 2 and 2', () => {
    expect(script.subtract(2, 2)).toBe(0);
  });
});

describe('multiply', () => {
  test('multiplies 0 and 0', () => {
    expect(script.multiply(0, 0)).toBe(0);
  });
  test('multiplies 3 and 4', () => {
    expect(script.multiply(3, 4)).toBe(12);
  });
  test('multiplies 4 and -3', () => {
    expect(script.multiply(4, -3)).toBe(-12);
  });
  test('multiplies 0 and 12', () => {
    expect(script.multiply(0, 12)).toBe(0);
  });
});

describe('divide', () => {
  test('divides 1 and 1', () => {
    expect(script.divide(1, 1)).toBe(1);
  });
  test('divides 3 and 2', () => {
    expect(script.divide(3, 2)).toBe(1.5);
  });
  test('divides 2 and -4', () => {
    expect(script.divide(2, -4)).toBe(-0.5);
  });
  test('divides 1 and 0', () => {
    expect(script.divide(1, 0)).toBe(Infinity);
  });
});

describe('operate', () => {
  test('adds 3 and 5', () => {
    expect(script.operate("3", "+", "5")).toBe(8);
  });
  test('subtracts 3 and 5', () => {
    expect(script.operate("3", "-", "5")).toBe(-2);
  });
  test('multiplies 3 and 5', () => {
    expect(script.operate("3", "*", "5")).toBe(15);
  });
  test('divides 3 and 5', () => {
    expect(script.operate("3", "/", "5")).toBe(0.6);
  });
});
