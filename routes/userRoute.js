const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authorization = require('../utils/authorizationMiddleware');

router.post('/', userController.createUser);
router.post('/login', userController.login);
router.get('/admin',userController.adminDashboard);


module.exports = router;