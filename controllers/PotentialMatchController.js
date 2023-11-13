const User = require("../models/UserModel");

class PotentialMatchController {
  static async displayPotentialMatch(req, res) {
    //add location filter
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
      //add gender filter
      const preferredGender = currentUser.gender_preference;
      const genderMatches = nearbyMatches.filter((match) => {
        return match.gender === preferredGender;
      });
      //add age filter
      const minAge = currentUser.age_preference.min;
      const maxAge = currentUser.age_preference.max;
      const ageMatches = genderMatches.filter((match) => {
        return match.age >= minAge && match.age <= maxAge;
      });

      // filter by Match's preferences
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

      // already in conversation filter
      const notAlreadyInConversation = preferencesMatch.filter((match) => {
        return !match.conversation.id;
      });

      //add hobbies filter
      const currentUserHobbies = new Set(currentUser.passion);
      const hobbyMatches = notAlreadyInConversation.map((match) => {
        const sharedHobbies = match.passion.filter((hobby) =>
          currentUserHobbies.has(hobby)
        );
        const score = sharedHobbies.length;
        return match;
      });
      //sorting scores in descending order
      hobbyMatches.sort((a, b) => b.score - a.score);

      //res.status(200).send(nearbyMatches);
      //res.status(200).send(genderMatches);
      //res.status(200).send(ageMatches);
      res.status(200).send(hobbyMatches);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
    //console.log("nearbyMatches filter implemented!");
    //console.log("genderMatches filter implemented!");
    //console.log("ageMatches filter implemented!");
    console.log("hobbyMatches filter implemented!");
  }
}

module.exports = PotentialMatchController;
