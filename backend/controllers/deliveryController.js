const { db } = require("../config/db");

// Assign Order to Delivery Person
exports.assignOrder = (req, res) => {
    const { order_id, delivery_person_id } = req.body;
    db.query(
        "UPDATE orders SET delivery_person_id = ?, status = 'Processing' WHERE id = ?",
        [delivery_person_id, order_id],
        (error) => {
            if (error) return res.status(500).json({ message: "Failed to assign order" });
            res.json({ message: "Order assigned successfully" });
        }
    );
};

// Get Delivery Person's Assigned Orders
exports.getAssignedOrders = (req, res) => {
    const deliveryPersonId = req.params.deliveryPersonId;
    db.query(
        "SELECT * FROM orders WHERE delivery_person_id = ? AND status IN ('Processing', 'Pending')",
        [deliveryPersonId],
        (error, results) => {
            if (error) return res.status(500).json({ message: "Failed to fetch orders" });
            res.json(results);
        }
    );
};

// Update Order Status
exports.updateOrderStatus = (req, res) => {
    const { order_id, status } = req.body;
    db.query(
        "UPDATE orders SET status = ? WHERE id = ?",
        [status, order_id],
        (error) => {
            if (error) return res.status(500).json({ message: "Failed to update order status" });
            res.json({ message: "Order status updated successfully" });
        }
    );
};
