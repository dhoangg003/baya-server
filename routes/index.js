import express from "express";
import authRoute from "./auth.route.js";
import typeMenuRoute from "./typeMenu.route.js";
import dishGroupRoute from "./dishGroup.route.js";
import productRouter from "./product.route.js";
import orderRoute from "./order.route.js"
const router = express.Router();

router.use("/auth", authRoute);
router.use("/mainpage", productRouter);
router.use("/mainpage", typeMenuRoute);
router.use("/mainpage", dishGroupRoute);
router.use("/paymentpage",orderRoute)
export default router;
