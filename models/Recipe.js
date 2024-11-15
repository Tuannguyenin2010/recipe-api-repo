const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    recipeName: { type: String, required: true },
    cuisine: { type: String, required: true },
    averageRating: { type: Number, required: true }
});

module.exports = mongoose.model('Recipe', recipeSchema);
