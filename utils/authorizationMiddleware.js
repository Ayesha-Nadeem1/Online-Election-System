const jwt = require('jsonwebtoken');


function validateToken(req, res, next) {
    const tok = req.headers.authorization;
    const token = tok.split(' ')[1]

    if (!token) {
    return res.status(401).json({ message: 'No token provided' });
    }
    jwt.verify(token, 'wdadadadad', (err, decoded) => {
    if (err) {
    return res.status(403).json({ message: 'Failed to authenticate token' });
        }
    // If the token is valid, save the decoded information for later use
    req.user = decoded;
    next();
    });
    }

module.exports = {
    validateToken,
};