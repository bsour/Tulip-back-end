const mongoose = require("mongoose");
const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: false,
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
      required: false,
    },
    state: {
      type: String,
      required: false,
    },
    gender: {
      type: String,
      required: false,
    },
    gender_preference: {
      type: String,
      required: false,
    },
    age: {
      type: Number,
      required: false,
    },
    age_preference: {
      min: {
        type: Number,
        required: false,
      },
      max: {
        type: Number,
        required: false,
      },
    },
    //url to dummy profile picture, could have a default avatar or app logo
    photo_url: {
      type: String,
      required: false,
    },
    passion: {
      type: Array,
      required: false,
    },
    // let's discuss
    match_with: {
      type: String,
      required: false,
    },
    match_id: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: false,
  }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
