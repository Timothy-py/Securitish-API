const authRouter = require("express").Router();

authRouter.get("/", (req, res)=>{
    return res.send("UNsafebox API")
});

module.exports = authRouter;
