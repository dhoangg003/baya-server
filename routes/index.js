import express from "express";
import authRoute from "./auth.route.js";
import typeMenuRoute from "./typeMenu.route.js";
import dishGroup from "./dishGroup.route.js";
import productRouter from "./product.route.js";
const router = express.Router();

router.use("/auth", authRoute);
router.use("/mainpage", productRouter);
router.use("/mainpage", typeMenuRoute);
router.use("/mainpage", dishGroup);
export default router;
