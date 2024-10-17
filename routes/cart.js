const express = require('express');
const cartController = require('../controllers/cart')
const authmiddleware = require('../middleware/auth')

const router = express.Router();

router.use(authmiddleware.authenticateToken)

router.get('/', cartController.ShowCart)
router.post('/add', cartController.addToCart)

module.exports = router;