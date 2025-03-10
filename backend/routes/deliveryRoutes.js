const express = require("express");
const { assignOrder, getAssignedOrders, updateOrderStatus } = require("../controllers/deliveryController");

const router = express.Router();

router.post("/assign", assignOrder);
router.get("/:deliveryPersonId", getAssignedOrders);
router.put("/status", updateOrderStatus);

module.exports = router;
