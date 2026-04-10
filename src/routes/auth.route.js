import express from "express";
import {
  loginValidation,
  registerValidation,
  validate,
} from "../middlewares/validation.middleware.js";
import {
  getMyProfileController,
  loginController,
  registerController,
} from "../controllers/auth.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", registerValidation, validate, registerController);
router.post("/login", loginValidation, validate, loginController);
router.get("/me", protectRoute, validate, getMyProfileController);

export default router;
