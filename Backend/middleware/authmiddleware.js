const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.log("No or malformed auth header:", authHeader);
    return res.status(401).json({ message: "Unauthorized - No token" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const secret = process.env.JWT_SECRET || 'farmbridge_jwt_secret_dev_key_2026';
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    console.log("Decoded token:", decoded);
    next();
  } catch (error) {
    console.error("Token verification failed:", error.message);
    res.status(401).json({ message: "Unauthorized - Invalid token" });
  }
};

module.exports = verifyToken;
