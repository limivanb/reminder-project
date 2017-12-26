var numbers = [1,2,3,4,5];
var letters = ['a','b','c'];

console.log(numbers);
console.log("First element: ", numbers[0]);
console.log("Total: ", numbers.length);

numbers.push(6);
console.log(numbers);

numbers.push("dog");
console.log(numbers);

console.log( numbers.concat(letters));


// more info about array
// http://book.mixu.net/node/ch5.html
