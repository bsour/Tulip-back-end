const express = require("express");
const router = express.Router();
const appC = require("../controllers/AppController");
const userC = require("../controllers/UserController");
const potentialC = require("../controllers/PotentialMatchController");
const {
  userProfileValidation,
  handleValidationResult,
  userLogInValidation,
  handleLogInValidationResult,
} = require("./validationHelpers");
const auth = require("../middleware/auth");

// login validation
router.post(
  "/auth",
  userLogInValidation,
  handleLogInValidationResult,
  (req, res) => {
    console.log("Logged in successfully!");
  }
);

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
    console.log("User created successfully!");
    //userC.createUser(req, res);
  }
);

// get a user by id
router.get("/profile/:id", auth, userC.showUser);

// update a user by id
router.put("/profile/:id", auth, userC.updateUser);

// delete a user by id
router.delete("/profile/:id", auth, userC.deleteUser);

// display potential match page by id
router.get("/potential_match/:id", auth, potentialC.displayPotentialMatch);

module.exports = router;
