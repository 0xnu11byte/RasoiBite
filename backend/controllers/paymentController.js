const razorpay = require("../config/paymentConfig");

exports.createOrder = async (req, res) => {
    const { amount, currency } = req.body;

    try {
        const options = {
            amount: amount * 100,  // Convert to smallest currency unit (paise)
            currency,
            receipt: `order_${Date.now()}`
        };

        const order = await razorpay.orders.create(options);
        res.json(order);
    } catch (error) {
        console.error("Payment initiation failed:", error);
        res.status(500).json({ message: "Payment initiation failed", error });
    }
};
