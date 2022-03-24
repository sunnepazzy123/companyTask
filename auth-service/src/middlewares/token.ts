import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { HttpError } from "../error/httpError";
import UserModel from "../models/userModel";


export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  let token: string;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1]
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      throw new HttpError('Not authorized, invalid token', 400);
    }
    req.user = await UserModel.findById(decoded.id).select('-password');
    next();
  }

  if (!token) throw new HttpError('Not authorized, no token', 400);
}