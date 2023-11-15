const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    FirstName: String,
    LastName: String,
    UserName: String,
    Email: String,
    // UserName: {
    //     type: String,
    //     required: true,
    //     unique: true,
    //     trim: true // Removes whitespace from the beginning and end
    // },
    // Email: {
    //     type: String,
    //     required: true,
    //     unique: true,
    //     trim: true // Removes whitespace from the beginning and end
    // },
    Password: String
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
