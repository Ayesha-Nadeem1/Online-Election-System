const express=require('express');
const app=express();
const port =3005;
const path = require('path');
const bodyParser = require('body-parser');
const userRoute=require('./routes/userRoute')
const adminRoute=require('./routes/adminRoute')
const cookieParser = require("cookie-parser");
const { restrictToLoggedinUserOnly, checkAuth } = require("./utils/authorizationMiddleware");



require("dotenv").config();
require('./utils/db')
app.use(express.static(path.join(__dirname, 'static')));
app.use(cookieParser());

app.use(bodyParser.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true })); // For parsing form data

app.use('/users',userRoute);
app.use('/admin',adminRoute);


//Default Login Page proving base page with login page
// app.get('/', (req, res) => {
//   res.render('base', { page: 'login', navbarButtonText: 'Sign Up' });
// });
app.get('/', (req, res) => {
  res.render('LandingNavbar', { page: 'login', navbarButtonText: 'Sign In' });

});

//Sign Up Page
app.get('/SignUp', (req, res) => {
  res.render('LandingNavbar', { page: 'signup', navbarButtonText: 'Sign In' });
});

// app.get('/admin/voters', (req, res) => {
//   res.render('AdminNavbar', { page: 'AdminVoter'});
// });
// app.get('/admin/election', (req, res) => {
//   res.render('AdminNavbar', { page: 'AdminElection'});
// });
// app.get('/admin/electionresult', (req, res) => {
//   res.render('AdminNavbar', { page: 'AdminElection'});
// });

// app.get('/admin/verification', (req, res) => {
//   res.render('AdminNavbar', { page: 'AdminVerification'});
// });

// app.get('/admin/account', (req, res) => {
//   res.render('AdminNavbar', { page: 'AdminAccount'});
// });




//Listening the app
app.listen(port,()=>{
    console.log(`Server is listening on port ${port}`);
});