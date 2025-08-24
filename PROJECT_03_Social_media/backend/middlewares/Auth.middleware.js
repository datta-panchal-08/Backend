import jwt from "jsonwebtoken";

export const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies?.token;

        if (!token) {
            return res.status(401).json({ message: "Unauthorized: Please Login" });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = {
            _id: decoded._id,
            username: decoded.username,
            email: decoded.email,
        };

        next();
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Session expired. Please login again." });
        } else if (error.name === "JsonWebTokenError") {
            return res.status(401).json({ message: "Invalid token. Please login again." });
        }
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
