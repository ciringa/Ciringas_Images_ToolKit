import { FastifyReply } from "fastify";
import { promisify } from "util";
import { exec } from "child_process";
import path from "path";
import { z } from "zod";
import { MulterRequest } from "../../../lib/multer";
import { HOST, PORT } from "../../../lib/env";


export async function ImageTransaformControler(req:MulterRequest,res:FastifyReply) {
    const file = req.file
    const {scale} = z.object({
        scale:z.string()
    }).parse(req.body)
    
    //recurso que converte uma funçao em promessa
    const execPromise = promisify(exec);
    try{
        // Usando path.join para garantir compatibilidade de caminho entre sistemas operacionais
        const pythonScriptPath = path.join(__dirname, '../../../python/Transform.py');
        const ImagePath = path.join(file.path)
        const outPath = path.join("./.temp/images/")
        //stdout= sucesso stderr = erros 
        const { stdout, stderr } = await execPromise(`python ${pythonScriptPath} ${ImagePath} ${outPath} ${scale}`);
        if (stderr) {
            console.error(`stderr: ${stderr}`);
            res.status(500).send(`Error: ${stderr}`);
            return;
        }else{
            //if logged user, creates an image ref in DB 
            res.status(201).send({
                ResultFromPython:stdout,
                Description:"uploaded and saved image",
                File:file
            })
        }
    }catch (error) {
        console.error(`Error: ${error.message}`);
        res.status(500).send(`Error: ${error.message}`);
    }
}