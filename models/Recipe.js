/**
 * File Name: Recipe.js
 * Student's Name: Tuan Nguyen
 * StudentID: 200541876
 * Date: 11/15/2024
 * Description: Mongoose schema and model for storing recipe details.
 */

const mongoose = require('mongoose');

// Define schema for recipes
const recipeSchema = new mongoose.Schema({
    recipeName: { type: String, required: true }, 
    cuisine: { type: String, required: true },   
    averageRating: { type: Number, required: true } 
});

// Export the Recipe model
module.exports = mongoose.model('Recipe', recipeSchema);
