const { db } = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/authConfig");
const { User } = require("../models");

// Register User
exports.registerUser = (req, res) => {
    const { name, email, password, phone, address } = req.body;
    const profilePic = profileImage || "/uploads/default-profile.png"; // ✅ Set default if not provided
    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) return res.status(500).json({ message: "Error hashing password" });
        db.query(
            "INSERT INTO users (name, email, password, phone, address, profileImage) VALUES (?, ?, ?, ?, ?, ?)",
            [name, email, hashedPassword, phone, address, profilePic],
            (error) => {
                if (error) return res.status(500).json({ message: "User registration failed" });
                res.status(201).json({ message: "User registered successfully" });
            }
        );
    });
};

// Login User
exports.loginUser = (req, res) => {
    const { email, password } = req.body;
    db.query("SELECT id, name, email, phone, address, profileImage FROM users WHERE email = ?", [email], (error, results) => {
        if (error || results.length === 0) return res.status(400).json({ message: "Invalid email or password" });

        const user = results[0];
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

            const token = jwt.sign({ id: user.id }, jwtSecret, { expiresIn: "7d" });
            res.json({ token, user });
        });
    });
};

// Get User Profile
// exports.getUserProfile = async (req, res) => {
//     try {
//         const user = await User.findByPk(req.user.id);
//         if (!user) return res.status(404).json({ message: "User not found" });
//         res.json(user);
//     } catch (error) {
//         res.status(500).json({ message: "Server error" });
//     }
// };

// exports.uploadProfilePicture = async (req, res) => {
//   try {
//     const imageUrl = `/uploads/${req.file.filename}`;
//     await User.update({ profileImage: imageUrl }, { where: { id: req.user.id } });

//     res.json({ imageUrl });
//   } catch (error) {
//     res.status(500).json({ message: "Failed to upload profile picture" });
//   }
// };

