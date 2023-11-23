const express = require("express");
const { router } = require("./user/userRoutes");
const rootRouter = express.Router();

rootRouter.use("/api/users", router);

module.exports = rootRouter;
