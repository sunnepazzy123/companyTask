import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { DatabaseError } from '../error/authError';
import { IUser } from '../interfaces/IUser';
import UserModel from '../models/userModel';
import jwt from "jsonwebtoken";



export const getUsers = async (req: Request, res: Response) => {
    const users = await UserModel.find({});
    return res.status(200).json(users);
}

export const getUser = async (req: Request, res: Response) => {
    const user = await UserModel.findOne({ id: req.params.id });
    if (!user) {
        throw new DatabaseError("User not found", 400);
    }
    return res.status(200).json(user);
}

export const createUser = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json(errors.array());

    const user = req.body as IUser;
    const userExist = await UserModel.findOne({ username: user.username });

    if (userExist) throw new DatabaseError("username already exist", 400);

    const newUser = await UserModel.create(user);
    // Generate a JWT_TOKEN
    const payload = {
        userId: newUser.id,
        name: newUser.name,
        sub: newUser.id,
        role: newUser.role,
        iss: "https://www.netguru.com/"
    }
    const { JWT_SECRET } = process.env;

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '30d' });
    //store the jwt_token on a session object
    req.session = { jwt: token };

    return res.status(201).json({ token });
}

export const updateUser = async (req: Request, res: Response) => {

    const user = await UserModel.findOne({ id: req.params.id });

    if (!user) throw new DatabaseError('User not found', 400);

    user.name = req.body.name || user.name
    user.username = req.body.username || user.username
    user.password = req.body.password || user.password
    user.role = req.body.role || user.role

    const updatedUser = await user.save();

    if (!updatedUser) throw new DatabaseError('Error during updating user', 400);
    // Generate a JWT_TOKEN
    const payload = {
        userId: updatedUser.id,
        name: updatedUser.name,
        sub: updatedUser.id,
        role: updatedUser.role,
        iss: "https://www.netguru.com/"
    }
    const { JWT_SECRET } = process.env;

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '30d' });

    return res.status(200).json({ token });
}

export const deleteUser = async (req: Request, res: Response) => {
    await UserModel.remove({ _id: req.params.id })
    return res.status(200).json(true);
}

export const loginUser = async (req: Request, res: Response) => {
    const { username, password } = req.body as IUser;
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json(errors.array());

    const user = await UserModel.findOne({ username });

    if (!user) throw new DatabaseError("Invalid Credentials", 400);
    // @ts-expect-error: Unreachable code error
    if (!(await user.matchPassword(password))) {
        throw new DatabaseError("Invalid Credentials", 400);
    }

    // Generate a JWT_TOKEN
    const payload = {
        userId: user.id,
        name: user.name,
        sub: user.id,
        role: user.role,
        iss: "https://www.netguru.com/"
    }
    const { JWT_SECRET } = process.env;

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '30d' });

    return res.status(200).json({ token });
}

