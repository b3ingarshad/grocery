const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    set: (value) => value.toLowerCase(),
  },
  email: {
    type: String,
    required: true,
    unique: true,
    set: (value) => value.toLowerCase(),
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "vendor", "admin"],
    default: "user",
  },
});

module.exports = mongoose.model("User", UserSchema);
