const User = require("../models/UserModel");
const Match = require("../models/MatchModel");
const { v4: uuidv4 } = require("uuid");

class MatchesController {
  static async displayPotentialMatch(req, res) {
    // send invite
    try {
      const { id } = req.params;
      const currentUser = await User.findById(id, "-password");
      const allUsers = await User.find({}, "-password").exec();
      const nearbyMatches = allUsers.filter((match) => {
        if (match.city === currentUser.city) {
          return true;
        } else if (match.state === currentUser.state) {
          return true;
        }
        return false;
      });

      // accept invite
      const preferredGender = currentUser.gender_preference;
      const genderMatches = nearbyMatches.filter((match) => {
        return match.gender === preferredGender;
      });

      // decline invite
      const minAge = currentUser.age_preference.min;
      const maxAge = currentUser.age_preference.max;
      const ageMatches = genderMatches.filter((match) => {
        return match.age >= minAge && match.age <= maxAge;
      });

      // end conversation
      const preferencesMatch = ageMatches.filter((match) => {
        if (
          (currentUser.gender === match.gender_preference ||
            match.gender_preference === "Any") &&
          currentUser.age >= match.age_preference.min &&
          currentUser.age <= match.age_preference.max
        ) {
          return true;
        }
        return false;
      });

      // get all matches
      const currentUserPassions = new Set(currentUser.passion);
      const passionMatches = notAlreadyInConversation.map((match) => {
        const sharedPassions = match.passion.filter((passion) =>
          currentUserPassions.has(passion)
        );
        const score = sharedPassions.length;
        return match;
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = MatchesController;
