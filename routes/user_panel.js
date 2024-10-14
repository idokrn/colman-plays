const express = require('express');
const userPanelController = require('../controllers/user_panel')
const authmiddleware = require('../middleware/auth')

const router = express.Router();

router.use(authmiddleware.authenticateToken)

router.get('/', userPanelController.ShowUserPanel)

module.exports = router;