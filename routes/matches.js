const express = require("express");
const matchesRouter = express.Router();
const MatchesC = require("../controllers/MatchesController");
const Match = require("../models/MatchModel");
const User = require("../models/UserModel");
const { v4: uuidv4 } = require("uuid");
const auth = require("../middleware/auth");

// Route for sending invite
matchesRouter.post("/send_invite", auth, async (req, res) => {
  try {
    const senderId = req.body.senderId;
    const receiverId = req.body.receiverId;

    const senderAlreadyMatched = await User.findOne({
      _id: senderId,
      "conversation.id": { $exists: true },
    });
    const receiverAlreadyMatched = await User.findOne({
      _id: receiverId,
      "conversation.id": { $exists: true },
    });

    if (
      senderAlreadyMatched &&
      receiverAlreadyMatched &&
      senderAlreadyMatched.conversation.id ===
        receiverAlreadyMatched.conversation.id
    ) {
      return res
        .status(400)
        .json({ message: "Users are already in a match with each other" });
    } else if (senderAlreadyMatched || receiverAlreadyMatched) {
      return res
        .status(400)
        .json({ message: "One of the users is already in a match" });
    }

    const existingInvite = await Match.findOne({
      user_1: senderId,
      user_2: receiverId,
      status: "pending",
    });

    if (existingInvite) {
      return res.status(400).json({ message: "Invite has already been sent" });
    }

    // Create a new match object
    const newMatch = new Match({
      user_1: senderId,
      user_2: receiverId,
      status: "pending",
      match_id: uuidv4(),
    });

    await newMatch.save();

    res.status(200).json({ message: "Invite sent!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
});

// Route for accepting invite
matchesRouter.patch("/accept_match", auth, async (req, res) => {
  try {
    const matchId = req.body.matchId; // Get the match ID
    const receiverId = req.body.receiverId; // Get the user ID accepting the match

    // get sender id
    const inviteMatch = await Match.findOne({ match_id: matchId });
    const senderId = inviteMatch.user_1;

    // check if sender is in a conversation
    const senderAlreadyMatched = await User.findOne({
      _id: senderId,
      "conversation.id": { $exists: true },
    });

    if (senderAlreadyMatched) {
      return res.status(400).json({ message: "Sender is already in a match" });
    }

    // Update the match's status to "accepted"
    const updatedMatch = await Match.findOneAndUpdate(
      { match_id: matchId, user_2: receiverId },
      { status: "accepted" },
      { new: true }
    );

    if (!updatedMatch) {
      return res.status(404).json({ message: "Match not found." });
    }

    // Update the user schemas for both users with the match ID
    const updatedUsers = await User.updateMany(
      { _id: { $in: [updatedMatch.user_1, updatedMatch.user_2] } },
      {
        conversation: {
          id: updatedMatch._id,
          in_match: true,
        },
      }
    );

    res.status(200).json({
      message: "Match accepted",
      user_1: updatedMatch.user_1,
      user_2: updatedMatch.user_2,
      conversation_id: updatedMatch._id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
});

// Route for declining invite
matchesRouter.patch("/decline_match", auth, async (req, res) => {
  try {
    const matchId = req.body.matchId;
    const receiverId = req.body.receiverId;

    // Update the match's status to "declined"
    const updatedMatch = await Match.findOneAndUpdate(
      { match_id: matchId, user_2: receiverId },
      { status: "declined" },
      { new: true }
    );

    if (!updatedMatch) {
      return res.status(404).json({ message: "Match not found." });
    }

    res.status(200).json({
      message: "Match declined",
      matchId: updatedMatch.match_id,
      user_1: updatedMatch.user_1,
      user_2: updatedMatch.user_2,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
});

// Route for ending conversation
matchesRouter.patch("/end_conversation", auth, async (req, res) => {
  try {
    const conversationId = req.body.conversationId;
    const userId = req.body.userId;

    // Update the match's status to "ended"
    const updatedMatch = await Match.findByIdAndUpdate(
      conversationId,
      { status: "ended" },
      { new: true }
    );

    if (!updatedMatch) {
      return res.status(404).json({ message: "Match not found." });
    }

    // Update the user's conversation information
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $unset: {
          "conversation.id": "",
        },
        $set: {
          "conversation.in_match": false,
        },
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found." });
    }

    // Update the other user's conversation information
    const otherUserId =
      updatedMatch.user_1 === userId
        ? updatedMatch.user_2
        : updatedMatch.user_1;
    const otherUser = await User.findByIdAndUpdate(
      otherUserId,
      {
        $unset: {
          "conversation.id": "",
        },
        $set: {
          "conversation.in_match": false,
        },
      },
      { new: true }
    );

    if (!otherUser) {
      return res.status(404).json({ message: "Other user not found." });
    }

    res.status(200).json({ message: "Conversation left successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
});

// Route for getting all invites received
matchesRouter.get("/get_invites/:userId", auth, async (req, res) => {
  try {
    const { userId } = req.params;
    const invitesReceived = await Match.find({
      user_2: userId,
      status: "pending",
    });

    res.status(200).json(invitesReceived);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving invites received" });
  }
});

// Route for getting all invites sent
matchesRouter.get("/invites_sent/:userId", auth, async (req, res) => {
  try {
    const { userId } = req.params;
    const invitesSent = await Match.find({ user_1: userId, status: "pending" });

    res.status(200).json(invitesSent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving invites sent" });
  }
});

// Route for getting all matches objects in the database
matchesRouter.get("/get_all_matches", auth, async (req, res) => {
  try {
    const allMatches = await Match.find({}); // Retrieve all matches from the database

    res.status(200).json(allMatches);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving all Matches" });
  }
});

module.exports = matchesRouter;
