
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { GoHome } from "./Controller/GoHomeController";
import { RemoveFileBg } from "./Controller/uploads/RemoveBackgroundController";
import { ApplyEffectController } from "./Controller/uploads/ApplyEffectController";
import { ImageTransaformControler } from "./Controller/uploads/ImageTransformationController";
import { upload } from "../lib/multer";
import { LoginController } from "./Controller/User/Login";
import { GetImagesListWithoutLogin } from "./Controller/Images/getImagesWithoutLogin";
import { downloadImage } from "./Controller/Images/download";
import { ImagesRoutes } from "./routes/images.router";
import { UserRouter } from "./routes/user.router";
import { UtilsRoutes } from "./routes/Utils.Router";


export async function router(app:FastifyInstance) {
    app.addHook("preHandler",(req,res,done)=>{
        console.log(req.method,req.routeOptions.url,req.body,req.params)
        done()
    });
    app.addHook("onResponse",(req,res,done)=>{
        console.log(res.statusCode)
        done()
    })
    app.register(ImagesRoutes,{
        prefix:"/image"
    })
    app.register(UserRouter,{
        prefix:"/user"
    })
    app.register(UtilsRoutes,{})

}
