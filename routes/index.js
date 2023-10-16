const express = require("express");

const router = express.Router();
const appC = require("../controllers/AppController");
const userC = require("../controllers/ProfileController");

// link '/' to  AppController
router.get("/", appC.getHomepage);

// link '/profile' to
router.get("/profile");
// link '/students/:major' to StudentsController

module.exports = router;
