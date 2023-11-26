const Log = require('../models/log');

// Example function to log an error
async function logError(errorMessage, source) {
    const errorLog = new Log({
        level: 'error',
        message: errorMessage,
        source: source // You can specify the source of the error here
    });

    try {
        await errorLog.save();
        console.log('Error logged successfully.');
    } catch (error) {
        console.error('Error logging:', error);
    }
}

// Usage:
module.exports = {
    logError,
};
