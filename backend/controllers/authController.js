const mysql = require("mysql2");

const { db } = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/authConfig");

// Register User
exports.register = (req, res) => {
    const { name, email, password, phone, address } = req.body;
    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) return res.status(500).json({ message: "Error hashing password" });

        db.query(
            "INSERT INTO users (name, email, password, phone, address) VALUES (?, ?, ?, ?, ?)",
            [name, email, hashedPassword, phone, address],
            (error) => {
                if (error) return res.status(500).json({ message: "Registration failed", error: error.message});
                res.status(201).json({ message: "User registered successfully" });
            }
        );
    });
};

// Login User
exports.login = (req, res) => {
    const { email, password } = req.body;

    db.query("SELECT id, name, password, profileImage FROM users WHERE email = ?", [email], (error, results) => {
        if (error || results.length === 0) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const user = results[0];

        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (!isMatch) {
                return res.status(400).json({ message: "Invalid credentials" });
            }

            const token = jwt.sign({ id: user.id }, jwtSecret, { expiresIn: "7d" });

            res.json({
                token,
                userId: user.id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                profileImage: user.profileImage || "http://localhost:5000/uploads/default-profile.png"
            });
        });
    });
};


// Get User Profile
exports.getProfile = (req, res) => {
    const userId = req.user.id;
    db.query("SELECT id, name, email, phone, address, profileImage FROM users WHERE id = ?", [userId], (error, results) => {
        if (error || results.length === 0) return res.status(404).json({ message: "User not found" });
        res.json(results[0]);
    });
};
