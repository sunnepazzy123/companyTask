import { config } from 'dotenv';
config();
import connectDB from '../config/db';
import SubscriptionModel from '../models/subscriptionModel';
import UserModel from "../models/userModel";
import { users } from './userData';


connectDB();


const importData = async () => {
    try {
        await destroyData();
        const newUsers = await UserModel.insertMany(users);
        const promises = newUsers.map(async(user)=> {
            await SubscriptionModel.create({user_id: user.id})
        });
        const result = await Promise.all(promises);
        console.log('new users created => ', result);     
        process.exit(1);
    } catch (error) {
        process.exit(1)
    }

}


const destroyData = async () => {
    try {
        await UserModel.deleteMany(); 
        await SubscriptionModel.deleteMany(); 
        console.log('Data Destroyed!');
    } catch (error) {
        process.exit(1);
    }
  }

importData();

