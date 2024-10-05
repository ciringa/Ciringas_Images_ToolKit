import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { date, z } from "zod";
import { LoginUserUseCase } from "../../../services/User/Loginservice";

export async function LoginController(req:FastifyRequest, res:FastifyReply) {
    const {Email,Password} = z.object({
        Email:z.string().email(),
        Password:z.string()
    }).parse(req.body)

    try{
        const response = await new LoginUserUseCase().execute({
            Email,Password
        })
        const Token = await res.jwtSign({},{
            sign:{
                sub:response
            }
        })
        if(response){
            res.cookie("slug",Token,{
                expires:new Date(Date.now()+60*60*24),
            });
            res.status(200).send({
                description:"logged-in",
                Token:Token,
                cookie:res.cookies.slug
            })
        }
    }catch(err){
        console.error(err);
        res.send(err)
    }
}