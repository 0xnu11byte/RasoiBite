const { db } = require("../config/db");

// Place Order
exports.placeOrder = (req, res) => {
    const { user_id, items, total_price } = req.body;

    db.query("INSERT INTO orders (user_id, total_price, status) VALUES (?, ?, 'Pending')", [user_id, total_price], (error, results) => {
        if (error) return res.status(500).json({ message: "Failed to place order" });

        const orderId = results.insertId;
        const values = items.map(item => [orderId, item.menu_id, item.quantity, item.price]);

        db.query("INSERT INTO order_items (order_id, menu_id, quantity, price) VALUES ?", [values], (err) => {
            if (err) return res.status(500).json({ message: "Failed to add order items" });
            res.status(201).json({ message: "Order placed successfully", orderId });
        });
    });
};

// Get User Orders
exports.getUserOrders = (req, res) => {
    const userId = req.params.userId;
    db.query("SELECT * FROM orders WHERE user_id = ?", [userId], (error, results) => {
        if (error) return res.status(500).json({ message: "Failed to fetch orders" });
        res.json(results);
    });
};
