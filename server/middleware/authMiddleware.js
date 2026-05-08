const jwt = require("jsonwebtoken");
const User = require("../models/authModel");

const protect = async (req, res, next) => {
    try {
        let token;

        // 1. Check header
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")
        ) {
            // 2. Extract token
            token = req.headers.authorization.split(" ")[1];

            // 3. Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // 4. Get user
            const user = await User.findById(decoded.id).select("-password");

            if (!user) {
                return res.status(401).json({
                    message: "Invalid User Token"
                });
            }

            // 5. Attach user to request
            req.user = user;

            // 6. Move to next middleware
            next();

        } else {
            return res.status(401).json({
                message: "No Token, Unauthorised"
            });
        }

    } catch (error) {
        return res.status(401).json({
            message: "Token Failed / Expired"
        });
    }
};

module.exports = protect;