import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AuthError } from "../error/authError";
import UserModel from "../models/userModel";


export const verifyToken = async (req, res, next) => {
    let token: string;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1] 
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(!decoded){
            throw new AuthError("Not authorized, invalid token");
        }
        req.user = await UserModel.findById(decoded.id).select('-password'); 
        next();      
    }
  
    if (!token) {
      res.status(401)
      throw new AuthError('Not authorized, no token');
    }
  }