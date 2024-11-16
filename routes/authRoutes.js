/**
 * File Name: authRoutes.js
 * Student's Name: Tuan Nguyen
 * StudentID: 200541876
 * Date: 11/15/2024
 * Description: Routes for user authentication, including registration, login, and logout.
 */

const express = require('express');
const { registerUser, loginUser, logoutUser } = require('../controllers/authController');

const router = express.Router();

// Register a new user
router.post('/register', registerUser);

// Login user
router.post('/login', loginUser);

// Logout user
router.get('/logout', logoutUser);

module.exports = router;
