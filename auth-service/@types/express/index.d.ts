import { IToken } from "../../src/interfaces/Itoken";
import { IUser } from "../../src/interfaces/IUser";

declare global{
    namespace Express {
        interface Request {
            user: IToken
        }
    }
}

