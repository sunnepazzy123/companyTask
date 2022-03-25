import logger from "../logger/winston";
import {Request, Response} from "express";
import { DatabaseError } from "./authError";
import { HttpError } from "./httpError";

export type IError = DatabaseError | HttpError;


export const errorHandler = (error: IError, req: Request, res: Response): Response => {
    logger.error(error.message);
    if(error.statusCode === 400 || error.statusCode != 404){
        return res.status(400).json({message: error.message, data: null, path: req.path, method: req.method});
   }
    return res.status(500).json({message: error.message, data: null, path: req.path, method: req.method});
  };