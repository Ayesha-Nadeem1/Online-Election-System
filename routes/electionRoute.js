const express = require('express');
const router = express.Router();
const electionController = require('../controllers/electionController');
const authorization = require('../utils/authorizationMiddleware');

router.post('/register', electionController.createElection);


module.exports = router;