const express = require("express");

const authRoutes = require("./authRoutes");
const menuRoutes = require("./menuRoutes");
const userRoutes = require("./userRoutes");
const orderRoutes = require("./orderRoutes");
const paymentRoutes = require("./paymentRoutes");
const deliveryRoutes = require("./deliveryRoutes");

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/menu", menuRoutes);
router.use("/users", userRoutes);
router.use("/orders", orderRoutes);
router.use("/payment", paymentRoutes);
router.use("/delivery", deliveryRoutes);

module.exports = router;