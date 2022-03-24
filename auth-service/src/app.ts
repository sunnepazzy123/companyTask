import express from 'express';
import swaggerUI from 'swagger-ui-express';
import { specs } from './swagger';
import cookieSession from 'cookie-session';


const app = express();
app.set('trust proxy', 1); //to make sure express is aware of proxy of ingress-nginx

import userRoutes from './routes';

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
app.use((err, req, res, next)=>{
    res.status(404).json({message: err.message, data: null, path: req.path, method: req.method});
});

export { app }
