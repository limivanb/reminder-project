// const request = require('request');
//
// request('http://localhost:4000/api/events', function (error, response, body) {
//   // console.log('error:', error); // Print the error if one occurred
//   console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
//
//   if (error){
//     console.log("Error", error);
//   }else{
//     // console.log(`Total documents: ${body.count}`);
//     console.log("Total documents", body.count);
//   }
// });

var rp = require('request-promise');

var options = {
    uri: 'http://localhost:4000/api/events',
    json: true // Automatically parses the JSON string in the response
};

rp(options).then(function (docs) {
    console.log('User has %d documents', docs.count);
    console.log(JSON.stringify(docs.events, undefined, 2));
}).catch(function (err) {

});
