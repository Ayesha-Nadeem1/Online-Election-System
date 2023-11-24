const mongoose = require('mongoose');

const electionSchema = new mongoose.Schema({
    Name: { type: String, maxlength: 255,required: true},
    StartDate: { type: Date,required: true },
    EndDate: { type: Date ,required: true},
    Province: { type: String, maxlength: 255 ,required: true},
    City: { type: String, maxlength: 255 ,required: true},
    Region: { type: String, maxlength: 255,required: true },
    Description: { type: String ,required: true},
    ElectionType: { type: String, maxlength: 255 },
    isActive: { type: Boolean,default:true}
});

module.exports = mongoose.model('Election', electionSchema);
