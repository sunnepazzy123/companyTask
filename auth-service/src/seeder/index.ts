import { config } from 'dotenv';
config();
import connectDB from '../config/db';
import logger from '../logger/winston';
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
        const result = await Promise.allSettled(promises);
        logger.info('new users created => ', result);     
    } catch (error) {
        logger.error('Error occur!');
        process.exit(1);
    }

}


const destroyData = async () => {
    try {
        await UserModel.deleteMany(); 
        await SubscriptionModel.deleteMany(); 
        logger.info('Data Destroyed!');
    } catch (error) {
        logger.error('Error occur!');
        process.exit(1);
    }
  }

importData();

