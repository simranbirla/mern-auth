import { NextFunction, Request, Response } from "express";
import bcryptjs from "bcryptjs";
import User from "../schemas/user";
import { errorHandler } from "../utils/error-handler";

export const signIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const hashedPassword = bcryptjs.hashSync(req.body.password, 10);
    const user = await User.create({
      username: req.body.username,
      password: hashedPassword,
      email: req.body.email,
    });
    return res.status(201).json({
      success: true,
      user,
    });
  } catch (e) {
    next(errorHandler(e.message, 500));
  }
};
