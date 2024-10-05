import { FastifyInstance, FastifyRequest } from "fastify";
import { MulterRequest } from "../../lib/multer";

export async function IsUserLoggedIn(req:MulterRequest | FastifyRequest) {
    if(await req.jwtVerify()){
        return true;
    }else{
        return false;
    }
}