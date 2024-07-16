import { NextFunction, Request, Response } from "express"

export const createSignIn = (req: Request, res: Response, next: NextFunction) => {
  return  res.send('Hello World!');
}