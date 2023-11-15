// Controller function for handling user registration
const UserDetail = require('../models/userDetails');

async function createUserDetail(req, res) {
    try {
        const { firstName, lastName, userName, email, password, confirmPassword } = req.body;
        // Check if passwords match
        if (password !== confirmPassword) {
            return res.status(400).json({ error: 'Passwords do not match' });
        }

        // Create a new user instance based on the User schema
        const newUser = new UserDetail({
            FirstName: firstName,
            LastName: lastName
        });

        // Save the new user to the database
        await newUser.save();

        res.status(201).json({ message: 'User Detail Added successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = {
    createUserDetail,
};
