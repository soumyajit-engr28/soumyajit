const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
  // Get token from Authorization header
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, "your_jwt_secret"); // use process.env.JWT_SECRET later
    req.user = decoded; // attach decoded payload to request
    next();
  } catch (err) {
    res.status(403).json({ error: "Invalid or expired token." });
  }
}

module.exports = authMiddleware;