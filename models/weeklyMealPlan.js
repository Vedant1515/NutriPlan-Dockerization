// models/weeklyMealPlan.js
const mongoose = require('mongoose');

const dailyPlanSchema = new mongoose.Schema({
  day: String,
  meals: [{
    name: String,
    diet: String,
    calories: Number,
    ingredients: [String],
    instructions: String,
    nutrients: {
      protein: String,
      fat: String,
      carbs: String
    }
  }]
});

const weeklyMealPlanSchema = new mongoose.Schema({
  userEmail: String,
  createdAt: { type: Date, default: Date.now },
  dailyPlans: [dailyPlanSchema],
  totalCaloriesPerDay: Number
});

module.exports = mongoose.model('WeeklyMealPlan', weeklyMealPlanSchema);
