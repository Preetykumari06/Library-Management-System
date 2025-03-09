const express = require('express');
const authRouter = express.Router();
const authController = require('../controllers/authController');
const { userRegisterSchema, userLoginSchema } = require('../utils/validation');
const validate = require('../middlewares/validateMiddleware');

authRouter.post('/register', validate(userRegisterSchema), authController.register);
authRouter.post('/login', validate(userLoginSchema), authController.login);

module.exports = authRouter;
