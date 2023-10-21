const mongoose = require("mongoose");
const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter a user name"],
    },
    email: {
      type: String,
      required: [true, "Please enter email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please enter password"],
    },
    city: {
      type: String,
      required: [true, "Please enter your city"],
    },
    mobile: {
      type: String,
      required: false,
    },
    gender: {
      type: String,
      required: [true, "Please enter gender"],
    },
    gender_preference: {
      type: String,
      required: [true, "Please enter gender"],
    },
    age: {
      type: Number,
      required: [true, "Please enter your age"],
    },
    age_preference: {
      min: {
        type: Number,
        required: [true, 'Please enter the minimum age preference'],
      },
      max: {
        type: Number,
        required: [true, 'Please enter the maximum age preference'],
      },
    },
    //url to dummy profile picture, could have a default avatar or app logo
    photo_url: {
      type: String,
      required: false,
    },
    hobbies: {
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
