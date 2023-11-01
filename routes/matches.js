const express = require("express");
const matchesRouter = express.Router();

// Route for sending an invite and creating a match
matchesRouter.post('/send-invite', async (req, res) => {
  try {
    const senderId = req.body.senderId;
    const receiverId = req.body.receiverId;

    // Perform validation, e.g., checking if both senderId and receiverId are valid

    // Check if a match already exists between the users (in either direction)
    const existingMatch = await Match.findOne({
      $or: [
        { user_1: senderId, user_2: receiverId },
        { user_1: receiverId, user_2: senderId },
      ],
    });

    if (existingMatch) {
      return res.status(400).json({ message: 'Match already exists.' });
    }

    // Create a new match
    const newMatch = new Match({
      user_1: senderId,
      user_2: receiverId,
      status: 'pending', 
      isOngoing: true,
    });

    await newMatch.save();

    // You can also implement other logic here, such as notifying the receiver about the invite

    res.status(200).json({ message: 'Invite sent and match created.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

// Route for accepting a match
matchesRouter.post('/accept-match', async (req, res) => {
  try {
    const matchId = req.body.matchId; // Get the match ID
    const userId = req.body.userId; // Get the user ID accepting the match

    // Update the match's status to "accepted"
    const updatedMatch = await Match.findByIdAndUpdate(matchId, { status: 'accepted' }, { new: true });

    if (!updatedMatch) {
      return res.status(404).json({ message: 'Match not found.' });
    }

    // Update the user schemas for both users with the match ID
    await User.updateMany(
      { _id: { $in: [updatedMatch.user_1, updatedMatch.user_2] } },
      { match_id: updatedMatch._id },
    );

    // You can implement other logic here, such as notifying the other user about the match acceptance

    res.status(200).json({ message: 'Match accepted and updated.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

module.exports = matchesRouter;