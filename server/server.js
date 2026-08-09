const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const { connectDB } = require("./config/db");
const authRoutes = require("./routes/authRoutes");

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
    res.json({
        message: "BookVault API is running."
    });
});

// Authentication routes
app.use("/api/auth", authRoutes);

// Connect to database
connectDB();

// Start server
app.listen(PORT, () => {
    console.log(`BookVault API running on http://localhost:${PORT}`);
});