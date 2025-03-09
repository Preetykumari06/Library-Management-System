const jwt = require('jsonwebtoken');
const User = require('../models/User'); 
require('dotenv').config();

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.split(' ')[1];

        if (!token) return res.status(401).json({ error: 'Access Denied: No Token Provided' });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = await User.findByPk(decoded.id); 

        if (!req.user) return res.status(401).json({ error: 'User not found' });

        next();
    } catch (error) {
        console.error("Token Verification Error:", error.message); 
        return res.status(401).json({ error: 'Invalid Token' });
    }
};

// Role-based access
const roleMiddleware = (roles) => (req, res, next) => {
    if (!roles.includes(req.user.role)) {
        return res.status(403).json({ error: 'Access Denied: Insufficient Permissions' });
    }
    next();
};

module.exports = { authMiddleware, roleMiddleware };
