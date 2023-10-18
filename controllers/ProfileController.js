const User = require("../models/UserModel");

class ProfileController {
  static showProfile(request, response) {
    response.statusCode = 200;
    response.setHeader("Content-Type", "text/plain");
    response.send("will get Tuliper's profile datas");
  }

  static async showUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async showUser(req, res) {
    try {
      const user = getUser(req, res);
      res.send(user.name);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
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

async function getUser(req, res, next) {
  try {
    subscriber = await User.findById(req.params.id);
    if (subscriber == null) {
      return res.status(404).json({ message: 'Cannot find User'});
    }
  } catch (error) {
    return res.status(500).json({ message: error.message});
  }
  //res.user = user;
  next();
}
module.exports = ProfileController;
