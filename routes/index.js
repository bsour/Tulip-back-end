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
router.get("/profile", auth, userC.showUsers);

// create new user
router.post(
  "/profile",
  userProfileValidation,
  handleValidationResult,
  (req, res) => {
    // If validation passes, continue to the route handler
    console.log("User created successfully!");
    //userC.saveToDatabase(req, res);
  }
);

// get a specific user
router.get("/profile/:id", auth, userC.showUser);

// patch/update a specific user
router.put("/profile/:id", auth, userC.updateUser);

// delete a specific user
router.delete("/profile/:id", userC.deleteUser);

// Login validation
router.post(
  "/auth",
  userLogInValidation,
  handleLogInValidationResult,
  (req, res) => {
    console.log("Logged in successfully!");
  }
);

module.exports = router;
