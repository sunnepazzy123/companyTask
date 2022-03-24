import express from 'express';
const router = express.Router();
import { MoviesController } from '../controllers';
import { tryCatch } from '../error/tryAndCatch';
import { verifyToken } from '../middlewares/token';

router.get('/movies', verifyToken, tryCatch(MoviesController.get));
router.get('/movies/:id', verifyToken, tryCatch(MoviesController.getId));
router.post('/movies', verifyToken, tryCatch(MoviesController.create));



export default router