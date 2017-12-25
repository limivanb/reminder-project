var mongoose = require('mongoose');

var eventSchema = mongoose.Schema({
  event_date: {
    type: String,
    required: true
  },
  event_name: {
    type: String,
    required: true,
    minlength: 5,
    trim: true,
    unique: true
  },
  location: {
    type: String,
    required: true
  }
});

var Event = mongoose.model('Event', eventSchema);

module.exports = {Event};
