const Meal = require('../models/meals');
const User = require('../models/user');
const WeeklyMealPlan = require('../models/weeklyMealPlan');
const { calculateBMR, adjustCalories } = require('../utils/calculation');

function sumNutrients(meals) {
    let totalProtein = 0, totalFat = 0, totalCarbs = 0;

    meals.forEach(meal => {
        const parseGrams = val => parseFloat(val.replace('g', '').trim()) || 0;
        totalProtein += parseGrams(meal.nutrients?.protein || "0g");
        totalFat += parseGrams(meal.nutrients?.fat || "0g");
        totalCarbs += parseGrams(meal.nutrients?.carbs || "0g");
    });

    return {
        protein: `${totalProtein}g`,
        fat: `${totalFat}g`,
        carbs: `${totalCarbs}g`
    };
}

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

        // Get reordered days starting from today
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

            // Fallback logic
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

            const totalCalories = meals.reduce((sum, meal) => sum + meal.calories, 0);
            const totalNutrients = sumNutrients(meals);

            weeklyPlan.push({
                day,
                meals,
                totalCalories,
                totalNutrients
            });
        }

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
