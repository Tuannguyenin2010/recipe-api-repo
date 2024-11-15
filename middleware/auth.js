const jwt = require('jsonwebtoken');

// Middleware to verify JWT
exports.verifyToken = (req, res, next) => {
    // Extract the token from the Authorization header
    const authHeader = req.header('Authorization');
    const token = authHeader && authHeader.split(' ')[1]; // 'Bearer <token>'

    if (!token) {
        return res.status(401).json({ message: 'Access Denied. No token provided.' });
    }

    try {
        // Verify the token
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified; // Attach user info to the request
        next();
    } catch (error) {
        res.status(403).json({ message: 'Invalid Token' });
    }
};
