const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authOptional = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]; // Extract token if present

    if (!token) {
        req.user = null; // no token, keep public
        return next();
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // verify token
        const user = await User.findById(decoded.userId);
        req.user = user || null; // attach user if exists
    } catch (err) {
        req.user = null; // if token invalid/expired, ignore and continue
    }

    next(); // always move on
};

module.exports = authOptional;
