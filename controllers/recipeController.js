const Recipe = require('../models/Recipe');

// Get all recipes
exports.getAllRecipes = async (req, res) => {
    try {
        const recipes = await Recipe.find();
        res.status(200).json(recipes);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching recipes', error });
    }
};

// Get a single recipe by ID
exports.getRecipeById = async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);
        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }
        res.status(200).json(recipe);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching recipe', error });
    }
};

// Create a new recipe
exports.createRecipe = async (req, res) => {
    const { recipeName, cuisine, averageRating } = req.body;

    try {
        // Validate input
        if (!recipeName || !cuisine || averageRating === undefined) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const newRecipe = new Recipe({ recipeName, cuisine, averageRating });
        const savedRecipe = await newRecipe.save();
        res.status(201).json(savedRecipe);
    } catch (error) {
        res.status(500).json({ message: 'Error creating recipe', error });
    }
};

// Update a recipe by ID
exports.updateRecipe = async (req, res) => {
    const { recipeName, cuisine, averageRating } = req.body;

    try {
        const updatedRecipe = await Recipe.findByIdAndUpdate(
            req.params.id,
            { recipeName, cuisine, averageRating },
            { new: true }
        );
        if (!updatedRecipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }
        res.status(200).json(updatedRecipe);
    } catch (error) {
        res.status(500).json({ message: 'Error updating recipe', error });
    }
};

// Delete a recipe by ID
exports.deleteRecipe = async (req, res) => {
    try {
        const deletedRecipe = await Recipe.findByIdAndDelete(req.params.id);
        if (!deletedRecipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }
        res.status(200).json({ message: 'Recipe deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting recipe', error });
    }
};
