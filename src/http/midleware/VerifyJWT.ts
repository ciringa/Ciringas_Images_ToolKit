import { FastifyInstance, FastifyRequest } from "fastify";

export async function name(req:FastifyRequest) {
    
    if(await req.jwtVerify()){
        return true;
    }else{
        return false;
    }

}