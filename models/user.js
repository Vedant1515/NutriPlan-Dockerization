const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  password: String,
  age: Number,
  height: Number,
  weight: Number,
  bmi: Number,
  dietType: String,
  goalType: String,
  activityLevel: String
});

module.exports = mongoose.model('User', userSchema);