import { NextFunction, Request, Response } from "express";
import bcryptjs from 'bcryptjs';
import User from "../schemas/user";

export const signIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
    try {
        const hashedPassword = bcryptjs.hashSync(req.body.password, 10)
        const user = await User.create({
            username: req.body.username, 
            password: hashedPassword,
            email: req.body.email
        });
        return res.status(201).json({
          success: true, 
          user
        });
    } catch(e) {
        return res.status(500).json({
            success: false, 
            error: e
          });
    }

};
