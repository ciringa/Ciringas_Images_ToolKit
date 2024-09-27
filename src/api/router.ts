import { exec } from "child_process";
import fastify, { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { readFile } from "fs";
import path from "path";
import { promisify } from "util";
import { z } from "zod";
import { promises as fsPromises } from "fs";
import { ApplyEffectController } from "./Controller/ApplyEffectController";
import { GoHome } from "./Controller/GoHomeController";

import { upload } from "./lib/multer";
import { RemoveFileBg } from "./Controller/RemoveBackgroundController";

export async function router(app:FastifyInstance) {
    app.addHook("preHandler",(req,res,done)=>{
        console.log(req.method,req.routeOptions.url,req.body,req.params)
        done()
    })
    app.route({method:"POST",url:"/image/file",handler:RemoveFileBg,preHandler:upload.single("avatar")})
    app.route({method:"GET",url:"/",handler:GoHome})
    app.route({url:"/image/remove",method:"POST",handler:ApplyEffectController})
}
