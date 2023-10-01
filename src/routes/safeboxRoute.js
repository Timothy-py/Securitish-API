const { createSafebox } = require("../controllers/safeboxController");
const basicAuthM = require("../middlewares/basicAuth");

const safeboxRouter = require("express").Router();

safeboxRouter.post("/", basicAuthM, createSafebox);

module.exports = safeboxRouter;
