import {Request, Response} from "express";
import logger from "../logger/winston";


export const errorHandler = (error: any, req: Request, res: Response): Response => {
    logger.error(error.message);
    if(error.statusCode === 400 || error.statusCode != 404){
        return res.status(400).json({message: error.message, data: null, path: req.path, method: req.method});
   }
   
   let { statusCode } = error;
   if (error.isAxiosError) {
     statusCode = error.response ? error.response.status : 500;
   } else if (!statusCode) {
     statusCode = 500;
   }
    return res.status(500).json({message: error.message, data: null, path: req.path, method: req.method});
  };