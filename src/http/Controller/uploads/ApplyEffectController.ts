import { exec } from "child_process";
import { FastifyReply, FastifyRequest } from "fastify";
import path from "path";
import { promisify } from "util";
import { MulterRequest } from "../../../lib/multer";
import { effect, z } from "zod";
import { HOST, PORT } from "../../../lib/env";
import { IsUserLoggedIn } from "../../midleware/VerifyJWT";
import { createUserUseCase } from "../../../services/User/CreateUser";
import { createImageUseCase } from "../../../services/CreateImage";
import { Image } from "@prisma/client";
import { unlinkSync } from "fs";

export async function ApplyEffectController(req:MulterRequest,res:FastifyReply){
    const file = req.file
    const {Effect,Amount}  = z.object({
          Effect:z.string(),
          Amount:z.string()
      }).parse(req.body)
    // console.log(file)
    switch(Number(Effect)){
        case 2: if(Number(Amount)>7){
            res.status(401).send("Amount is out o range");
        }
        case 3: if(Number(Amount)>15){
            res.status(401).send("Amount is out o range");
        }
    }
    //recurso que converte uma funçao em promessa
    const execPromise = promisify(exec);
    try{
        // Usando path.join para garantir compatibilidade de caminho entre sistemas operacionais
        const pythonScriptPath = path.join(__dirname, '../../../python/Effects.py');
        const ImagePath = path.join(file.path)
        const exitPath = path.join("./.temp/images/")
        //stdout= sucesso stderr = erros 
        //abertura do código para o python 
        const { stdout, stderr } = await execPromise(`python ${pythonScriptPath} ${ImagePath} ${exitPath} ${Effect} ${Amount}`);
        if (stderr) {
            console.error(`stderr: ${stderr}`);
            return;
        }else{
            var newImage:Image|null = null;
            if(await IsUserLoggedIn(req)){
                const service = new createImageUseCase()
                newImage = await service.execute({
                    Path:req.file.path,
                    UserId:String(req.cookies.sub)
                })
            }
            //clear file root directory 
            unlinkSync(file.path)
            res.status(201).send({
                ResultFromPython:stdout.replace("\r\n",""),
                Description:"uploaded and saved image",
                File:file,
                ToUser:newImage
            })
        }
    }catch (error) {
        console.error(error);
    }
}