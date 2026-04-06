import User from "../models/user.model.js";
import { hashPassword } from "./password.service.js";

export const registerService = async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await hashPassword(password);

  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  return newUser;
};

export const loginService = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  const isPasswordCorrect = await comparePassword(password, user.password);

  return isPasswordCorrect;
};
