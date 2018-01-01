var displayInfo = (person) => {
  // console.log(JSON.stringify(person, undefined, 2));
  console.log(`Name: ${person.firstname} ${person.lastname}`);
  console.log(`Programming: ${person.programming}`);
}

const person = {
  firstname: 'Ivan',
  lastname: 'Lim',
  programming: ['Node.js', 'PHP', 'C/C++']
};

displayInfo(person);
