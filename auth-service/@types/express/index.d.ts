import { IToken } from "../../src/interfaces/Itoken";

declare global{
    namespace Express {
        interface Request {
            user: IToken
        }
    }
}

