import { body } from 'express-validator';

export const userValidator = [
    body('username')
        .trim()
        .isLength({min: 4, max: 20})
        .withMessage('Username must be between 4 and 20 characters'),
    body('password')
        .trim()
        .isLength({min: 4, max: 20})
        .withMessage('Password must be between 4 and 20 characters'),
    body('role')
        .trim()
        .isLength({min: 5, max: 7})
        .withMessage('Role must be between 5 and 7 characters'),
    body('id')
        .trim()
        .isNumeric()
        .withMessage('Id is not Numeric'),
    body('name')
        .trim()
        .isLength({min: 4, max: 20})
        .withMessage('Name must be between 4 and 20 characters')
];

export const subscriberValidator = [
    body('limit')
        .trim()
        .isNumeric()
        .withMessage('Limit is not number'),
];