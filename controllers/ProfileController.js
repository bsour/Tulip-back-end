const User = require("../models/UserModel");

class ProfileController {
  static showProfile(request, response) {
    response.statusCode = 200;
    response.setHeader("Content-Type", "text/plain");
    response.send("will get Tuliper's profile datas");
  }

  static async saveToDatabase(request, response) {
    try {
      const user = await User.create(request.body);
      response.status(200).json(user);
    } catch (error) {
      console.log(error.message);
      response.status(500).json({ message: error.message });
    }
  }
}

module.exports = ProfileController;
