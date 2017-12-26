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

// Events REST API
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

app.get('/events', (request, response) => {

  Event.find().then((events) => {
    response.status(200).send({events});
  },(e) => {
    response.status(400).send(e);
  });

});

app.get('/events/:id', (request, response) => {
  var id = request.params.id;

  if (!ObjectID.isValid(id)){
    response.status(404).send({
      message: 'ID not valid'
    });
  }

  Event.findById(id).then((event) => {
    if (!event){
      return response.status(404).send({
        message: 'ID not exist in mongodb'
      });
    }

    response.status(200).send({event});
  }).catch((e) => {
    response.status(400).send();
  });

});

app.delete('/events/:id', (request, response) => {
  var id = request.params.id;

  if (!ObjectID.isValid(id)){
    response.status(404).send({
      message: 'ID not valid'
    });
  }

  Event.findByIdAndRemove(id).then((event) => {
    if (!event){
      return response.status(404).send({
        message: 'ID not exist in mongodb'
      });
    }

    response.status(200).send({
      success: true,
      event
    });
  }).catch((e) => {
    response.status(400).send();
  });
});


app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}.`);
});
