const express=require('express');
const app=express();
const port =3005;
const path = require('path');
const bodyParser = require('body-parser');
const userRoute=require('./routes/userRoute')

require('./utils/db')
app.use(express.static(path.join(__dirname, 'static')));

app.use(bodyParser.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true })); // For parsing form data

app.use('/users',userRoute);


//Default Login Page proving base page with login page
app.get('/', (req, res) => {
  res.render('base', { page: 'login', navbarButtonText: 'Sign Up' });
});

//Sign Up Page
app.get('/SignUp', (req, res) => {
  res.render('base', { page: 'signup', navbarButtonText: 'Sign In' });
});


//Listening the app
app.listen(port,()=>{
    console.log(`Server is listening on port ${port}`);
});