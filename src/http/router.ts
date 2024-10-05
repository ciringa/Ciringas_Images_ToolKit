
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { GoHome } from "./Controller/GoHomeController";
import { RemoveFileBg } from "./Controller/uploads/RemoveBackgroundController";
import { ApplyEffectController } from "./Controller/uploads/ApplyEffectController";
import { ImageTransaformControler } from "./Controller/uploads/ImageTransformationController";
import { upload } from "../lib/multer";
import { LoginController } from "./Controller/User/Login";


export async function router(app:FastifyInstance) {
    app.addHook("preHandler",(req,res,done)=>{
        console.log(req.method,req.routeOptions.url,req.body,req.params)
        done()
    });
    app.route({method:"POST",url:"/image/remove",handler:RemoveFileBg,preHandler:upload.single("avatar")})
    app.route({url:"/image/effect",method:"POST",handler:ApplyEffectController,preHandler:upload.single("avatar")})
    app.route({url:"/image/rescale",method:"POST",handler:ImageTransaformControler,preHandler:upload.single("avatar")})

    //user and commonjs routes
    app.route({method:"PATCH",url:"/users/Login",handler:LoginController});

    //frontend call 
    app.route({method:"GET",url:"/home",handler:GoHome})
    app.route({method:"GET",url:"/",handler:async(req:FastifyRequest,res:FastifyReply)=>{
        res.header('Content-Type', 'text/html');
        res.send(`<p>Hey, we are moving to an active FrontEnd. While this new App is not done we can use <a href="http://127.0.0.1:4545/home">this</a></p>`)
    }});
}
