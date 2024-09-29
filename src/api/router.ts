
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { ApplyEffectController } from "./Controller/ApplyEffectController";
import { GoHome } from "./Controller/GoHomeController";

import { upload } from "./lib/multer";
import { RemoveFileBg } from "./Controller/RemoveBackgroundController";

export async function router(app:FastifyInstance) {
    app.addHook("preHandler",(req,res,done)=>{
        console.log(req.method,req.routeOptions.url,req.body,req.params)
        done()
    })
    app.route({method:"GET",url:"/",handler:async(req:FastifyRequest,res:FastifyReply)=>{
        res.header('Content-Type', 'text/html');
        res.send(`<p>Hey, we are moving to an active FrontEnd. While this new App is not done we can use <a href="http://127.0.0.1:4545/home">this</a></p>`)
    }})
    app.route({method:"POST",url:"/image/file",handler:RemoveFileBg,preHandler:upload.single("avatar")})
    app.route({method:"GET",url:"/home",handler:GoHome})
    app.route({url:"/image/remove",method:"POST",handler:ApplyEffectController})
}
