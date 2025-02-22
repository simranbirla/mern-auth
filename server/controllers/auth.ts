import { NextFunction, Request, Response } from "express";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../schemas/user";
import { errorHandler } from "../utils/error-handler";

export const signUp = async (
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

export const signIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return next(errorHandler("User not found", 404));
    }

    const doesPasswordMatch = bcryptjs.compareSync(
      req.body.password,
      user.password
    );

    if (!doesPasswordMatch) {
      return next(errorHandler("Password is incorrect", 401));
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY);

    const { password, ...userWithoutPassword } = user._doc;

    return res
      .cookie("access_token", token, {
        maxAge: 350000,
        sameSite: "lax",
      })
      .status(200)
      .json({
        success: true,
        user: userWithoutPassword,
      });
  } catch (e) {
    console.log(e);
    next(errorHandler(e.message, 500));
  }
};

export const googleLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);

      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);

      const username =
        req.body.username.split(" ").join("").toLowerCase() +
        Math.floor(Math.random() * 1000).toString();

      const newUser = await User.create({
        username,
        password: hashedPassword,
        email: req.body.email,
        profilePhotoUrl: req.body.photoUrl,
      });

      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET_KEY);

      const { password, ...userWithoutPassword } = newUser._doc;

      return res
        .cookie("access_token", token, {
          maxAge: 350000,
          sameSite: "lax",
        })
        .status(200)
        .json({
          success: true,
          user: userWithoutPassword,
        });
    } else {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY);

      const { password, ...userWithoutPassword } = user._doc;

      return res
        .cookie("access_token", token, {
          maxAge: 350000,
          sameSite: "lax",
        })
        .status(200)
        .json({
          success: true,
          user: userWithoutPassword,
        });
    }
  } catch (e) {
    console.log(e);
    next(errorHandler(e.message, 500));
  }
};
