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
      //res.status(200).send(nearbyMatches);
      res.status(200).send(genderMatches);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
    //console.log("nearbyMatches filter implemented!");
    console.log("genderMatches filter implemented!");
  }
}

module.exports = PotentialMatchController;
