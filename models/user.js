const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");
const ExpressError = require("../utils/ExpressError");

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

UserSchema.plugin(passportLocalMongoose);

UserSchema.post("save", function (error, doc, next) {
  if (
    error.name === "MongoServerError" &&
    error.code === 11000 &&
    error.keyValue.email
  )
    next(new ExpressError("A user with such an e-mail already exists!"));
  next();
});

module.exports = mongoose.model("User", UserSchema);
