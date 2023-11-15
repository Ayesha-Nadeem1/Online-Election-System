// Controller function for handling user registration
const User = require('../models/user');

async function createUser(req, res) {
    try {
        const { firstName, lastName, userName, email, password, confirmPassword } = req.body;
        console.log(firstName, lastName, userName, email, password, confirmPassword);
        // Check if passwords match
        if (password !== confirmPassword) {
            return res.status(400).json({ error: 'Passwords do not match' });
        }

        // Create a new user instance based on the User schema
        const newUser = new User({
            FirstName: firstName,
            LastName: lastName,
            UserName: userName,
            Email: email,
            Password: password
        });

        // Save the new user to the database
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = {
    createUser,
};
