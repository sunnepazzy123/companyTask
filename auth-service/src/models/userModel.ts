import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import { IUser } from '../interfaces/IUser';
import { NextFunction } from 'express';
import { hashPassword } from '../utils/bCrypts';

interface IUserModel extends mongoose.Model<IUserDoc> {}

export interface IUserDoc extends mongoose.Document {
    id: number;
    name: string;
    username: string;
    password: string;
    role: string;
}

const userSchema = new Schema(
    {
        id: {
            type: Number,
            required: true,
            unique: true,
        },
        name: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        role: {
            type: String,
            required: true,
            enum: ['basic', 'premium']
        }
    },
    {
        toJSON: {
            transform(docs, ret){
                delete ret.__v;
                delete ret._id;
                delete ret.password
            }
        }
    }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
  }
  
userSchema.pre('save', async function (next) {
if (!this.isModified('password')) {
    next();
} 
this.password = await hashPassword(this.password);
});

userSchema.pre('insertMany', async function (next: NextFunction, docs: IUser[]) {
    if (Array.isArray(docs) && docs.length) {
    const promisesDocs = docs.map(async(doc)=>{
        doc.password = await hashPassword(doc.password);
        return doc; });
        
    await Promise.all(promisesDocs);
} 
});
  

const UserModel = mongoose.model<IUserDoc, IUserModel>('users', userSchema);

export default UserModel;
