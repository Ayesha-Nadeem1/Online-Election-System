// Controller function for handling user registration
const User = require('../models/user');
const UserDetail = require('../models/userDetails');
const jwt = require('jsonwebtoken'); 


async function createUser(req, res) {
    try {
        const { firstName, lastName, userName, email, password, confirmPassword } = req.body;
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
        const userId = newUser._id;

        const newDetails = new UserDetail({
            UserId: userId,
            FirstName: firstName,
            LastName: lastName
        });
        await newDetails.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
function GenerateToken(user){
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
                return res.status(401).json({ error: 'Invalid credentials' });
            }
    
            // If passwords match, generate a token
            const token = GenerateToken(user);
    
            return res.status(200).json({
                message: 'Logged in successfully',
                UserName: UserName,
                Email: user.Email,
                FirstName: user.FirstName,
                LastName: user.LastName,
                token: token,
            });
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    };
    async function admindasboard(req, res){
        res.send('Welcome To Admin Dashboard');
    }
    
module.exports = {
    createUser,login,admindasboard,
};
