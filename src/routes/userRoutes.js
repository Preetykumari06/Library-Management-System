const express = require('express');
const { authMiddleware, roleMiddleware } = require('../middlewares/authMiddleware');
const { getUsers, getUserById, updateUser, deleteUser, getProfile, updateProfile } = require('../controllers/userController');


const userRouter = express.Router();

// Admin can manage users
userRouter.get('/', authMiddleware, roleMiddleware(['Admin']), getUsers);
userRouter.get('/:id', authMiddleware, roleMiddleware(['Admin']), getUserById);
userRouter.put('/:id', authMiddleware, roleMiddleware(['Admin']), updateUser);
userRouter.delete('/:id', authMiddleware, roleMiddleware(['Admin']), deleteUser);

// User can manage their profile
userRouter.get('/profile/me', authMiddleware, getProfile);
userRouter.put('/profile/me', authMiddleware, updateProfile);

module.exports = userRouter;
