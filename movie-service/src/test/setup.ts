import request from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { app } from '../app';
import axios from 'axios';


declare global {
    namespace NodeJS {
      interface Global {
        signin(): Promise<string>;
      }
    }
  }
  

let mongo: MongoMemoryServer;
//jest hook
beforeAll(async()=>{

    mongo = await MongoMemoryServer.create();
    const mongoUri = mongo.getUri();
    await mongoose.connect(mongoUri);
});


beforeEach(async()=> {
    const collections = await mongoose.connection.db.collections();

    for(let collection of collections){
        await collection.deleteMany({});
    }
});

afterAll(async()=>{
    await mongo.stop();
    await mongoose.connection.close();
});

global.signin = async () => {
    const { AUTH_SERVICE } = process.env;
    const user = {
        id: 19422,
        name: "nenjo",
        username: "junior",
        role: "basic",
        password: "12345"
    }
    const { data } = await axios.post(`${AUTH_SERVICE}/api/auth`, user)
    const { token } = data;
    return token;
  };