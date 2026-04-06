import express from "express";
import {
  loginValidation,
  registerValidation,
} from "../middlewares/validation.middleware.js";
import {
  loginController,
  registerController,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", registerValidation, registerController);
router.post("/login", loginValidation, loginController);

export default router;
