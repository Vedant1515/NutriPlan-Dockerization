const Meal = require('../models/meals');
const User = require('../models/user');
const { calculateBMR, adjustCalories } = require('../utils/calculation');

exports.generateMealPlan = async (req, res) => {
  
  try {
    const userDetails = await User.find({email: req.body.email}, 'age weight height gender goal activityLevel dietType allergies mealsPerDay').exec()
    const user = userDetails[0];
    const bmr = calculateBMR(user);
    const targetCalories = adjustCalories(bmr, user.goal, user.activityLevel);
    let queryObj = {
      diet: user.dietType,
      allergies: { $nin: user.allergies },
      calories: { 
        $lte: targetCalories / user.mealsPerDay + 100,
        $gte: targetCalories / user.mealsPerDay - 100 
      }
    };

    const meals = await Meal.find(queryObj, 'name diet calories ingredients instructions nutrients').limit(user.mealsPerDay);
    res.json({ mealPlan: meals, totalCalories: targetCalories });
  } catch (error) {
    res.status(500).json({ message: 'Failed to generate meal plan', error: error.message });
  }
};