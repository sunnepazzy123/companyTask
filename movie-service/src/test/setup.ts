import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

let mongo: MongoMemoryServer;
//jest hook
beforeAll(async()=>{

    mongo = await MongoMemoryServer.create();
    const mongoUri = mongo.getUri();
    await mongoose.connect(mongoUri);
});


beforeEach(async()=> {
    jest.setTimeout(20000);
    const collections = await mongoose.connection.db.collections();

    for(let collection of collections){
        await collection.deleteMany({});
    }
});

afterAll(async()=>{
    jest.setTimeout(30000);
    await mongo.stop();
    await mongoose.connection.close();
})