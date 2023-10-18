const mongoose = require("mongoose");
const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please endter a user name"],
    },
    email: {
      type: String,
      required: [true, "Please endter email"],
    },
    password: {
      type: String,
      required: [true, "Please endter password"],
    },
    city: {
      type: String,
      required: [true, "Please endter your city"],
    },
    mobile: {
      type: String,
      required: false,
    },
    gender: {
      type: String,
      required: [true, "Please endter email"],
    },
    age: {
      type: Number,
      required: [true, "Please endter your age"],
    },
    //url to dummy profile picture, could have a default avatar or app logo
    url: {
      type: String,
      required: false,
    },
    show_me: {
      type: String,
      required: true,
    },
    passion: {
      type: Array,
      required: [true, "Please pick your preferences"],
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
