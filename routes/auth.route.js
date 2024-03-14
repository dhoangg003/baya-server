import express from "express";
import { AuthController } from "../controller/authController.js";
import authMdw from "../middlewares/auth.mdw.js";
import { validateMdw } from "../middlewares/validate.mdw.js";
import AuthValidatior from "../validationSchema/auth.validatior.js";
const router = express.Router();

router.post(
  "/signup",
  validateMdw(AuthValidatior.signupSchema),
  AuthController.signup
);

router.post(
  "/login",
  validateMdw(AuthValidatior.loginSchema),
  AuthController.login
);

router.get("/current-user", authMdw, AuthController.fetchCurrentUser);

export default router;
