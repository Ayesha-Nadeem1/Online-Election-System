const mongoose = require('mongoose');

const userDetailsSchema = new mongoose.Schema({
    UserId: { type: String, required: true },
    FirstName: { type: String, maxlength: 255 },
    LastName: { type: String, maxlength: 255 },
    DOB: { type: Date },
    Address: { type: String, maxlength: 255 },
    CNIC: { type: String, maxlength: 255 },
    PreferredLanguageId: { type: Number, default: 1 },
    Province: { type: String, maxlength: 255 },
    City: { type: String, maxlength: 255 },
    Region: { type: String, maxlength: 255 },
    LastLogin: { type: Date },
}, { timestamps: true });

module.exports = mongoose.model('UserDetails', userDetailsSchema);
