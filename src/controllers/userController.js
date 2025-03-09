const bcrypt = require('bcrypt');
const User = require('../models/User');

// --------- Admin only ----------------

// Get all users 
exports.getUsers = async (req, res) => {
    try {
        const users = await User.findAll({ attributes: { exclude: ['password'] } });
        res.json({ success:true, message: 'Users retrived successfully', users });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get user by ID 
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id, { attributes: { exclude: ['password'] } });
        if (!user) return res.status(404).json({ error: 'User not found' });

        res.json({ success:true, message: 'User retrived successfully', user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update user 
exports.updateUser = async (req, res) => {
    try {
        const { name, email, phone, role } = req.body;
        const user = await User.findByPk(req.params.id);
        if (!user) return res.status(404).json({ error: 'User not found' });

        await user.update({ name, email, phone, role });
        res.json({ success:true, message: 'User updated successfully', user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete user 
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) return res.status(404).json({ error: 'User not found' });

        await user.destroy();
        res.json({ success:true, message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// ----- User ----------

// Get logged-in user's profile
exports.getProfile = async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id, { attributes: { exclude: ['password'] } });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update logged-in user's profile
exports.updateProfile = async (req, res) => {
    try {
        const { name, email, phone } = req.body;
        const user = await User.findByPk(req.user.id);
        await user.update({ name, email, phone });

        res.json({ message: 'Profile updated successfully', user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
