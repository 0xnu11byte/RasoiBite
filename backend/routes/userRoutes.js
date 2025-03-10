const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
//const { authMiddleware, authenticateToken } = require("../middleware/authMiddleware");
//const { registerUser, loginUser, uploadProfilePicture, getUserProfile} = require("../controllers/userController");
const { registerUser, loginUser} = require("../controllers/userController");
const { db } = require("../config/db");
// const multer = require("multer");
// const path = require("path");

// Register User
router.post("/register", registerUser);

// Login User
router.post("/login", loginUser);

// router.get("/profile", authenticateToken, getUserProfile);

// Get user data (only if authenticated and userId is provided)
router.get("/", authMiddleware, async (req, res) => {
    try {
        const { userId } = req.query;

        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }

        if (parseInt(userId) !== req.user.id) {
            return res.status(403).json({ message: "Access Denied" });
        }

        db.query(
            "SELECT id, name, email, phone, address FROM users WHERE id = ?",
            [userId],
            (error, results) => {
                if (error || results.length === 0) {
                    return res.status(404).json({ message: "User not found" });
                }
                res.json(results[0]);
            }
        );
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
});

// const storage = multer.diskStorage({
//     destination: "./uploads/",
//     filename: (req, file, cb) => {
//       cb(null, `${req.user.id}_${Date.now()}${path.extname(file.originalname)}`);
//     },
//   });
  
//   const upload = multer({ storage });
  
//   router.post("/upload-profile-pic", authenticateToken, upload.single("profileImage"), uploadProfilePicture);
  
module.exports = router;
