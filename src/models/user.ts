import mongoose = require("mongoose");
import passportLocalMongoose = require("passport-local-mongoose");
const Schema = mongoose.Schema;

const User = new Schema({
  email: {
    type: String,
    default: "",
  },
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", User);
