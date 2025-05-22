const mongoose = require('mongoose');
const User = require('./models/user');
const Meal = require('./models/meals');

mongoose.connect("mongodb://localhost:27017/nutriplan").then(async () => {
  console.log("Connected to MongoDB");

  // await User.create({
  //   firstName: 'Test',
  //   lastName: 'User',
  //   email: 'test5@nutriplan.com',
  //   password: await require('bcryptjs').hash('password123', 10),
  //   age: 25,
  //   height: 168,
  //   weight: 58,
  //   gender: "female",
  //   dietType: "vegetarian",
  //   allergies: [
  //     "nuts",
  //     "dairy"
  //   ],
  //   mealsPerDay: 2,
  //   activityLevel: "low",
  //   goal: "weight loss"
  // });

  const meals = [
    //vegetarian
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
    },
    {
      name: "Lentil Soup with Whole Grain Bread",
      diet: "vegetarian",
      allergies: [],
      calories: 620,
      ingredients: ["lentils", "carrots", "celery", "onions", "whole grain bread"],
      nutrients: {
        protein: "20g",
        fat: "9g",
        carbs: "85g"
      },
      instructions: "Simmer lentils with vegetables. Serve with toasted bread."
    },
    {
      name: "Stuffed Bell Peppers",
      diet: "vegetarian",
      allergies: ["dairy"],
      calories: 780,
      ingredients: ["bell peppers", "rice", "cheddar cheese", "tomatoes", "onions"],
      nutrients: {
        protein: "18g",
        fat: "15g",
        carbs: "90g"
      },
      instructions: "Stuff peppers with rice, cheese, and veggies. Bake until soft."
    },
    {
      name: "Spinach and Feta Wrap",
      diet: "vegetarian",
      allergies: ["dairy", "gluten"],
      calories: 710,
      ingredients: ["whole wheat wrap", "spinach", "feta cheese", "hummus"],
      nutrients: {
        protein: "16g",
        fat: "20g",
        carbs: "65g"
      },
      instructions: "Fill wrap with spinach, feta, and hummus. Roll and grill lightly."
    },
    {
      name: "Chickpea Curry with Rice",
      diet: "vegetarian",
      allergies: [],
      calories: 800,
      ingredients: ["chickpeas", "coconut milk", "tomatoes", "spices", "basmati rice"],
      nutrients: {
        protein: "22g",
        fat: "18g",
        carbs: "95g"
      },
      instructions: "Cook chickpeas in coconut curry. Serve over rice."
    },
    {
      name: "Peanut Noodle Bowl",
      diet: "vegetarian",
      allergies: ["nuts"],
      calories: 850,
      ingredients: ["noodles", "peanut sauce", "carrots", "cabbage", "edamame"],
      nutrients: {
        protein: "25g",
        fat: "22g",
        carbs: "100g"
      },
      instructions: "Toss cooked noodles with veggies and peanut sauce."
    },
    {
      name: "Veggie Pasta Primavera",
      diet: "vegetarian",
      allergies: ["gluten"],
      calories: 480,
      ingredients: [
        "penne pasta",
        "zucchini",
        "bell peppers",
        "cherry tomatoes",
        "parmesan cheese"
      ],
      nutrients: {
        protein: "14g",
        fat: "10g",
        carbs: "65g"
      },
      instructions: "Cook pasta and sauté vegetables. Mix together and top with cheese.",
    },
    {
      name: "Mushroom Risotto",
      diet: "vegetarian",
      allergies: ["dairy"],
      calories: 440,
      ingredients: [
        "arborio rice",
        "mushrooms",
        "onion",
        "vegetable broth",
        "parmesan cheese"
      ],
      nutrients: {
        protein: "13g",
        fat: "15g",
        carbs: "55g"
      },
      instructions: "Slowly cook rice with broth and sautéed mushrooms, then stir in cheese.",
    },
    {
      name: "Greek Salad Wrap",
      diet: "vegetarian",
      allergies: ["gluten", "dairy"],
      calories: 360,
      ingredients: [
        "whole wheat wrap",
        "feta cheese",
        "cucumber",
        "olives",
        "tomatoes"
      ],
      nutrients: {
        protein: "10g",
        fat: "18g",
        carbs: "35g"
      },
      instructions: "Combine ingredients in a wrap and serve cold.",
    },
    {
      name: "Spinach and Feta Omelette",
      diet: "vegetarian",
      allergies: ["eggs", "dairy"],
      calories: 320,
      ingredients: [
        "eggs",
        "spinach",
        "feta cheese",
        "olive oil"
      ],
      nutrients: {
        protein: "20g",
        fat: "22g",
        carbs: "5g"
      },
      instructions: "Whisk eggs and cook with spinach and feta until set.",
    },

    //vegan
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
      name: "Vegan Buddha Bowl",
      diet: "vegan",
      allergies: [],
      calories: 780,
      ingredients: ["quinoa", "chickpeas", "avocado", "spinach", "sweet potato"],
      nutrients: {
        protein: "22g",
        fat: "18g",
        carbs: "92g"
      },
      instructions: "Roast sweet potato. Combine all ingredients in a bowl and serve."
    },
    {
      name: "Tofu Stir-Fry",
      diet: "vegan",
      allergies: ["soy"],
      calories: 650,
      ingredients: ["tofu", "broccoli", "bell peppers", "soy sauce", "brown rice"],
      nutrients: {
        protein: "20g",
        fat: "12g",
        carbs: "70g"
      },
      instructions: "Stir-fry tofu and vegetables. Serve with rice."
    },
    {
      name: "Vegan Lentil Tacos",
      diet: "vegan",
      allergies: [],
      calories: 600,
      ingredients: ["lentils", "taco shells", "lettuce", "tomatoes", "avocado"],
      nutrients: { protein: "20g", fat: "18g", carbs: "70g" },
      instructions: "Cook lentils with spices. Fill taco shells with lentils, veggies, and avocado."
    },
    {
      name: "Vegan Chickpea Stew",
      diet: "vegan",
      allergies: [],
      calories: 750,
      ingredients: ["chickpeas", "tomatoes", "spinach", "onions", "garlic"],
      nutrients: { protein: "24g", fat: "14g", carbs: "85g" },
      instructions: "Simmer all ingredients until well cooked and flavors blend."
    },

    //keto
    {
      name: "Zucchini Noodles with Pesto",
      diet: "keto",
      allergies: ["nuts"],
      calories: 600,
      ingredients: ["zucchini", "olive oil", "basil", "parmesan", "pine nuts"],
      nutrients: {
        protein: "14g",
        fat: "40g",
        carbs: "20g"
      },
      instructions: "Spiralize zucchini. Toss with pesto sauce. Serve raw or lightly sautéed."
    },
    {
      name: "Egg and Avocado Plate",
      diet: "keto",
      allergies: [],
      calories: 720,
      ingredients: ["eggs", "avocado", "olive oil", "tomatoes"],
      nutrients: {
        protein: "18g",
        fat: "55g",
        carbs: "10g"
      },
      instructions: "Boil eggs, slice avocado and tomatoes. Drizzle with olive oil."
    },
    {
      name: "Keto Cauliflower Fried Rice",
      diet: "keto",
      allergies: ["eggs"],
      calories: 560,
      ingredients: ["cauliflower", "eggs", "soy sauce", "green onions", "carrots"],
      nutrients: { protein: "18g", fat: "35g", carbs: "15g" },
      instructions: "Sauté grated cauliflower with eggs and vegetables. Season with soy sauce."
    },
    {
      name: "Avocado Chicken Salad",
      diet: "keto",
      allergies: [],
      calories: 680,
      ingredients: ["chicken breast", "avocado", "olive oil", "spinach", "cucumber"],
      nutrients: { protein: "40g", fat: "45g", carbs: "10g" },
      instructions: "Grill chicken and mix with sliced avocado and vegetables."
    },

    //paleo
    {
      name: "Grilled Chicken with Veggies",
      diet: "paleo",
      allergies: [],
      calories: 810,
      ingredients: ["chicken breast", "zucchini", "carrots", "olive oil", "spices"],
      nutrients: {
        protein: "40g",
        fat: "28g",
        carbs: "30g"
      },
      instructions: "Grill chicken and vegetables. Season with herbs and spices."
    },
    {
      name: "Sweet Potato Hash",
      diet: "paleo",
      allergies: [],
      calories: 580,
      ingredients: ["sweet potato", "eggs", "onions", "bell peppers"],
      nutrients: {
        protein: "16g",
        fat: "22g",
        carbs: "50g"
      },
      instructions: "Sauté chopped sweet potatoes and veggies. Top with fried egg."
    },
    {
      name: "Paleo Baked Cod with Veggies",
      diet: "paleo",
      allergies: ["fish"],
      calories: 720,
      ingredients: ["cod fillet", "zucchini", "bell peppers", "olive oil", "lemon"],
      nutrients: { protein: "38g", fat: "25g", carbs: "28g" },
      instructions: "Bake cod with vegetables and olive oil. Drizzle with lemon before serving."
    },
    {
      name: "Paleo Turkey Meatballs with Zoodles",
      diet: "paleo",
      allergies: [],
      calories: 690,
      ingredients: ["ground turkey", "zucchini", "tomato sauce", "onion", "garlic"],
      nutrients: { protein: "35g", fat: "22g", carbs: "25g" },
      instructions: "Bake turkey meatballs and serve over spiralized zucchini with tomato sauce."
    },

    //balanced
    {
      name: "Grilled Salmon with Brown Rice",
      diet: "balanced",
      allergies: ["fish"],
      calories: 830,
      ingredients: ["salmon", "brown rice", "spinach", "lemon"],
      nutrients: {
        protein: "35g",
        fat: "25g",
        carbs: "70g"
      },
      instructions: "Grill salmon. Serve with steamed rice and spinach, topped with lemon juice."
    },
    {
      name: "Turkey Wrap with Hummus",
      diet: "balanced",
      allergies: ["gluten"],
      calories: 690,
      ingredients: ["whole wheat wrap", "turkey slices", "lettuce", "hummus"],
      nutrients: {
        protein: "28g",
        fat: "16g",
        carbs: "55g"
      },
      instructions: "Layer wrap with turkey, lettuce, and hummus. Roll and serve."
    },
    {
      name: "Grilled Chicken with Quinoa Salad",
      diet: "balanced",
      allergies: [],
      calories: 890,
      ingredients: ["grilled chicken", "quinoa", "cucumber", "tomato", "olive oil"],
      nutrients: { protein: "40g", fat: "20g", carbs: "75g" },
      instructions: "Grill chicken and serve with quinoa mixed with chopped vegetables and olive oil."
    },
    {
      name: "Tofu Stir-fry with Brown Rice",
      diet: "balanced",
      allergies: ["soy"],
      calories: 940,
      ingredients: ["tofu", "brown rice", "broccoli", "carrots", "soy sauce"],
      nutrients: { protein: "30g", fat: "18g", carbs: "90g" },
      instructions: "Stir-fry tofu with vegetables and soy sauce. Serve with steamed brown rice."
    },
    {
      name: "Lentil Curry with Basmati Rice",
      diet: "balanced",
      allergies: [],
      calories: 870,
      ingredients: ["lentils", "basmati rice", "onions", "tomatoes", "spices"],
      nutrients: { protein: "25g", fat: "12g", carbs: "100g" },
      instructions: "Cook lentils in spiced tomato-onion base and serve with basmati rice."
    },
    {
      name: "Beef and Sweet Potato Bowl",
      diet: "balanced",
      allergies: [],
      calories: 960,
      ingredients: ["lean beef", "sweet potatoes", "kale", "olive oil"],
      nutrients: { protein: "35g", fat: "22g", carbs: "85g" },
      instructions: "Sauté beef and vegetables, serve with roasted sweet potatoes."
    },
    {
      name: "Chickpea and Avocado Wrap",
      diet: "balanced",
      allergies: ["gluten"],
      calories: 920,
      ingredients: ["chickpeas", "avocado", "whole wheat wrap", "lettuce", "lemon juice"],
      nutrients: { protein: "20g", fat: "25g", carbs: "85g" },
      instructions: "Mash chickpeas and avocado, spread on wrap with lettuce, roll and serve."
    },
    {
      name: "Egg White Omelette with Toast",
      diet: "balanced",
      allergies: [],
      calories: 510,
      ingredients: ["egg whites", "whole grain toast", "spinach"],
      nutrients: { protein: "28g", fat: "10g", carbs: "45g" },
      instructions: "Cook egg white omelet with spinach and serve with toast."
    },
    {
      name: "Veggie Stir-Fry with Tofu",
      diet: "balanced",
      allergies: ["soy"],
      calories: 540,
      ingredients: ["tofu", "bell peppers", "broccoli", "olive oil", "brown rice"],
      nutrients: { protein: "22g", fat: "15g", carbs: "65g" },
      instructions: "Sauté tofu and veggies with olive oil. Serve over brown rice."
    },
    {
      name: "Chicken Caesar Salad (Light)",
      diet: "balanced",
      allergies: ["dairy"],
      calories: 610,
      ingredients: ["grilled chicken", "romaine", "light Caesar dressing", "parmesan", "croutons"],
      nutrients: { protein: "35g", fat: "18g", carbs: "30g" },
      instructions: "Toss grilled chicken and salad with dressing and parmesan. Top with croutons."
    },
    {
      name: "Vegetable Pasta with Marinara",
      diet: "balanced",
      allergies: ["gluten"],
      calories: 590,
      ingredients: ["whole grain pasta", "zucchini", "tomatoes", "onions", "marinara sauce"],
      nutrients: { protein: "18g", fat: "12g", carbs: "75g" },
      instructions: "Cook pasta and stir with sautéed vegetables and marinara sauce."
    },
    {
      name: "Tuna Salad Sandwich",
      diet: "balanced",
      allergies: ["fish", "gluten"],
      calories: 580,
      ingredients: ["whole wheat bread", "canned tuna", "lettuce", "low-fat mayo"],
      nutrients: { protein: "28g", fat: "14g", carbs: "48g" },
      instructions: "Mix tuna with mayo, serve in sandwich with lettuce."
    },
    {
      name: "Chickpea Quinoa Bowl",
      diet: "balanced",
      allergies: [],
      calories: 600,
      ingredients: ["quinoa", "chickpeas", "spinach", "cherry tomatoes", "lemon dressing"],
      nutrients: { protein: "20g", fat: "16g", carbs: "65g" },
      instructions: "Combine cooked quinoa and chickpeas with veggies and drizzle with dressing."
    },
    {
      name: "Egg and Avocado Toast",
      diet: "balanced",
      allergies: ["eggs", "gluten"],
      calories: 500,
      ingredients: ["whole grain bread", "eggs", "avocado", "pepper"],
      nutrients: { protein: "21g", fat: "22g", carbs: "45g" },
      instructions: "Toast bread, top with mashed avocado and poached egg."
    },
    {
      name: "Turkey Lettuce Wraps",
      diet: "balanced",
      allergies: [],
      calories: 530,
      ingredients: ["ground turkey", "lettuce leaves", "carrots", "onions", "spices"],
      nutrients: { protein: "30g", fat: "15g", carbs: "25g" },
      instructions: "Cook turkey with spices, wrap in lettuce with veggies."
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


