import { body } from 'express-validator';

export const userValidator = [
    body('username')
        .trim()
        .isLength({min: 4, max: 20})
        .withMessage('Username must be between 4 and 20 characters'),
    body('password')
    .trim()
    .isLength({min: 4, max: 20})
    .withMessage('Password must be between 4 and 20 characters')
];