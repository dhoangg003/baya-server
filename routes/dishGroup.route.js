import express from "express";
import dishGroupController from "../controller/dishGroupController.js";
import authMdw from "../middlewares/auth.mdw.js";

const router = express.Router();

router.post("/dishGroup", authMdw, dishGroupController.addDishGroup);
router.get("/dishGroup", authMdw, dishGroupController.getDishGroup);

export default router;
