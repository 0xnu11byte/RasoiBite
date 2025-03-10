const { DataTypes } = require("sequelize");
const sequelize = require("../config/db").sequelize; // Ensure sequelize is correctly imported

if (!sequelize) {
    console.error("❌ Sequelize instance is undefined. Check your db.js export.");
    process.exit(1);
}

const User = sequelize.define("User", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    phone: { type: DataTypes.STRING, allowNull: false },
    address: { type: DataTypes.TEXT, allowNull: true },
    role: { type: DataTypes.ENUM("customer", "admin", "delivery"), defaultValue: "customer" }
}, { timestamps: true });

module.exports = User;
