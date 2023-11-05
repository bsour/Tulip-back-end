const mongoose = require("mongoose");
const MatchSchema = mongoose.Schema(
  {
    user_1: {
      type: String,
      required: false,
    },
    user_2: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "declined", "ended"],
      default: "pending",
    },
    match_id: {
      type: String,
      required: false,
      // in_match: {
      //   type: Boolean,
      //   default: false,
      //},
    },
  },
  {
    timestamps: false,
  }
);

const Match = mongoose.model("Match", MatchSchema);

module.exports = Match;
