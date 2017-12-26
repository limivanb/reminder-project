var mongoose = require('mongoose');

var eventSchema = mongoose.Schema({
  event_name: {
    type: String,
    required: true,
    minlength: 5,
    trim: true,
    unique: true
  },
  event_date: {
    type: Date,
    required: true
  },
  location: {
    type: String,
    required: true
  }
});

var EventModel = mongoose.model('Event', eventSchema);

module.exports = {EventModel};
