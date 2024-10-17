const express = require('express');
const item = require('../controllers/item')
const authmiddleware = require('../middleware/auth')

const router = express.Router();

router.use(authmiddleware.authenticateToken)

router.post('/', item.createItem)
router.post('/update', item.updateItem)
router.post('/delete', item.deletItem)

module.exports = router;