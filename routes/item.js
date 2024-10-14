const express = require('express');
const item = require('../controllers/item')
const authmiddleware = require('../middleware/auth')

const router = express.Router();

router.use(authmiddleware.authenticateToken)

router.post('/', item.createItem)

module.exports = router;