const jwt = require("jsonwebtoken");

const verifyUserToken = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    jwt.verify(token, process.env.USER_JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Invalid token' });
      }
      req.userId = decoded.id;
      next();
    });
  } catch (error) {
    res.status(401).json({ message: 'Authentication failed' });
  }
};

module.exports = verifyUserToken;
