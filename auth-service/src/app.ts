import express, { Request, Response, NextFunction } from 'express';
const app = express();
import swaggerUI from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerDocument from './swagger/swagger.json';
import cookieSession from 'cookie-session';
import userRoutes from './routes';
import { errorHandler, IError} from './error/errorHandler';
const apiSpecDoc = swaggerJsDoc(swaggerDocument);


app.set('trust proxy', true); //to make sure express is aware of proxy of ingress-nginx


// middlewares setups
app.use(express.json());
app.use(
    cookieSession({
        name: 'session',
        signed: false, // disable encryption
        secure: false
    })
);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(apiSpecDoc));
app.use('/api', userRoutes);

// Global Error Handler
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: IError, req: Request, res: Response, _next: NextFunction)=>{
    errorHandler(err, req, res);
});

export { app }
