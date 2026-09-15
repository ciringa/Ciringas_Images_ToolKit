import { FastifyInstance } from "fastify";
import { GoHome } from "../Controller/GoHomeController";

export async function UtilsRoutes(app:FastifyInstance) {
        //frontend call 
        app.route({method:"GET",url:"/home",handler:GoHome,schema:{
            tags:["misc"],
            summary:"frontend access route"
        }})
        app.route({method:"GET",url:"/",handler:async(_req,res)=>{
            return res.redirect("/home");
        },schema:{
            tags:["misc"],
            summary:"base api route, redirects to /home"
        }});
}