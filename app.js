require("dotenv").config();
const express = require("express");

// ROUTES
const authRoutes = require("./src/routes/authRoute");

// Activate express app
const app = express();
const APP_PORT = process.env.APP_PORT;

// MIDDLEWARES
app.use(express.json());

// SET ROUTES
app.use("/api/v1/auth", authRoutes);

app.listen(APP_PORT, () => {
  console.log(`Server is running on PORT: ${APP_PORT}`);
});

module.exports = app;
