import { exec } from "child_process";
import { FastifyReply, FastifyRequest } from "fastify";
import { send } from "process";
import { promisify } from "util";
import { MulterRequest } from "../../../lib/multer";
import { HOST, PORT } from "../../../lib/env";
import path from "node:path";
export async function  RemoveFileBg(req:MulterRequest,res:FastifyReply) {
    const file = req.file
    
    console.log(file)

    //recurso que converte uma funçao em promessa
    const execPromise = promisify(exec);
    try{
        // Usando path.join para garantir compatibilidade de caminho entre sistemas operacionais
        const pythonScriptPath = path.join(__dirname, '../../../python/bgremove.py');
        const ImagePath = path.join(file.path)
        const outPath = path.join("./.temp/images/")
        //stdout= sucesso stderr = erros 
        const { stdout, stderr } = await execPromise(`python ${pythonScriptPath} ${ImagePath} ${outPath}`);
        if (stderr) {
            console.error(`stderr: ${stderr}`);
            res.status(500).send(`Error: ${stderr}`);
            return;
        }else{

            res.status(201).send({
                ResultFromPython:stdout,
                Description:"uploaded and saved image",
                File:file
            })
        }
        res.send(`Result from Python: ${stdout}`);
    }catch (error) {
        console.error(`Error: ${error.message}`);
        res.status(500).send(`Error: ${error.message}`);
    }
}