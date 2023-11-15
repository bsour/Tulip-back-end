const express = require("express");
const matchesRouter = express.Router();
const MatchesC = require("../controllers/MatchesController");
const Match = require("../models/MatchModel");
const User = require("../models/UserModel");
const { v4: uuidv4 } = require("uuid");
const auth = require("../middleware/auth");

// Route for sending invite
matchesRouter.post("/send_invite", auth, MatchesC.sendInvite);

// Route for accepting invite
matchesRouter.patch("/accept_match", auth, MatchesC.acceptInvite);

// Route for declining invite
matchesRouter.patch("/decline_match", auth, MatchesC.declineInvite);

// Route for ending conversation
matchesRouter.patch("/end_conversation", auth, MatchesC.endConversation);

// Route for getting all invites received
matchesRouter.get("/get_invites/:userId", auth, MatchesC.getInvitesReceived);

// Route for getting all invites sent
matchesRouter.get("/invites_sent/:userId", auth, MatchesC.getInvitesSent);

// Route for getting all matches objects in the database
matchesRouter.get("/get_all_matches", auth, MatchesC.getAllMatches);

module.exports = matchesRouter;
