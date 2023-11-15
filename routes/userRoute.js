const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authorization = require('../utils/authorizationMiddleware');

router.post('/register', userController.createUser);
router.post('/login', userController.login);
router.post('/admin', authorization.validateToken, userController.admindasboard);

module.exports = router;