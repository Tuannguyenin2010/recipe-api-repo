/**
 * File Name: auth.js
 * Student's Name: Tuan Nguyen
 * StudentID: 200541876
 * Date: 11/15/2024
 * Description: Middleware to verify JSON Web Tokens (JWT) for protected routes.
 */

const jwt = require('jsonwebtoken');

/**
 * Verifies the JWT from the Authorization header of the request.
 * Attaches the user information to the request object if valid.
 */
exports.verifyToken = (req, res, next) => {
    const authHeader = req.header('Authorization');
    const token = authHeader && authHeader.split(' ')[1]; // Extract 'Bearer <token>'

    if (!token) {
        return res.status(401).json({ message: 'Access Denied. No token provided.' });
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET); // Validate the token
        req.user = verified; // Attach verified user info to the request object
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        res.status(403).json({ message: 'Invalid Token' }); // Token is invalid or expired
    }
};
