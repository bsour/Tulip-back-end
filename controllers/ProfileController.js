class ProfileController {
  static showProfile(request, response) {
    response.statusCode = 200;
    response.setHeader("Content-Type", "text/plain");
    response.send("will get Tuliper's profile datas");
  }

  static saveToDatabase(request, response) {
    console.log(request.body);
    response.send(request.body);
  }
}

module.exports = ProfileController;
