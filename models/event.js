var mongoose = require('mongoose');

var Event = mongoose.model('Event', {
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

module.exports = {Event};
