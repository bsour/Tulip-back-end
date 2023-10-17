class ProfileController {
  static showProfile(request, response) {
    response.statusCode = 200;
    response.setHeader("Content-Type", "text/plain");
    response.send("will get Tuliper's profile datas");
  }
}

module.exports = ProfileController;
