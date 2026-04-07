import User from "../models/user.model.js";
import { comparePassword, hashPassword } from "./password.service.js";

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

export const loginService = async (req) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("USER_NOT_FOUND");
  }

  const isPasswordCorrect = await comparePassword(password, user.password);

  if (!isPasswordCorrect) {
    throw new Error("INVALID_CREDENTIALS");
  }

  return user;
};
