const express = require("express");
const { placeOrder, getUserOrders } = require("../controllers/orderController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, placeOrder);
router.get("/:userId", authMiddleware, getUserOrders);

module.exports = router;
