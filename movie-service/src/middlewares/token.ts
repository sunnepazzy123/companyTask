import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { HttpError } from "../error/httpError";
import { IToken } from "../interfaces";


export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    let token: string;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1] 
        const decoded = jwt.verify(token, process.env.JWT_SECRET) as IToken;
        if(!decoded){
            throw new HttpError("Not authorized, invalid token", 400);
        }
        req.user = decoded;
        next();      
    }
  
    if (!token) {
      throw new HttpError('Not authorized, no token', 400);
    }
  }