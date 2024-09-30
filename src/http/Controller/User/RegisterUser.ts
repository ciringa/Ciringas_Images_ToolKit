import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { prisma } from "../../lib/prisma";
export async function PostUserController(req:FastifyRequest,res:FastifyReply) {
    const {Email,Password} = z.object({
        Email:z.string().email(),
        Password:z.string()
    }).parse(req.body)

    try{
        const Response = await prisma.user.create({
            data:{
                Email,Password
            }
        })

        res.status(201).send({
            Description:"successfully created",
            Response
        })
    }catch(err){
        console.error(err)
    }
}