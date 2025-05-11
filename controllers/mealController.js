const Meal = require('../models/meals');
const User = require('../models/user');
const { calculateBMR, adjustCalories } = require('../utils/calculation');
const calorieMargin = 150;

exports.generateMealPlan = async (req, res) => {

    try {
        const userDetails = await User.find({ email: req.body.email }, 'age weight height gender goal activityLevel dietType allergies mealsPerDay').exec()
        const user = userDetails[0];
        const bmr = calculateBMR(user);
        const targetCalories = adjustCalories(bmr, user.goal, user.activityLevel);
        let queryObj = {
            diet: user.dietType,
            allergies: { $nin: user.allergies },
            calories: {
                $lte: targetCalories / user.mealsPerDay + calorieMargin,
                $gte: targetCalories / user.mealsPerDay - calorieMargin
            }
        };

        const meals = await Meal.find(queryObj, 'name diet calories ingredients instructions nutrients').limit(user.mealsPerDay);
        if (meals.length < user.mealsPerDay) {
            console.log("fallback: loosen calorie range or remove allergy filter temporarily");
            calorieMargin = 200;
            let fallbackQuery = {
                diet: user.dietType,
                calories: { 
                    $lte: targetCalories / user.mealsPerDay + calorieMargin, 
                    $gte: targetCalories / user.mealsPerDay - calorieMargin 
                }
            };
            meals = await Meal.find(fallbackQuery, 'name diet calories ingredients instructions nutrients').limit(user.mealsPerDay);
        }
        res.json({ mealPlan: meals, totalCalories: targetCalories });
        } catch (error) {
            res.status(500).json({ message: 'Failed to generate meal plan', error: error.message });
        }
    };