const express = require("express");
const router = express.Router();
const userC = require("../controllers/UserController");
const potentialC = require("../controllers/PotentialMatchController");
const {
  userProfileValidation,
  handleValidationResult,
  userLogInValidation,
  handleLogInValidationResult,
} = require("../middleware/validationHelpers");
const auth = require("../middleware/auth");

// user login
router.post(
  "/auth",
  userLogInValidation,
  handleLogInValidationResult,
  (req, res) => {
    console.log("Logged in successfully!");
  }
);

// new user sign up
router.post(
  "/profile",
  userProfileValidation,
  handleValidationResult,
  (req, res) => {
    console.log("User created successfully!");
  }
);

// get all users
router.get("/profile", auth, userC.showUsers);

// get a user by id
router.get("/profile/:id", auth, userC.showUser);

// update a user by id
router.put("/profile/:id", auth, userC.updateUser);

// delete a user by id
router.delete("/profile/:id", auth, userC.deleteUser);

// get potential matches by id
router.get("/potential_match/:id", auth, potentialC.displayPotentialMatch);

module.exports = router;
