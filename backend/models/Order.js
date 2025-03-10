const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db"); // Ensure correct import
const User = require("./User");

if (!sequelize) {
    console.error("❌ Sequelize instance is undefined. Check your db.js export.");
    process.exit(1);
}

const Order = sequelize.define("Order", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    user_id: { 
        type: DataTypes.INTEGER, 
        allowNull: false, 
        references: { model: User, key: "id" } 
    },
    total_price: { type: DataTypes.FLOAT, allowNull: false },
    status: { 
        type: DataTypes.ENUM("Pending", "Processing", "Delivered", "Cancelled"), 
        defaultValue: "Pending" 
    },
    delivery_person_id: { type: DataTypes.INTEGER, allowNull: true }
}, { timestamps: true });

module.exports = Order;
