const jwt = require("jsonwebtoken");

const requireAuth = (req, res, next) => {
  const accessToken = req.headers.authorization?.split(" ")[1];
  if (!accessToken) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    req.user = {
      userId: decoded.userId,
    };
    next();
  } catch {
    return res.status(403).json({ message: "Invalid token" });
  }
};

module.exports = requireAuth;
