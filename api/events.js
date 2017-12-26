var express = require('express')
var {Event} = require('./../models/event');
const {ObjectID} = require('mongodb');

var EventRouter = express.Router();

EventRouter.post('/', (request, response) => {
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

EventRouter.get('/', (request, response) => {

  Event.find().sort('event_date').then((events) => {

    response.status(200).send({
      count: events.length,
      events
    });
  },(e) => {
    response.status(400).send(e);
  });

});

EventRouter.get('/:id', (request, response) => {
  var id = request.params.id;
  console.log('ID', id);

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

EventRouter.delete('/:id', (request, response) => {
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

module.exports = EventRouter;
