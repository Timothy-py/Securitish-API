require("dotenv").config();
const express = require("express");

const connectDB = require("./src/utils/connectDB");
const logger = require("./logger/logger");

// ROUTES
const authRoutes = require("./src/routes/authRoute");

// Activate express app
const app = express();
const APP_PORT = process.env.APP_PORT;

// MIDDLEWARES
app.use(express.json());

// SET ROUTES
app.use("/api/v1/auth", authRoutes);

// CONNECT DATABASE
connectDB();

app.listen(APP_PORT, () => {
  logger.info(`Server is running on PORT: ${APP_PORT}`);
});

module.exports = app;
