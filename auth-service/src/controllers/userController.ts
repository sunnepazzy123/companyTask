import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { AuthError } from '../error/authError';
import { IUser } from '../interfaces/IUser';
import UserModel from '../models/userModel';
import jwt from "jsonwebtoken";


export const getUsers = async(req: Request, res: Response)=>{
    const users = await UserModel.find({});
    res.status(200).json(users);
}

export const getUser = async(req: Request, res: Response)=>{
    const user = await UserModel.findOne({id: req.params.id});
    if(!user) {
        throw new AuthError("User not found");
    }
    res.status(200).json(user);
}

export const createUser = async(req: Request, res: Response)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.status(400).send(errors.array());

    const user = req.body as IUser
    const userExist = await UserModel.findOne({username: user.username});

    if(userExist) throw new AuthError("username already exist");

    const newUser =  await UserModel.create(user);
    // Generate a JWT_TOKEN
    const payload = {
        userId: newUser.id,
        name: newUser.name,
        sub: newUser.id,
        role: newUser.role,
        iss: "https://www.netguru.com/"
    }
    const { JWT_SECRET } = process.env;

    const token = jwt.sign(payload, JWT_SECRET, {expiresIn: '30d'});
    //store the jwt_token on a session object
    req.session = {jwt: token};

    res.status(201).json({token});
}

export const updateUser = async(req: Request, res: Response)=>{

    const user = await UserModel.findOne({id: req.params.id})
    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }
    
     user.id = req.body.id || user.id
     user.name = req.body.name || user.name
     user.username = req.body.username || user.username
     user.password = req.body.password || user.password
     user.role = req.body.role || user.role
     user.movie_limit += req.body.movie_limit || 0

     const updatedUser = await user.save();

     if(!updatedUser){
       res.status(404);
       throw new Error('Error during updating user')
     }

    // Generate a JWT_TOKEN
    const payload = {
        userId: updatedUser.id,
        name: updatedUser.name,
        sub: updatedUser.id,
        role: updatedUser.role,
        iss: "https://www.netguru.com/"
    }
    const { JWT_SECRET } = process.env;

    const token = jwt.sign(payload, JWT_SECRET, {expiresIn: '30d'});
 
   res.status(200).json({token});
}

export const deleteUser = async(req: Request, res: Response)=>{
    await UserModel.remove({_id: req.params.id})
    res.status(200).json(true);
}

export const loginUser = async(req: Request, res: Response)=>{
    const { username, password } = req.body as IUser;

    const user = await UserModel.findOne({ username });
    if(!user) {
        throw new AuthError("Invalid Credentials");
    }
    //@ts-ignore
    if(!(await user.matchPassword(password))) {
        throw new AuthError("Invalid Credentials");
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
    
        const token = jwt.sign(payload, JWT_SECRET, {expiresIn: '30d'});

    return  res.status(200).json({token});
}

