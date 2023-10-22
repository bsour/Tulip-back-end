const express = require("express");

const router = express.Router();
const appC = require("../controllers/AppController");
const userC = require("../controllers/ProfileController");
const { userProfileValidation, handleValidationResult, userLogInValidation, handleLogInValidationResult } = require("./validationHelpers");
const auth = require("../middleware/auth");

// link '/' to  AppController
router.get("/", appC.getHomepage);

// link '/profile' to ProfileController
router.get("/profile", userC.showUsers);

// link '/profile'/:name to ProfileController
router.get("/profile/:id", auth, userC.showUser);

// Try: save data to database
router.post("/profile", userProfileValidation, handleValidationResult, (req, res) => {
  // If validation passes, continue to the route handler
  console.log("User created!");
  //userC.saveToDatabase(req, res);
});

// deletes user from database
router.delete("/profile/:id", userC.deleteUser);

router.post("/auth", userLogInValidation, handleLogInValidationResult, (req, res) => {
  console.log("logged in");
});

module.exports = router;
