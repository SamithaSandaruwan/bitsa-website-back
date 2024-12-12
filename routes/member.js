const express = require('express');
const router = express.Router();
const User = require('../models/User');

//add a new member
router.post('/add', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = new User({ username, email, password });
    await user.save();
    res.status(201).json({ message: 'Member added successfully',user});
  } catch (error) {
    res.status(400).json({ message: 'Error adding member', error });
  }
})

module.exports = router;