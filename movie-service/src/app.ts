
import express, { Request, Response, NextFunction } from 'express';
const app = express();
import swaggerUI from 'swagger-ui-express';
import { specs } from './swagger';
import moviesRoutes from './routes';
import { HttpError } from './error/httpError';
import { DatabaseError } from './error/databaseError';
import { errorHandler } from './error/error';

type IError = DatabaseError | HttpError;

//middlewares setups
app.use(express.json());
app.use('/api', moviesRoutes);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs)); 
//Global Error Handler
app.use((err: IError, req: Request, res: Response, _next: NextFunction)=>{
    errorHandler(err, req, res);
});

export { app }
