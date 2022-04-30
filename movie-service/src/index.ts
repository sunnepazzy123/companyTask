import { config } from 'dotenv';
config();
import { app } from './app';
import connectDb from './config/db';
import logger from './logger/winston';

async function main() {    

    const { PORT, MONGO_URI, API_KEY, BASE_URL, AUTH_SERVICE, JWT_SECRET } = process.env

    if(!PORT) throw new Error("Missing PORT env. Set it and restart the server");

    if(!MONGO_URI) throw new Error("Missing MONGO_URI env. Set it and restart the server");

    if(!API_KEY) throw new Error("Missing API_KEY env. Set it and restart the server");

    if(!AUTH_SERVICE) throw new Error("Missing AUTH_SERVICE env. Set it and restart the server");

    if(!JWT_SECRET) throw new Error("Missing JWT_SECRET env. Set it and restart the server");
    
    if(!BASE_URL) throw new Error("Missing BASE_URL env. Set it and restart the server");

    // Database execute
    await connectDb();

    app.get('/', (req, res)=>{
        res.send("Serving is running");
    });

    //Listening for a port
    app.listen(PORT, () => {
      return logger.info(`Server is listening at http://localhost:${PORT}`);
    });
}
main();
