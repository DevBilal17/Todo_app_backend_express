const express = require('express');
const { registerValidations } = require('../validations/authValidation');
const { register } = require('../controllers/authController');

const router = express.Router();


router.post("/register",registerValidations,register)