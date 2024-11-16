/**
 * File Name: app.js
 * Student's Name: Tuan Nguyen
 * StudentID: 200541876
 * Date: 11/15/2024
 * Description: Main application file for the Recipe API, setting up routes, middleware, and database connection.
 */

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');

// Routes
const recipeRoutes = require('./routes/recipeRoutes');
const authRoutes = require('./routes/authRoutes');

dotenv.config(); // Load environment variables
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Enable CORS for cross-origin requests
app.use(bodyParser.json()); // Parse JSON payloads

// Routes
app.use('/api', recipeRoutes);
app.use('/auth', authRoutes);

// Connect to MongoDB
mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Database connection error:', err));

// Start the server
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
