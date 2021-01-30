import mongoose = require('mongoose');
const Schema = mongoose.Schema;
const modelNames = require('./modelNames');

const movieSchema = new Schema({
  theatre: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  timing: {
    type: Date,
    default: '',
  },
  no_of_seats: {
    type: Number,
    default: 40,
  },
  seats: [
    {
      seat_no: String,
      ticket_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: modelNames.TICKET_MODEL_NAME,
        default: null,
      },
      status: {
        type: String,
        default: 'open',
      },
    },
  ],
});

module.exports = mongoose.model(modelNames.MOVIE_MODEL_NAME, movieSchema);
