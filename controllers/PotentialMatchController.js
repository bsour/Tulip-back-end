const User = require("../models/UserModel");

class PotentialMatchController {
  static displayPotentialMatch(req, res) {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.send("Display filtered potential match HERE!!!!");
  }

  static async showUsers(req, res) {
    try {
      const users = await User.find({}, "-password");
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async showUser(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findById(id, "-password");
      res.status(200).send(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = PotentialMatchController;
