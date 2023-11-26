// Controller function for handling user registration
const User = require('../models/user');
const UserDetail = require('../models/userDetails');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const {setUser}=require('../utils/auth')




async function createUser(req, res) {
    try {
        const { firstName, lastName, userName, email, password, confirmPassword } = req.body;
        console.log(firstName, lastName, userName, email, password, confirmPassword)
        // Check if passwords match
        if (password !== confirmPassword) {
            return res.status(400).json({ error: 'Passwords do not match' });
        }

        // Create a new user instance based on the User schema
        const newUser = new User({
            UserName: userName,
            Email: email,
            Password: password
        });

        // Save the new user to the database
        await newUser.save();
        // const userId = newUser._id;

        const newDetails = new UserDetail({
            UserId: newUser._id,
            FirstName: firstName,
            LastName: lastName
        });
        await newDetails.save();

        setTimeout(() => {
            res.redirect("/");
        }, 5000);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
function GenerateToken(user) {
    const payload = {
        role: user.RoleId,
        id: user._id,
    };
    const token = jwt.sign(payload, 'wdadadadad');
    return token;
};
async function login(req, res, next) {
    const { UserName, Password } = req.body;

    try {
        // Search for the user by username or email
        const user = await User.findOne({
            $or: [{ UserName }, { Email: UserName }]
        });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Check if the passwords match
        if (user.Password !== Password) {
            // return res.status(404).json({ error: 'User not found' });

            return res.render('LandingNavbar', { page: 'login', navbarButtonText: 'Sign In' });
            
        }

        // If passwords match, generate a token
        //const token = GenerateToken(user);

        // Prepare response data with token and user info
        let responseData = {
            message: 'Logged in successfully',
        };

        if (user.RoleId === 1) {
            // Redirect to admin dashboard
            user.Role = 'User';
            responseData.isAdmin = true;
            responseData.Role = 'User';
            
        }
        else if (user.RoleId === 2) {
            // Redirect to admin dashboard
            user.Role = 'Admin';
            responseData.isAdmin = false;
            responseData.Role = 'Admin';
        }
        const token=setUser(user); 
        responseData.token = token;

        res.cookie("uid",token)
        if (user.RoleId === 1) {
            return res.status(200).json(responseData);

            
        } 
        else if (user.RoleId === 2) {     
            return res.render('AdminNavbar', { page:'AdminDashboard'});
        }
        // For users with RoleId 2 (admin), redirect to admin page

        // For other users, send the prepared response data
        // return res.status(200).json(responseData);
        // const sessionId=uuidv4();
        // setUser(sessionId,user)

        
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}



async function adminDashboard(req, res) {
    return res.render('AdminNavbar', { page: 'AdminDashboard'})
}
module.exports = {
    createUser, login, adminDashboard,
};
