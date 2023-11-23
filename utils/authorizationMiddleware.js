const jwt = require('jsonwebtoken');


function validateToken(req, res, next) {
    const tok = req.headers.authorization;
    if (!tok) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }
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
    const { getUser } = require("../utils/auth");

    async function restrictToLoggedinUserOnly(req, res, next) {
      const userUid = req.cookies?.uid;
    
      if (!userUid) return res.redirect("/login");
      const user = getUser(userUid);
    
      if (!user) return res.redirect("/login");
    
      req.user = user;
      next();
    }
    
    async function checkAuth(req, res, next) {
      const userUid = req.cookies?.uid;
    
      const user = getUser(userUid);
    
      req.user = user;
      next();
    }
    
    module.exports = {
      restrictToLoggedinUserOnly,
      checkAuth,validateToken,

    };
