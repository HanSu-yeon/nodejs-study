const calc = require('sample-package'); //1. sample-package 불러오기

const a = 17;
const b = 3;

console.log('a + b =', calc.add(a, b));
console.log('a - b =', calc.sub(a, b));
console.log('a * b =', calc.multi(a, b));
console.log('a / b =', calc.div(a, b));
