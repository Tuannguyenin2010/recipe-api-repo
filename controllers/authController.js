/**
 * File Name: authController.js
 * Student's Name: Tuan Nguyen
 * StudentID: 200541876
 * Date: 11/15/2024
 * Description: Handles user authentication - registration, login, and logout.
 */

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

/**
 * Registers a new user by validating input, checking for existing users, hashing the password, and saving to the database.
 */
exports.registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        if (!username || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        const newUser = new User({ username, email, password });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error });
    }
};

/**
 * Logs in a user by validating credentials and issuing a JWT token.
 */
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in user', error });
    }
};

/**
 * Logs out a user (client handles token invalidation).
 */
exports.logoutUser = (req, res) => {
    // Invalidate the token on the client side by simply not using it anymore
    res.status(200).json({ message: 'Logout successful' });
};
