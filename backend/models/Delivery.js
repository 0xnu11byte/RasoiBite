const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db"); // Ensure correct import

if (!sequelize) {
    console.error("❌ Sequelize instance is undefined. Check your db.js export.");
    process.exit(1);
}

const Delivery = sequelize.define("Delivery", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    phone: { type: DataTypes.STRING, allowNull: false },
    status: { type: DataTypes.ENUM("Available", "On Delivery", "Inactive"), defaultValue: "Available" }
}, { timestamps: true });

module.exports = Delivery;
