const express = require('express');
const catalogController = require('../controllers/catalog')

const router = express.Router();

router.get('/', catalogController.ShowCatalog)

module.exports = router;