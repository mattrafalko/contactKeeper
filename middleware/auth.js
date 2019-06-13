const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req, res, next) {
  const token = req.header('x-auth-token');

  if (!token)
    return res.status(401).json({ message: 'No token. Authorization denied' });

  try {
    const decodedToken = jwt.verify(token, config.get('jwtSecret'));
    req.user = decodedToken.user;
    next(); //Calls the next middleware
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};
