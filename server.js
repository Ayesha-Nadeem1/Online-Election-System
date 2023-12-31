const express=require('express');
const app=express();
const port =3005;
const path = require('path');
const bodyParser = require('body-parser');
const userRoute=require('./routes/userRoute')
const adminRoute=require('./routes/adminRoute')
const electionRoute=require('./routes/electionRoute')
const partyRoute=require('./routes/partyRoute')
const candidateRoute=require('./routes/candidateRoute')
const logRoute=require('./routes/logRoute')

const authorization = require('./utils/authorizationMiddleware');


const cookieParser = require("cookie-parser");



require('./utils/db')
app.use(express.static(path.join(__dirname, 'static')));
app.use(cookieParser());

app.use(bodyParser.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true })); // For parsing form data

app.use('/users',userRoute);
app.use('/admin',authorization.restrictToLoggedinUserOnly,authorization.requireRoles(['Admin']),adminRoute);
app.use('/election',authorization.restrictToLoggedinUserOnly,authorization.requireRoles(['Admin']),electionRoute);
app.use('/party',authorization.restrictToLoggedinUserOnly,authorization.requireRoles(['Admin']), partyRoute);
app.use('/candidate',authorization.restrictToLoggedinUserOnly,authorization.requireRoles(['Admin']), candidateRoute);
app.use('/log',logRoute);

app.get('/', (req, res) => {
  res.render('LandingNavbar', { page: 'login', navbarButtonText: 'Sign In' });

});

//Sign Up Page
app.get('/SignUp', (req, res) => {
  res.render('LandingNavbar', { page: 'signup', navbarButtonText: 'Sign In' });
});

//Listening the app
app.listen(port,()=>{
    console.log(`Server is listening on port ${port}`);
});