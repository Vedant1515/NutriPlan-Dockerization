const express = require('express');
const User = require('../models/user');
const router = express.Router();

// save user preference
router.post('/save', async (req, res) => {
    try {
        const email = req.body.email;
        const updates = req.body;
        delete updates.email;
        const updatedUser = await User.findOneAndUpdate(
          { email: email },         // Filter
          { $set: updates },        // Fields to update
          { new: true }             // Return the updated document
        );
    
        if (!updatedUser) {
          console.log('User not found.');
          res.status(404).json({ message: 'User not found'});
        } else {
          console.log('User updated successfully:', updatedUser);
          res.status(201).json({ message: 'User updated successfully'});
        }
      } catch (err) {
        console.error('Error updating user:', err);
        res.status(400).json({ error: err.message });
      }
});

module.exports = router;