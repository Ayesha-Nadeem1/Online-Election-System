const User = require('../models/user');
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


module.exports = {
    createUser, login, adminDashboard,
};
