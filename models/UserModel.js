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
    photo_url: {
      type: String,
      required: false,
    },
    passion: {
      type: Array,
      required: false,
    },
    bio: {
      type: String,
      required: false,
    },
    looking_for: {
      type: String,
      required: false,
    },
    // this is the id of the match objected for the two users in match and ready to chat.
    conversation: {
      id: {
        type: String,
        required: false,
      },
      in_match: {
        type: Boolean,
        default: false,
      },
    },
  },
  {
    timestamps: false,
  }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
