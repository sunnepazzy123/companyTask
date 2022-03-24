import jwt from "jsonwebtoken";
import { AuthError } from "../error/authError";
import { IToken } from "../interfaces";


export const verifyToken = async (req, res, next) => {
    let token: string;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1] 
        const decoded = jwt.verify(token, process.env.JWT_SECRET) as IToken;
        if(!decoded){
            throw new AuthError("Not authorized, invalid token");
        }
        req.user = decoded;
        next();      
    }
  
    if (!token) {
      res.status(401)
      throw new AuthError('Not authorized, no token');
    }
  }