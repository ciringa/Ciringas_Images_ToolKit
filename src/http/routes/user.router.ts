import { FastifyInstance } from "fastify";
import { LoginController } from "../Controller/User/Login";

export async function UserRouter(app:FastifyInstance) {
    //user and commonjs routes
    app.route({method:"PATCH",url:"/Login",handler:LoginController});        
}   