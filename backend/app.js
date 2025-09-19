const dotenv = require("dotenv");
const cors = require("cors");
const express = require("express");
const connectToDb = require("./db/db");
const userRoutes = require("./routes/user.routes");
dotenv.config();
const cookie = require("cookie-parser");
const captainRoutes = require("./routes/captain.routes")

const app = express();

// Connect to DB
connectToDb();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookie());

// Routes
app.use("/users", userRoutes);
app.use("/captains", captainRoutes)

module.exports = app;
