const mongoose = require('mongoose');
const User = require('./models/user');
const Meal = require('./models/meals');

mongoose.connect("mongodb://localhost:27017/nutriplan").then(async () => {
  console.log("Connected to MongoDB");

  await User.create({
    firstName: 'Test',
    lastName: 'User',
    email: 'test5@nutriplan.com',
    password: await require('bcryptjs').hash('password123', 10),
    age: 25,
    height: 168,
    weight: 58,
    gender: "female",
    dietType: "vegetarian",
    allergies: [
      "nuts",
      "dairy"
    ],
    mealsPerDay: 2,
    activityLevel: "low",
    goal: "weight loss"
  });
  const meals = [
    {
      name: "Quinoa Salad",
      diet: "vegetarian",
      allergies: ["nuts"],
      calories: 400,
      ingredients: ["quinoa", "cucumber", "tomatoes", "olive oil"],
      nutrients: { protein: "12g", fat: "15g", carbs: "30g" },
      instructions: "Mix all ingredients and serve cold."
    },
    {
      name: "Grilled Tofu Wrap",
      diet: "vegan",
      allergies: [],
      calories: 450,
      ingredients: ["tofu", "wrap", "lettuce", "sauce"],
      nutrients: { protein: "20g", fat: "10g", carbs: "35g" },
      instructions: "Grill tofu, wrap with lettuce and sauce."
    },
    {
      name: "Greek Yogurt Parfait",
      diet: "vegetarian",
      allergies: ["dairy"],
      calories: 300,
      ingredients: ["greek yogurt", "berries", "granola"],
      nutrients: { protein: "10g", fat: "8g", carbs: "28g" },
      instructions: "Layer yogurt with berries and granola."
    },
    {
      name: "Tofu Veggie Bowl",
      diet: "vegetarian",
      allergies: ["soy"],
      calories: 820,
      ingredients: ["tofu", "broccoli", "brown rice", "carrots", "soy sauce"],
      nutrients: {
        protein: "24g",
        fat: "14g",
        carbs: "70g"
      },
      instructions: "Cook brown rice. Stir-fry tofu and vegetables. Combine and drizzle with soy sauce."
    },
    {
      name: "Grilled Vegetable Quinoa Salad",
      diet: "vegetarian",
      allergies: [],
      calories: 740,
      ingredients: ["quinoa", "zucchini", "bell peppers", "olive oil", "lemon juice"],
      nutrients: {
        protein: "18g",
        fat: "12g",
        carbs: "85g"
      },
      instructions: "Grill vegetables. Cook quinoa. Toss all with olive oil and lemon juice."
    }

  ];
  await Meal.insertMany(meals)
    .then(() => {
      console.log("Sample meals added");
      mongoose.connection.close();
    })
    .catch(err => console.error(err));
  console.log('Seed data added');
  mongoose.disconnect();
});


