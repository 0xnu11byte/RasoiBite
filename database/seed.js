const mysql = require("mysql2/promise");
require("dotenv").config();

const DB_CONFIG = {
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASS || "",
    database: process.env.DB_NAME || "rasoi_bite",
};

const seedDB = async () => {
    const connection = await mysql.createConnection(DB_CONFIG);
    console.log("✅ Connected to Database");

    // Clear existing data in correct order to maintain foreign key constraints
    await connection.query("SET FOREIGN_KEY_CHECKS = 0");
    await connection.query("TRUNCATE TABLE order_items");
    await connection.query("TRUNCATE TABLE orders");
    await connection.query("TRUNCATE TABLE menu");
    await connection.query("TRUNCATE TABLE users");
    await connection.query("SET FOREIGN_KEY_CHECKS = 1");
    console.log("🗑️ Cleared existing data");

    // Insert Users
    const users = [
        ["Amit Sharma", "amit.sharma@example.com", "hashedpassword1", "9876543210", "Delhi"],
        ["Priya Verma", "priya.verma@example.com", "hashedpassword2", "8765432109", "Mumbai"],
        ["Rahul Gupta", "rahul.gupta@example.com", "hashedpassword3", "7654321098", "Kolkata"],
        ["Sanya Kapoor", "sanya.kapoor@example.com", "hashedpassword4", "6543210987", "Chennai"],
    ];
    await connection.query("INSERT INTO users (name, email, password, phone, address) VALUES ?", [users]);
    console.log("👤 Users inserted");

    // Insert Menu Items
    const menu = [
        ["Paneer Butter Masala", "Rich and creamy paneer dish", 250, "/images/paneer.jpg"],
        ["Chicken Biryani", "Spiced and aromatic rice with chicken", 300, "/images/biryani.jpg"],
        ["Masala Dosa", "South Indian dosa with spicy filling", 180, "/images/dosa.jpg"],
        ["Butter Naan", "Soft Indian bread with butter", 50, "/images/naan.jpg"],
    ];
    await connection.query("INSERT INTO menu (name, description, price, image_url) VALUES ?", [menu]);
    console.log("🍽️ Menu items inserted");

    // Insert Orders (ensure user IDs exist)
    const orders = [
        [1, 570, "Processing"],
        [2, 320, "Pending"],
        [3, 480, "Completed"],
        [4, 200, "Cancelled"],
    ];
    await connection.query("INSERT INTO orders (user_id, total_price, status) VALUES ?", [orders]);
    console.log("📦 Orders inserted");

    // Insert Order Items
    const orderItems = [
        [1, 1, 2, 500], // Order 1, Paneer Butter Masala, Quantity 2
        [1, 3, 1, 180], // Order 1, Masala Dosa, Quantity 1
        [2, 2, 1, 300], // Order 2, Chicken Biryani, Quantity 1
        [3, 4, 4, 200], // Order 3, Butter Naan, Quantity 4
    ];
    await connection.query("INSERT INTO order_items (order_id, menu_id, quantity, price) VALUES ?", [orderItems]);
    console.log("🥘 Order items inserted");

    await connection.end();
    console.log("✅ Seeding completed successfully!");
};

seedDB().catch(err => {
    console.error("❌ Seeding failed:", err);
});
