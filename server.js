const PORT = process.env.PORT || 4000;

const express = require('express');
const hbs = require('hbs');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
// const dateTime = require('node-datetime');

var {Event} = require('./models/event');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/reminders', { useMongoClient: true });
mongoose.Promise = global.Promise;

var db = mongoose.connection;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.get('/', (request, response) => {
  response.render('home.hbs');
});

app.post('/events', (request, response) => {
  console.log(JSON.stringify(request.body,undefined,2));
  var event = new Event({
    event_date: request.body.event_date,
    event_name: request.body.event_name,
    location: request.body.location
  });

  event.save().then((doc) => {
    response.send(doc);
  }, (e) => {
    response.status(400).send(e);
  });
});

app.get('/events/list', (request, response) => {

  Event.find().then((events) => {
    response.status(200).send({events});
  });

});

app.get('/events', (request, response) => {

  Event.find().then((events) => {
    response.render('events.hbs', {
      current_date: new Date().toString(),
      event_list: events
    })
  });

});

app.get('/events/:id', (request, response) => {
  var id = request.params.id;

  if (!ObjectID.isValid(id)){
    response.status(404).send({
      message: 'ID not valid'
    });
  }

  // Event.findById(id).then((event) => {
  //   response.status(200).send({event});
  // });

  Event.find(id).then((event) => {
    response.status(200).send({event});
  });

});




app.get('/announcements', (request, response) => {
  response.render('announcements.hbs');
});



app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}.`);
});
