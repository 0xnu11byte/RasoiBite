const { Sequelize } = require("sequelize");
const sequelize = require("../config/db");

const User = require("./User");
const Order = require("./Order");
const Menu = require("./Menu");
const Payment = require("./Payment");
const Delivery = require("./Delivery");

// Define Relationships
User.hasMany(Order, { foreignKey: "user_id" });
Order.belongsTo(User, { foreignKey: "user_id" });

Order.hasOne(Payment, { foreignKey: "order_id" });
Payment.belongsTo(Order, { foreignKey: "order_id" });

Order.belongsTo(Delivery, { foreignKey: "delivery_person_id" });
Delivery.hasMany(Order, { foreignKey: "delivery_person_id" });

// Sync all models
const syncModels = async () => {
    try {
        await sequelize.sync({ alter: true });
        console.log("✅ Database tables synced!");
    } catch (error) {
        console.error("❌ Failed to sync database:", error);
    }
};


module.exports = { sequelize, syncModels, User, Order, Menu, Payment, Delivery };
