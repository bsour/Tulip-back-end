const mongoose = require("mongoose");
const MatchSchema = mongoose.Schema(
  {
    participant_1: {
      type: String,
      required: false,
    },
    participant_2: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: false,
  }
);

const Match = mongoose.model("Match", MatchSchema);

module.exports = Match;
