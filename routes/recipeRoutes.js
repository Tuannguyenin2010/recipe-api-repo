const express = require('express');
const { verifyToken } = require('../middleware/auth');
const recipeController = require('../controllers/recipeController');

const router = express.Router();

// Get all recipes
router.get('/recipes', verifyToken, recipeController.getAllRecipes);

// Get a recipe by ID
router.get('/recipes/:id', verifyToken, recipeController.getRecipeById);

// Create a new recipe
router.post('/recipes', verifyToken, recipeController.createRecipe);

// Update a recipe by ID
router.put('/recipes/:id', verifyToken, recipeController.updateRecipe);

// Delete a recipe by ID
router.delete('/recipes/:id', verifyToken, recipeController.deleteRecipe);

module.exports = router;
