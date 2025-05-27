
const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // format: Bearer <token>

  if (!token) {
    return res.status(401).json({ message: 'Không có token được cung cấp.' });
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(403).json({ message: 'Token đã hết hạn.' });
      } else {
        return res.status(403).json({ message: 'Token không hợp lệ.' });
      }
    }

    req.user = user;
    next();
  });
}

module.exports = authenticateToken;
