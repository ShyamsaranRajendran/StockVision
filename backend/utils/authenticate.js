const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/keys");

function authenticate(req, res, next) {
    const authHeader = req.header("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Access denied, token missing or invalid" });
    }

    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded; // Ensure user object is set correctly
        next();
    } catch (error) {
        return res.status(401).json({ error: "Invalid token" });
    }
}

module.exports = authenticate;
