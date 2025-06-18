const jwt = require("jsonwebtoken");

function authToken(req, res, next) {
  const token = req.cookies?.jwt;
  if (!token)
    return res.status(401).json({
      status: 401,
      message: "Authentication required. No token provided.",
    });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: "Invalid token" });
    req.user = user;
    next();
  });
}

module.exports = authToken;
