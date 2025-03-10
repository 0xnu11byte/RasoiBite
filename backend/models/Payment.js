const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db"); // Ensure correct import
const Order = require("./Order");

if (!sequelize) {
    console.error("❌ Sequelize instance is undefined. Check your db.js export.");
    process.exit(1);
}

const Payment = sequelize.define("Payment", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    order_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: Order, key: "id" } },
    amount: { type: DataTypes.FLOAT, allowNull: false },
    method: { type: DataTypes.ENUM("Card", "UPI", "Cash"), allowNull: false },
    status: { type: DataTypes.ENUM("Pending", "Completed", "Failed"), defaultValue: "Pending" },
    transaction_id: { type: DataTypes.STRING, allowNull: true }
}, { timestamps: true });

module.exports = Payment;
