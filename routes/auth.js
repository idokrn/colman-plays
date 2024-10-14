const express = require('express');
const authController = require('../controllers/auth');

const router = express.Router();

// Signup route
router.post('/signup', authController.signup);

// Login route
router.post('/',authController.login);
router.get('/', authController.showAuth);

module.exports = router;