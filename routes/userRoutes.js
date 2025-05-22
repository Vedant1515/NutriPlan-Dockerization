const express = require('express');
const User = require('../models/user');
const router = express.Router();

// ✅ Save user preferences
router.post('/save', async (req, res) => {
  const {
    email,
    age,
    height,
    weight,
    gender,
    dietType,
    allergies,
    mealsPerDay,
    goal,
    activityLevel
  } = req.body;

  if (!email) return res.status(400).json({ message: 'Email is required' });

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Update preference fields
    user.age = age;
    user.height = height;
    user.weight = weight;
    user.gender = gender;
    user.dietType = dietType;
    user.allergies = allergies;
    user.mealsPerDay = mealsPerDay;
    user.goal = goal;
    user.activityLevel = activityLevel;

    await user.save();
    res.status(200).json({ message: 'Preferences saved successfully' });
  } catch (err) {
    console.error('SAVE error:', err);
    res.status(500).json({ message: 'Failed to save preferences' });
  }
});

// ✅ Get whether preferences are filled
router.get('/get', async (req, res) => {
  const { email } = req.query;

  if (!email) {
    return res.status(400).json({ message: 'Email query parameter is required' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) return res.json({ exists: false });

    const hasPreferences = (
      user.age && user.height && user.weight && user.gender &&
      user.dietType && user.mealsPerDay && user.goal && user.activityLevel
    );

    res.json({ exists: !!hasPreferences });
  } catch (err) {
    console.error('Error checking user existence:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
