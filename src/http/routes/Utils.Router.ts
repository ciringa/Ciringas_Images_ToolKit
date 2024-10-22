import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { GoHome } from "../Controller/GoHomeController";

export async function UtilsRoutes(app:FastifyInstance) {
    
        //frontend call 
        app.route({method:"GET",url:"/home",handler:GoHome})
        app.route({method:"GET",url:"/",handler:async(req:FastifyRequest,res:FastifyReply)=>{
            res.header('Content-Type', 'text/html');
            res.send(`<p>Hey, we are moving to an active FrontEnd. While this new App is not done we can use <a href="http://127.0.0.1:4545/home">this</a></p>`)
        }});
    
    
}