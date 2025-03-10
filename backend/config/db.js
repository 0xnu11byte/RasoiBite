const mysql = require("mysql2");
const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");

dotenv.config();

// Debug: Log environment variables
// console.log("DB_NAME:", process.env.DB_NAME);
// console.log("DB_USER:", process.env.DB_USER);
// console.log("DB_PASS:", process.env.DB_PASS ? "*******" : "No Password Set");
// console.log("DB_HOST:", process.env.DB_HOST);

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "Gr8Indi@",
    database: "rasoi_bite",
    connectionLimit: 10
});

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        dialect: "mysql",
        logging: false, // Set to true for SQL query logs
    }
);

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log("✅ MySQL Database connected successfully!");
    } catch (error) {
        console.error("❌ Database connection failed:", error);
        process.exit(1);
    }
};

module.exports = { db, sequelize, connectDB };