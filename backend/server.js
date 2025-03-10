require("dotenv").config(); // Load environment variables

const path = require("path");
const express = require("express");
//const routes = require("./routes");
const cors = require("cors");
//const { syncModels } = require("./models/index");
const { sequelize, syncModels } = require("./models");
const { connectDB } = require("./config/db");
const db = require("./models");
const routes = require("./routes/index"); // Explicitly importing index.js
const errorHandler = require("./middleware/errorHandler");

// Import Routes
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const orderRoutes = require("./routes/orderRoutes");
const menuRoutes = require("./routes/menuRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const deliveryRoutes = require("./routes/deliveryRoutes");


const app = express();

// Middleware
app.use(express.json());
app.use(cors({ origin: "*" }));

app.use(cors({
    origin: "https://65qtlrrg-3000.inc1.devtunnels.ms",
    credentials: true
}));

app.use('/images', express.static('public/images'));
app.use('/uploads', express.static('public/uploads'));
// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/menu", menuRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/delivery", deliveryRoutes);

// Error Handling Middleware
app.use(errorHandler);

// Connect to DB & Sync Models
connectDB();

// Sync Database Models
// syncModels()
//     .then(() => console.log("✅ Database models synchronized"))
//     .catch(err => console.error("❌ Database sync error:", err));

// Serve static files from 'public' folder
app.use(express.static(path.join(__dirname, "public")));

// Set index route
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => console.log(`🚀 Server running on port ${PORT}`));
