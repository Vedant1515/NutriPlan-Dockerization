const express = require('express');
const router = express.Router();
const { generateMealPlan } = require('../controllers/mealController');

router.post('/generate', generateMealPlan);

module.exports = router;