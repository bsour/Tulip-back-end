const express = require("express");

const router = express.Router();
const appC = require("../controllers/AppController");
const userC = require("../controllers/ProfileController");


// link '/' to  AppController
router.get("/", appC.getHomepage);

// link '/profile' to ProfileController
router.get("/profile", userC.showUsers);

// link '/profile'/:name to ProfileController
router.get("/profile/:id", userC.showUser);

// Try: save data to database
router.post("/profile", userC.saveToDatabase);

// deletes user from database
router.delete("/profile/:id", userC.deleteUser);

module.exports = router;
