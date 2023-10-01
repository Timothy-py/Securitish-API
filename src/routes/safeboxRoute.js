const {
    createSafebox,
    addContent,
    getSafeboxContents,
  } = require("../controllers/safeboxController");
  const basicAuthM = require("../middlewares/basicAuth");
  
  const safeboxRouter = require("express").Router();
  
  safeboxRouter.post("/", basicAuthM, createSafebox);
  safeboxRouter.post("/:id/contents", basicAuthM, addContent);
  safeboxRouter.get("/:id/contents", basicAuthM, getSafeboxContents);
  
  module.exports = safeboxRouter;
  