const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

// Register user
exports.register = async (req, res) => {
    try {
        const { name, email, phone, password, role } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, phone, password: hashedPassword, role });

        // Remove password before sending response
        const userResponse = { ...user.get(), password: undefined };

        res.status(201).json({ success: true, message: 'User registered', user: userResponse });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error });
    }
};

// Login user
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ success: true, message: 'Login successful', token });
    } catch (error) {
        console.error("Login Error:", error.message); 
        res.status(500).json({ message: 'Error logging in', error });
    }
};


