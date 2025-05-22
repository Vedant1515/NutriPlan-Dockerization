const Meal = require('../models/meals');
const User = require('../models/user');
const WeeklyMealPlan = require('../models/weeklyMealPlan');
const { calculateBMR, adjustCalories } = require('../utils/calculation');

exports.generateMealPlan = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email }).exec();
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const bmr = calculateBMR(user);
        const targetCalories = adjustCalories(bmr, user.goal, user.activityLevel);
        const dailyCalorieTarget = targetCalories / user.mealsPerDay;
        const baseMargin = 150;

        // Days of week in order
        const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const todayIndex = new Date().getDay();
        const sortedDays = [...daysOfWeek.slice(todayIndex), ...daysOfWeek.slice(0, todayIndex)];

        const weeklyPlan = [];

        for (let day of sortedDays) {
            let query = {
                diet: user.dietType,
                allergies: { $nin: user.allergies },
                calories: {
                    $lte: dailyCalorieTarget + baseMargin,
                    $gte: dailyCalorieTarget - baseMargin
                }
            };

            let meals = await Meal.find(query).limit(user.mealsPerDay);

            // Fallback if not enough meals found
            if (meals.length < user.mealsPerDay) {
                let fallbackQuery = {
                    diet: user.dietType,
                    calories: {
                        $lte: dailyCalorieTarget + 200,
                        $gte: dailyCalorieTarget - 200
                    }
                };
                meals = await Meal.find(fallbackQuery).limit(user.mealsPerDay);
            }

            weeklyPlan.push({
                day,
                meals
            });
        }

        // Save to DB
        const savedPlan = new WeeklyMealPlan({
            userEmail: user.email,
            dailyPlans: weeklyPlan,
            totalCaloriesPerDay: targetCalories
        });

        await savedPlan.save();

        res.json({ message: 'Weekly meal plan generated', weeklyMealPlan: savedPlan });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to generate weekly meal plan', error: error.message });
    }
};
