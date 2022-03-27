import mongoose from 'mongoose';
import logger from '../logger/winston';

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/netGuru'; 

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(`${MONGO_URI}`);
        logger.info(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        logger.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

export default connectDB;
