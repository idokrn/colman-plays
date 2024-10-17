const express = require('express');
const confirmController = require('../controllers/confirm')

const router = express.Router();

router.get('/', confirmController.ShowConfirm)

module.exports = router;