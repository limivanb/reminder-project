const PORT = process.env.PORT || 4000;

const express = require('express');
const hbs = require('hbs');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
// const dateTime = require('node-datetime');

var {Event} = require('./models/event');
var {EventRouter} = require('./api/events');

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

app.get('/show_events', (request, response) => {

  Event.find().then((events) => {
    response.render('events.hbs', {
      current_date: new Date().toString(),
      event_list: events
    })
  });

});

app.get('/show_announcements', (request, response) => {
  response.render('announcements.hbs');
});

app.use('/events', EventRouter);
// app.use('/api', app.router);


app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}.`);
});
