import express from "express";
import orderController from "../controller/oderController.js"
const router = express.Router();

router.post("/orders",  orderController.addOrder);
router.get("/orders",  orderController.getOrder);
router.delete("/orders/:orderId", orderController.deleteOrder); 


export default router;
