const PORT = process.env.PORT || 4000;

const express = require('express');
const hbs = require('hbs');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var moment = require('moment');
moment.locale('en');
// const dateTime = require('node-datetime');

var {Event} = require('./models/event');
var {EventRouter} = require('./api/events');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/reminders', { useMongoClient: true });
mongoose.Promise = global.Promise;

var db = mongoose.connection;

hbs.registerHelper('dateFormat', require('handlebars-dateformat'));

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.use('/api/events', EventRouter);

app.get('/', (request, response) => {

  let year = moment().format('GGGG');
  let month = moment().format('M');

  Event.find({
    "event_date": {
      "$gte" : moment(`${year}, ${month}, 1`),
      "$lte" : moment(`${year}, ${month}, 31`)
    }
  }).sort({'event_date': 1}).then((events) => {
    response.render('home.hbs', {
      current_date: new Date().toString(),
      event_list: events
    })
  });

});

app.get('/events', (request, response) => {

  Event.find({}).then((events) => {
    response.render('events.hbs', {
      current_date: new Date().toString(),
      event_list: events
    })
  });

});

app.get('/announcements', (request, response) => {
  response.render('announcements.hbs');
});

// app.use('/api', app.router);


app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}.`);
});
