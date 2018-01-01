var fs = require('fs');
var os = require('os');

var today = new Date();
var current_date = today.toDateString();
var hour = today.getHours();
var minutes = today.getMinutes();
var seconds = today.getSeconds();
var current_datetime = current_date + " " + hour + ":" + minutes + ":" + seconds;

var network = os.networkInterfaces();
var cpu = os.cpus();

// console.log(`CPU: ${cpu[0].model}`);
// console.log(`IP address: ${network.en0[1].address}`);

fs.appendFileSync('computer.log', current_datetime + '\r\n');
fs.appendFileSync('computer.log', `CPU: ${cpu[0].model}` + '\r\n');
fs.appendFileSync('computer.log', `IP address: ${network.en0[1].address}` + '\r\n');
