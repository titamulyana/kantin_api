const express = require("express");
const router = express.Router();
const user = require("./userRoutes");
const product = require("./productRoutes");
const sales = require("./salesRoutes");

router.use("/user", user);
router.use("/product", product);
router.use("/sales", sales);

module.exports = router;