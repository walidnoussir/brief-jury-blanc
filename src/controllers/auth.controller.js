import { loginService, registerService } from "../services/auth.service.js";
import { generateToken } from "../services/token.service.js";

export const registerController = async (req, res) => {
  try {
    const newUser = await registerService(req, res);

    const token = generateToken({
      userId: newUser._id,
      role: newUser.role,
    });

    res.setHeader("Authorization", `Bearer ${token}`);

    res
      .status(201)
      .json({ message: "user created successfully.", newUser, token });
  } catch (error) {
    console.log("Error on register controller.", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const loginController = async (req, res) => {
  try {
    const user = await loginService(req);

    const token = generateToken({
      userId: user._id,
      role: user.role,
    });

    res.setHeader("Authorization", `Bearer ${token}`);

    return res
      .status(200)
      .json({ message: "User logged in successfully.", user, token });
  } catch (error) {
    if (error.message === "USER_NOT_FOUND") {
      return res.status(404).json({ message: "User not found" });
    }
    if (error.message === "INVALID_CREDENTIALS") {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    console.log("Error on login controller.", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
