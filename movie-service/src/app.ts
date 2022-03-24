import express from 'express';
import swaggerUI from 'swagger-ui-express';
import { specs } from './swagger';

const app = express();

import moviesRoutes from './routes';

//middlewares setups
app.use(express.json());
app.use('/api', moviesRoutes);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs)); 
//Global Error Handler
app.use((err, req, res, next)=>{
    res.status(404).json({message: err.message, data: null, path: req.path, method: req.method});
});

export { app }
