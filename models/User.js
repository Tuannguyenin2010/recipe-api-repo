/**
 * File Name: User.js
 * Student's Name: Tuan Nguyen
 * StudentID: 200541876
 * Date: 11/15/2024
 * Description: Mongoose schema and model for storing user details with pre-save password hashing.
 */

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define schema for users
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true }, 
    email: { type: String, required: true, unique: true },   
    password: { type: String, required: true }               
});

// Hash the password before saving the user
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next(); // Skip if the password hasn't changed
    this.password = await bcrypt.hash(this.password, 10); // Hash the password
    next();
});

// Export the User model
module.exports = mongoose.model('User', userSchema);
