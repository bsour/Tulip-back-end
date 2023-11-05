const express = require("express");
const matchesRouter = express.Router();
const Match = require("../models/MatchModel");
const User = require("../models/UserModel");
const { v4: uuidv4 } = require('uuid');

// Route for sending an invite and creating a match
matchesRouter.post("/send_invite", async (req, res) => {
  try {
    const senderId = req.body.senderId;
    const receiverId = req.body.receiverId;

    // Perform validation, e.g., checking if both senderId and receiverId are valid

    // Check if a user is in a match already exists between the users (in either direction)
    // const existingMatch = await Match.findOne({
    //   $or: [
    //     { user_1: senderId, match_id: { $exists: true } },
    //     { user_2: senderId, match_id: { $exists: true } },
    //     { user_1: receiverId, match_id: { $exists: true } },
    //     { user_2: receiverId, match_id: { $exists: true } },
    //   ],
    //   status: "accepted",
    // });

    // if (existingMatch) {
    //   return res
    //     .status(400)
    //     .json({ message: "one of the users is already in a match" });
    // }

    const senderAlreadyMatched = await User.findOne({ _id: senderId, 'conversation.id': { $exists: true } });
    const receiverAlreadyMatched = await User.findOne({ _id: receiverId, 'conversation.id': { $exists: true } });

    if (senderAlreadyMatched && receiverAlreadyMatched && senderAlreadyMatched.conversation.id === receiverAlreadyMatched.conversation.id) {
      return res
        .status(400)
        .json({ message: "Users are already in a match with each other" });
    } else if (senderAlreadyMatched || receiverAlreadyMatched) {
      return res
        .status(400)
        .json({ message: "One of the users is already in a match" });
    }

    // Create a new match invitation
    const newMatch = new Match({
      user_1: senderId,
      user_2: receiverId,
      status: "pending",
      match_id: uuidv4(), //assign the match ID to the sender
    });

    await newMatch.save();
    // update both users' match_id and in_match fields
    // await User.updateMany(
    //   { _id: { $in: [senderId, receiverId] } },
    //   { match_id: newMatch._id, in_match: true }
    // );

    // You can also implement other logic here, such as notifying the receiver about the invite

    res.status(200).json({ message: "Invite sent and match created." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
});

// Route for accepting a match
matchesRouter.patch("/accept_match", async (req, res) => {
  try {
    const matchId = req.body.matchId; // Get the match ID
    const receiverId = req.body.receiverId; // Get the user ID accepting the match

    // Update the match's status to "accepted"
    const updatedMatch = await Match.findByIdAndUpdate(
      matchId,
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

    // const bothUsers = await User.find({
    //   _id: { $in: [updatedMatch.user_1, updatedMatch.user_2] },
    //   in_match: true,
    // });

    // if (bothUsers.length !== 2) {
    //   return res
    //     .status(500)
    //     .json({ message: "both users are not in the same match" });
    // }

    // const userIds = bothUsers.map((user) => user._id);
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

module.exports = matchesRouter;
