import { exec } from "child_process";
import { FastifyReply, FastifyRequest } from "fastify";
import path from "path";
import { promisify } from "util";

export async function ApplyEffectController(req:FastifyRequest,res:FastifyReply){
    const file = req.file
    
    console.log(file)
    //recurso que converte uma funçao em promessa
    const execPromise = promisify(exec);
    try{
        // Usando path.join para garantir compatibilidade de caminho entre sistemas operacionais
        const pythonScriptPath = path.join(__dirname, '../../python/bgremove.py');
        const ImagePath = path.join(file.path)
        const exitPath = path.join("./.temp/images/")
        //stdout= sucesso stderr = erros 
        //abertura do código para o python 
        const { stdout, stderr } = await execPromise(`python ${pythonScriptPath} ${ImagePath} ${exitPath}`);
        if (stderr) {
            console.error(`stderr: ${stderr}`);
            res.status(500).send(`Error: ${stderr}`);
            return;
        }
        console.log("called")
        res.send(`Result from Python: ${stdout}`);
    }catch (error) {
        console.error(`Error: ${error.message}`);
        res.status(500).send(`Error: ${error.message}`);
    }

    res.redirect("http://[::1]:4545/")
}