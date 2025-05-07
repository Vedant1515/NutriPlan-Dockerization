const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const User = require('../models/user');
const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  try {
    console.log(req.body);
    const { password, email, firstName, lastName } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ firstName, lastName, email, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: 'Registered successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Login
router.post('/login', passport.authenticate('local'), (req, res) => {
  res.json({ message: 'Login successful', user: req.user });
});

// Logout
router.get('/logout', (req, res) => {
  req.logout(err => {
    if (err) return res.status(500).send(err);
    res.json({ message: 'Logged out' });
  });
});

// Check Session
router.get('/me', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ user: req.user });
  } else {
    res.status(401).json({ message: 'Not logged in' });
  }
});

module.exports = router;