const jwt = require("jsonwebtoken");

function authToken(req, res, next) {
  const token = req.cookies?.jwt;
  console.log("toke in middleware-----",token);
  if (!token) return res.status(401).json({ error: "No token" });

  jwt.verify(token,"your_jwt_secret", (err, user) => {
    if (err) return res.status(403).json({ error: "Invalid token" });
    req.user = user;
    next();
  });
}

module.exports = authToken;