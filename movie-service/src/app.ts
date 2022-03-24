
import express, { Request, Response, NextFunction } from 'express';
const app = express();
import swaggerUI from 'swagger-ui-express';
import { specs } from './swagger';
import moviesRoutes from './routes';
import { HttpError } from './error/httpError';
import { DatabaseError } from './error/databaseError';

type IError = DatabaseError | HttpError;

//middlewares setups
app.use(express.json());
app.use('/api', moviesRoutes);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs)); 
//Global Error Handler
app.use((err: IError, req: Request, res: Response, next: NextFunction)=>{

    if(err.statusCode === 400){
       return res.status(404).json({message: err.message, data: null, path: req.path, method: req.method});
    }
    return res.status(404).json({message: err.message, data: null, path: req.path, method: req.method});
});

export { app }
