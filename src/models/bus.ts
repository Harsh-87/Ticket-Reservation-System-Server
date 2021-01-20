import mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Bus = new Schema({
  from: {
    type: String,
    default: '',
  },
  to: {
    type: String,
    default: '',
  },
  Company: {
    type: String,
    default: '',
  },
  departure: {
    type: Date,
    default: '',
  },
  arrival: {
    type: Date,
    default: '',
  },
  bus_no: {
    type: String,
    default: '',
  },
  seats: [],
});

module.exports = mongoose.model('Bus', Bus);
