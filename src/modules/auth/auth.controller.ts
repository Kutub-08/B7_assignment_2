import type { Request, Response } from "express";

import { AuthService } from "./auth.service";

const signup = async (req: Request, res: Response) => {
  const result = await AuthService.signupUser(req.body);

  res.status(201).json({
    success: true,
    message: "User registered successfully",
    data: result,
  });
};
const login = async (req: Request, res: Response) => {
  const result = await AuthService.loginUser(req.body);

  res.status(StatusCodes.OK).json({
    success: true,
    message: "Login successful",
    data: result,
  });
};

export const AuthController = {
  signup,
  login,
};
