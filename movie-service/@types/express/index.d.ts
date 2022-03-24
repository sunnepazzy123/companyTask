import { IToken } from '../../src/interfaces' 
declare global{
    namespace Express {
        interface Request {
            user: IToken
        }
    }
}

