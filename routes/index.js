const express = require("express");

const router = express.Router();
const appC = require("../controllers/AppController");
const userC = require("../controllers/ProfileController");
const {
  userProfileValidation,
  handleValidationResult,
  userLogInValidation,
  handleLogInValidationResult,
} = require("./validationHelpers");
const auth = require("../middleware/auth");

// get landing page
router.get("/", appC.getHomepage);

// get all users
router.get("/profile", userC.showUsers);

// get a specific user
router.get("/profile/:id", auth, userC.showUser);

// create new user
router.post(
  "/profile",
  userProfileValidation,
  handleValidationResult,
  (req, res) => {
    // If validation passes, continue to the route handler
    console.log("User created!");
    //userC.saveToDatabase(req, res);
  }
);

// delete a specific user
router.delete("/profile/:id", userC.deleteUser);

// Login validation
router.post(
  "/auth",
  userLogInValidation,
  handleLogInValidationResult,
  (req, res) => {
    console.log("logged in");
  }
);

module.exports = router;
