import { body } from 'express-validator';

export const movieValidator = [
    body('movie')
        .trim()
        .isEmpty()
        .withMessage('Title is empty'),
];