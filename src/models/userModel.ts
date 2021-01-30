import mongoose = require('mongoose');
import passportLocalMongoose = require('passport-local-mongoose');
const modelNames = require('./modelNames');
const Schema = mongoose.Schema;

const User = new Schema({
  email: {
    type: String,
    default: '',
  },
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model(modelNames.USER_MODEL_NAME, User);
