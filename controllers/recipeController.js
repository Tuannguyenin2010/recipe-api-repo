const Recipe = require('../models/Recipe');

// Get all recipes
exports.getAllRecipes = async (req, res) => {
    try {
        const recipes = await Recipe.find();
        res.json(recipes);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
