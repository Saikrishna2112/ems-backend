require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const userRoutes = require("./src/routes/userRoutes");
const employeeRoutes = require("./src/routes/employeeRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// DB
mongoose.connect(process.env.MONGO_URI, { })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB error:", err));

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/employees", employeeRoutes);

// Start
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
