import express from "express";
import typeMenuController from "../controller/typeMenuController.js";
import authMdw from "../middlewares/auth.mdw.js";
const router = express.Router();

router.post("/typeMenu", authMdw, typeMenuController.createTypeMenu);
router.get("/typeMenu", authMdw, typeMenuController.getAllTypeMenu);

export default router;
