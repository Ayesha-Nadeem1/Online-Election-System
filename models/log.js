const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
    timestamp: { type: Date, default: Date.now },
    level: { type: String }, // e.g., 'error', 'info', 'warning'
    message: { type: String },
    source: { type: String }, // e.g., 'backend', 'frontend', specific component, etc.
    // You can add more fields as needed based on the information you want to capture
    // ...
});

module.exports = mongoose.model('Log', logSchema);
