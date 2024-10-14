const express = require('express');
const admin_panel = require('../controllers/admin_panel')
const authmiddleware = require('../middleware/auth')

const router = express.Router();

router.use(authmiddleware.authenticateToken)

router.get('/', admin_panel.ShowAdminPanel)

module.exports = router;