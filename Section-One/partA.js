//Part A: Equivalence
// Write a function called strictEquals(a, b) that returns the same value as a === b.
// Your implementation must not use the === or !== operators.

function strictEquals (a, b) {
    return (Object.is(a,b) ? a || b : false);
}
console.log(strictEquals(1,1))  //returns 1
console.log(strictEquals(1,2))  //returns false

module.exports = strictEquals;