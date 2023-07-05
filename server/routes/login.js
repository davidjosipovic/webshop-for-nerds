const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');

const router = express.Router();

// Login route
router.post('/', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists in the database
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Compare the provided password with the stored password hash
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Set the user ID in the session
    req.session.userId = user.id;

    // Send success response
    res.json({ message: 'Login successful' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Logout route
router.post('/logout', (req, res) => {
  // Destroy the session and clear the user ID
  req.session.destroy();
  res.json({ message: 'Logout successful' });
});

// Check if the user is logged in
router.get('/check', (req, res) => {
  const isLoggedIn = req.session.userId ? true : false;
  res.json({ isLoggedIn });
});

module.exports = router;
