const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const electionController = require('../controllers/electionController');
const partyController = require('../controllers/partyController');

const authorization = require('../utils/authorizationMiddleware');
router.get('/dashboard', (req, res) => {
    res.render('AdminNavbar', { page: 'AdminDashboard' });
});
router.get('/candidate', (req, res) => {
    res.render('AdminNavbar', { page: 'AdminCandidate' });
});
router.get('/voters',(req, res) => {
  res.render('AdminNavbar', { page: 'AdminVoter'});
});
router.get('/election',  (req, res) => {
  try {
      electionController.getAllElection()
          .then(elections => {
              res.render('AdminNavbar', { page: 'AdminElection', elections });
          })
          .catch(err => {
              res.status(500).json({ error: err.message });
          });
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
});
router.get('/party', (req, res) => {
  try {
      partyController.getAllParties()
          .then(parties => {
              res.render('AdminNavbar', { page: 'AdminParty', parties });
          })
          .catch(err => {
              res.status(500).json({ error: err.message });
          });
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
});
router.get('/electionresult', (req, res) => {
  res.render('AdminNavbar', { page: 'AdminElection'});
});

router.get('/verification', (req, res) => {
  res.render('AdminNavbar', { page: 'AdminVerification'});
});

router.get('/account', (req, res) => {
  res.render('AdminNavbar', { page: 'AdminAccount'});
});
module.exports = router;