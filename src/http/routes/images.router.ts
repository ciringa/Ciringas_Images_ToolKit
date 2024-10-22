import { FastifyInstance } from "fastify";
import { ApplyEffectController } from "../Controller/uploads/ApplyEffectController";
import { RemoveFileBg } from "../Controller/uploads/RemoveBackgroundController";
import { ImageTransaformControler } from "../Controller/uploads/ImageTransformationController";
import { upload } from "../../lib/multer";
import { GetImagesListWithoutLogin } from "../Controller/Images/getImagesWithoutLogin";
import { downloadImage } from "../Controller/Images/download";

export async function ImagesRoutes(app:FastifyInstance) {
    //upload and apply effects
    app.route({method:"POST",url:"/remove",handler:RemoveFileBg,preHandler:upload.single("avatar")})
    app.route({url:"/effect",method:"POST",handler:ApplyEffectController,preHandler:upload.single("avatar")})
    app.route({url:"/rescale",method:"POST",handler:ImageTransaformControler,preHandler:upload.single("avatar")})

    //return image
    app.route({method:"GET",url:"/return",handler:GetImagesListWithoutLogin})

    //donwload routes
    app.route({method:"PATCH",url:"/download",handler:downloadImage})
}