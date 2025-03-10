const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db"); // Ensure correct import

if (!sequelize) {
    console.error("❌ Sequelize instance is undefined. Check your db.js export.");
    process.exit(1);
}

const Menu = sequelize.define("Menu", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: true },
    price: { type: DataTypes.FLOAT, allowNull: false },
    image_url: { type: DataTypes.STRING, allowNull: true }
}, { timestamps: true });

module.exports = Menu;
