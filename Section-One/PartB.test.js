const Square = require('./partB');

test("Sqaure of side lengths 1 x 1 x 1 x 1 should be equal", () => {
    let sq1 = new Square(1,1,1,1);
    expect(sq1.isSquare()).toBe(true);
})

test("Sqaure of side lengths 1 x 2 x 1 x 1 should NOT be equal", () => {
    let sq2 = new Square(1,2,1,1);
    expect(sq2.isSquare()).toBe(false);
})