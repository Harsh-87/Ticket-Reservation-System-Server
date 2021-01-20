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
  no_of_seats: {
    type: Number,
    default: 20,
  },
  seats: [
    {
      seat_no: String,
      ticket_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ticket',
        default: null,
      },
      status: {
        type: String,
        default: 'open',
      },
    },
  ],
});

module.exports = mongoose.model('Bus', Bus);
