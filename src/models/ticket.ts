import mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Ticket = new Schema(
  {
    seat_no: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      default: 'In Process',
    },
    details: {
      firstname: {
        type: String,
        default: '',
      },
      lastname: {
        type: String,
        default: '',
      },
      age: {
        type: Number,
        default: 5,
      },
      email: {
        type: String,
        default: '',
      },
      mobile: {
        type: String,
        default: '',
      },
    },
    busId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Bus',
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Ticket', Ticket);
