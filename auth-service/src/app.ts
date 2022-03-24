import express, { Request, Response, NextFunction } from 'express';
const app = express();
import swaggerUI from 'swagger-ui-express';
import { specs } from './swagger';
import cookieSession from 'cookie-session';
import userRoutes from './routes';
import { DatabaseError } from './error/databaseError';
import { HttpError } from './error/httpError';

type IError = DatabaseError | HttpError;
app.set('trust proxy', 1); //to make sure express is aware of proxy of ingress-nginx


// middlewares setups
app.use(express.json());
app.use(
    cookieSession({
        name: 'session',
        signed: false, // disable encryption
        secure: false
    })
);
app.use('/api', userRoutes);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));
// Global Error Handler
app.use((err: IError, req: Request, res: Response, next: NextFunction)=>{
    if(err.statusCode === 400){
         return res.status(400).json({message: err.message, data: null, path: req.path, method: req.method});
    }
    return res.status(404).json({message: err.message, data: null, path: req.path, method: req.method});
});

export { app }
