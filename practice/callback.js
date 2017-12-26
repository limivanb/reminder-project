var displayMessage = ((name, callback) => {
  var user = {
    name: name,
    job: 'Programmer'
  };

  console.log(`My name is ${name}`)

  if (callback){
    setTimeout(() => {
      callback(user);
    }, 2000);
  }
});

// displayMessage("Juan", (user) => {
//   console.log(`My job is ${user.job}`);
// });


displayMessage("Juan", (user) => {
  console.log(user.job);
});

displayMessage("Ivan");
