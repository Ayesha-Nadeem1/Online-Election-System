const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authorization = require('../utils/authorizationMiddleware');
router.get('/dashboard', authorization.restrictToLoggedinUserOnly,authorization.requireRoles(['Admin']), (req, res) => {
    res.render('AdminNavbar', { page: 'AdminDashboard' });
});
router.get('/candidate', authorization.restrictToLoggedinUserOnly,authorization.requireRoles(['Admin']), (req, res) => {
    res.render('AdminNavbar', { page: 'AdminCandidate' });
});
router.get('/voters',authorization.restrictToLoggedinUserOnly, authorization.requireRoles(['Admin']),(req, res) => {
  res.render('AdminNavbar', { page: 'AdminVoter'});
});
router.get('/election',authorization.restrictToLoggedinUserOnly,authorization.requireRoles(['Admin']), (req, res) => {
  res.render('AdminNavbar', { page: 'AdminElection'});
});
router.get('/electionresult',authorization.restrictToLoggedinUserOnly,authorization.requireRoles(['Admin']), (req, res) => {
  res.render('AdminNavbar', { page: 'AdminElection'});
});

router.get('/verification',authorization.restrictToLoggedinUserOnly,authorization.requireRoles(['Admin']), (req, res) => {
  res.render('AdminNavbar', { page: 'AdminVerification'});
});

router.get('/account', authorization.restrictToLoggedinUserOnly,authorization.requireRoles(['Admin']),(req, res) => {
  res.render('AdminNavbar', { page: 'AdminAccount'});
});
module.exports = router;