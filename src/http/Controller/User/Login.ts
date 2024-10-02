import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function LoginController(req:FastifyRequest, res:FastifyReply) {
    const {Email,Password} = z.object({
        Email:z.string().email(),
        Password:z.string()
    }).parse(req.body)

    try{

    }catch(err){
        
    }
}