const User = require("../models/UserModel");

class PotentialMatchController {
  static async displayPotentialMatch(req, res) {
    // add location filter
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

      // add gender filter
      const preferredGender = currentUser.gender_preference;
      const genderMatches = nearbyMatches.filter((match) => {
        return match.gender === preferredGender;
      });

      // add age filter
      const minAge = currentUser.age_preference.min;
      const maxAge = currentUser.age_preference.max;
      const ageMatches = genderMatches.filter((match) => {
        return match.age >= minAge && match.age <= maxAge;
      });

      // add age and gender filter for match
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

      // check if match already in conversation
      const notAlreadyInConversation = preferencesMatch.filter((match) => {
        return !match.conversation.id;
      });

      // add passions filter
      const currentUserPassions = new Set(currentUser.passion);
      const passionMatches = notAlreadyInConversation.map((match) => {
        const sharedPassions = match.passion.filter((passion) =>
          currentUserPassions.has(passion)
        );
        const score = sharedPassions.length;
        return { match, score };
      });

      // sort scores in descending order
      passionMatches.sort((a, b) => b.score - a.score);
      const sortedMatches = passionMatches.map((item) => item.match);

      res.status(200).send(sortedMatches);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }

    console.log("filters implemented!");
  }
}

module.exports = PotentialMatchController;
