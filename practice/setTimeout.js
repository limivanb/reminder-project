// async function

console.log('Starting app...');

// setTimeout(function(){
//   console.log('Inside first setTimeOut');
// }, 1000);

setTimeout(function(){
  console.log('Inside first setTimeOut');
}, 100);

setTimeout(function(){
  console.log('Inside second setTimeOut');
}, 50);

console.log('Finishing app.');
