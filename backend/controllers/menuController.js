const { db } = require("../config/db");

// Get Menu Items
exports.getMenu = (req, res) => {
    db.query("SELECT * FROM menu", (error, results) => {
        if (error) return res.status(500).json({ message: "Failed to retrieve menu" });
        res.json(results);
    });
};

// Add Menu Item
exports.addMenuItem = (req, res) => {
    const { name, description, price, image_url } = req.body;
    db.query(
        "INSERT INTO menu (name, description, price, image_url) VALUES (?, ?, ?, ?)",
        [name, description, price, image_url],
        (error) => {
            if (error) return res.status(500).json({ message: "Failed to add menu item" });
            res.status(201).json({ message: "Menu item added successfully" });
        }
    );
};
