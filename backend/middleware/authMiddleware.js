const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/authConfig");

module.exports = (req, res, next) => {
    const authHeader = req.header("Authorization");
    
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Access Denied: No Token Provided" });
    }

    const token = authHeader.split(" ")[1]; 

    try {
        const verified = jwt.verify(token, jwtSecret);
        req.user = verified;
        next();
    } catch (error) {
        res.status(403).json({ message: "Invalid or Expired Token" });
    }
};

// const authenticateToken = (req, res, next) => {
//     const authHeader = req.header("Authorization");

//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//         return res.status(401).json({ message: "Access Denied: No Token Provided" });
//     }

//     const token = authHeader.split(" ")[1];

//     try {
//         const verified = jwt.verify(token, jwtSecret);
//         req.user = verified;
//         next();
//     } catch (error) {
//         res.status(403).json({ message: "Invalid or Expired Token" });
//     }
// };

// module.exports = authenticateToken; // Explicitly export