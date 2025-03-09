const Joi = require('joi');

// User Registration
const userRegisterSchema = Joi.object({
    name: Joi.string().min(3).max(100).required(),
    email: Joi.string().email().required(),
    phone: Joi.string()
        .pattern(/^[0-9]{10}$/) 
        .required()
        .messages({ "string.pattern.base": "Phone number must be exactly 10 digits" }),
    password: Joi.string().min(6).max(20).required(),
    role: Joi.string().valid('Admin', 'Librarian', 'Member').default('Member')
});

// User Login
const userLoginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});


// Book schema 
const bookSchema = Joi.object({
    title: Joi.string().min(3).max(255).required(),
    author: Joi.string().min(3).max(100).required(),
    available_copies: Joi.number().integer().min(1).optional(),
});

module.exports = { userRegisterSchema, userLoginSchema, bookSchema };
