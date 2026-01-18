const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config({ path: ".env.local" });


const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Routes
const todoRoutes = require("./routes/todoRoutes");

app.use("/api/todos", todoRoutes);

// Port
const PORT = process.env.PORT || 5000;

// Debug log (IMPORTANT)
console.log("ENV CHECK:", process.env);
console.log("Mongo URI:", process.env.MONGO_URI);


// MongoDB connection + server start
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
  });
