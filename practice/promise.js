// var myPromise = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     reject("dfadfaf");
//   }, 2000);
//
// });
//
// myPromise.then((message) => {
//   console.log(message);
//   console.log("Sucess")
// }, (message, success) => {
//   console.log(message);
// });

var computeSum = (x,y, delay) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (typeof x === 'number' && typeof y === 'number'){
        resolve(x+y);
      }else{
        reject('Must be numbers');
      }
    }, delay);

  });
};

computeSum(20, -23, 2000).then((total) => {
  console.log(`The sum is ${total}`);
}, (error) =>{
  console.log(error);
});
