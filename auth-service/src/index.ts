import { config } from 'dotenv';
config();
import { app } from './app';
import connectDb from './config/db';
import logger from './logger/winston';


async function main() {

    const { PORT, JWT_SECRET } = process.env;

    if (!JWT_SECRET) {
        throw new Error("Missing JWT_SECRET env var. Set it and restart the server");
      }
    // Database execute
    await connectDb();

    app.get('/', (req, res)=>{
        res.send(`Serving is running`);
    });

    // Listening for a port
    app.listen(PORT, () => {
      return logger.info(`Server is listening at http://localhost:${PORT}`);
    });
}
main().catch((error) => console.error(error));
