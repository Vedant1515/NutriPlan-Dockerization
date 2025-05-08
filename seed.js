const mongoose = require('mongoose');
const User = require('./models/user');

mongoose.connect("mongodb://localhost:27017/nutriplan").then(async () => {
  console.log("Connected to MongoDB");
  
  await User.create({
    firstName: 'Test',
    lastName: 'User',
    email: 'test@nutriplan.com',
    password: await require('bcryptjs').hash('password123', 10),
    age: 30,
    height: 170,
    weight: 65,
    bmi: 22.5,
    dietType: 'Vegetarian',
    goalType: 'Weight Loss',
    activityLevel: 'Moderate'
  });

  console.log('Seed data added');
  mongoose.disconnect();
});