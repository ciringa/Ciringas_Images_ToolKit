import { exec } from "child_process";
import { FastifyReply, FastifyRequest } from "fastify";
import { promisify } from "util";
import { MulterRequest } from "../../../lib/multer";
import path from "node:path";
import { IsUserLoggedIn } from "../../midleware/VerifyJWT";
import { createImageUseCase } from "../../../services/CreateImage";
import { unlinkSync } from "fs";
import { HOST, PORT } from "../../../lib/env";
import { Image } from "@prisma/client";
export async function  RemoveFileBg(req:MulterRequest,res:FastifyReply) {
    const file = req.file
    
    console.log(file)

    //recurso que converte uma funçao em promessa
    const execPromise = promisify(exec);
    try{
        // Usando path.join para garantir compatibilidade de caminho entre sistemas operacionais
        const pythonScriptPath = path.join(__dirname,'../../../python/bgremove.py');
        const ImagePath = path.join(file.path)
        const outPath = path.join("./.temp/images/")
        //stdout= sucesso stderr = erros 
        const { stdout, stderr } = await execPromise(`python ${pythonScriptPath} ${ImagePath} ${outPath}`);
        if (stderr) {
            console.error(`stderr: ${stderr}`);
            res.status(500).send(`Error: ${stderr}`);
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
            //deletar o arquivo temporario
            unlinkSync(file.path)
            // res.redirect(`http://${HOST}:${PORT}/image/download")
            res.status(201).send({
                ResultFromPython:stdout.replace("\r\n",""),
                Description:"uploaded and saved image",
                File:file,
                ToUser:newImage
            })
        }
        res.send(`Result from Python: ${stdout}`);
    }catch (error) {
        console.error(`Error: ${error}`);
        res.status(500).send(`Error: ${error}`);
    }
}