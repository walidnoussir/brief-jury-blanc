import express from "express";
import {
  loginValidation,
  registerValidation,
  validate,
} from "../middlewares/validation.middleware.js";
import {
  loginController,
  registerController,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", registerValidation, validate, registerController);
router.post("/login", loginValidation, validate, loginController);

export default router;
