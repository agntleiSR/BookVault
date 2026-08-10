const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const { connectDB } = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const booksRoutes = require("./routes/booksRoutes");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "BookVault API is running.",
  });
});

app.use("/api/auth", authRoutes);

app.use("/api/books", booksRoutes);

connectDB();

app.listen(PORT, () => {
  console.log(
    `BookVault API running on http://localhost:${PORT}`
  );
});