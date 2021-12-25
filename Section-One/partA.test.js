const strictlyEquals = require('./partA');

test('1 and 1 are strictly equal', () => {
    expect(strictlyEquals(1,1)).toBe(1);
})

test('1 and 2 are not strictly equal', () => {
    expect(strictlyEquals(1,2)).toBe(false);
})
