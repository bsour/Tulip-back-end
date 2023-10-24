const User = require("../models/UserModel");

class ProfileController {
  static showProfile(request, response) {
    response.statusCode = 200;
    response.setHeader("Content-Type", "text/plain");
    response.send("will get Tuliper's profile datas");
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

  static async saveToDatabase(request, response) {
    try {
      const user = await User.create(request.body);
      response.status(200).json(user);
    } catch (error) {
      console.log(error.message);
      response.status(500).json({ message: error.message });
    }
  }

  static async updateUser(request, response) {
    try {
      const { id } = request.params;
      const user = await User.findByIdAndUpdate(id, request.body, {
        new: true,
        select: "-password",
      });
      response.status(200).json(user);
    } catch (error) {
      console.log(error.message);
      response.status(500).json({ message: error.message });
    }
  }

  static async deleteUser(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findByIdAndDelete(id, "-password");
      if (!user) {
        return res.status(404).json({ message: "cannot find user" });
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = ProfileController;
