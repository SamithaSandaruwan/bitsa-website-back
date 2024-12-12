const express = require("express");
const router = express.Router();
const User = require("../models/User");

//add a new member
router.post("/add", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = new User({ username, email, password });
    await user.save();
    res.status(201).json({ message: "Member added successfully", user });
  } catch (error) {
    res.status(400).json({ message: "Error adding member", error });
  }
});

//find member using email
router.get("/:email", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    if (!user) {
      return res.status(404).json({ message: "Member not found" });
    }
    res.status(200).json({ message: "Member added successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Error adding member", error });
  }
});

// PUT: Update a member by email
router.put("/:email", async (req, res) => {
  const { name, password } = req.body;

  try {
    const updatedUser = await User.findOneAndUpdate(
      { email: req.params.email },
      { username, password },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "Member not found" });
    }

    res
      .status(200)
      .json({ message: "Member updated successfully", user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Error updating member", error });
  }
});

// DELETE: Delete a member by email
router.delete("/:email", async (req, res) => {
  try {
    const deletedUser = await User.findOneAndDelete({
      email: req.params.email,
    });

    if (!deletedUser) {
      return res.status(404).json({ message: "Member not found" });
    }

    res.status(200).json({ message: "Member deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting member", error });
  }
});

module.exports = router;
