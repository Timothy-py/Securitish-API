require("dotenv").config();
const express = require("express");

const connectDB = require("./src/utils/connectDB");
const logger = require("./logger/logger");
const swaggerDocs = require("./src/documentations/swagger");
const errorHandler = require("./src/middlewares/errorHandler");

// ROUTES
const authRoutes = require("./src/routes/authRoute");
const safeboxRoutes = require("./src/routes/safeboxRoute");

// Activate express app
const app = express();
const APP_PORT = process.env.APP_PORT;

// MIDDLEWARES
app.use(express.json());

// SET ROUTES
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/safeboxes", safeboxRoutes);

// CONNECT DATABASE
connectDB();

// ERROR HANDLER
app.use(errorHandler);

// SWAGGER DOCS
swaggerDocs(app, APP_PORT);

app.listen(APP_PORT, () => {
  logger.info(`Server is running on PORT: ${APP_PORT}`);
});

module.exports = app;
