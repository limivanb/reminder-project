// required: Arrays

const months = [
  'January','Febuary','March','April','May','June','July','August','September','October','November','December'
];
const weekdays = [
  'Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'
];

var today = new Date();

var year = today.getFullYear();
var month = months[today.getMonth()];
var day = today.getDate();
var weekday = weekdays[today.getDay()];

console.log(`${weekday} ${month} ${day}, ${year}`);


// additional using JSON object
var current_date = {
  year,
  month,
  day,
  weekday
};

console.log(JSON.stringify(current_date, undefined, 2));
