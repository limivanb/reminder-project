var student = {
  firstname: 'Juan',
  lastname: 'de la Cruz',
  age: 15
};

console.log(student);
console.log(`First Name: ${student.firstname}`);


var person = {
  info: student,
  programming: ['PHP','Node.js', '.NET'],
  service_years: 11
};

console.log(person);
console.log(`Name: ${person.info.lastname}, ${person.info.firstname}`)

console.log(`Programming: ${person.programming}`);

console.log('Listing programming...');
for (var i = 0 ; i < person.programming.length; i++) {
  console.log(person.programming[i]);
}

console.log(JSON.stringify(person, undefined, 2));
