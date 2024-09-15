import { exec } from "child_process";
import fastify, { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import path from "path";
import { promisify } from "util";
import { z } from "zod";


export async function router(app:FastifyInstance) {
    
    app.route({
        method:"GET",
        url:"/test/:parameter",
        handler:async (req:FastifyRequest,res:FastifyReply)=>{
            const {parameter} = z.object({
                parameter:z.string()
            }).parse(req.params)
            //gambiarra abaixo para rodar scripts python
            const execPromise = promisify(exec);
            try {
                // Usando path.join para garantir compatibilidade de caminho entre sistemas operacionais
                const pythonScriptPath = path.join(__dirname, '../python/test.py');
                
                const { stdout, stderr } = await execPromise(`python ${pythonScriptPath} ${parameter}`);
                if (stderr) {
                    console.error(`stderr: ${stderr}`);
                    res.status(500).send(`Error: ${stderr}`);
                    return;
                }
                res.send(`Result from Python: ${stdout}`);
            } catch (error) {
                console.error(`Error: ${error.message}`);
                res.status(500).send(`Error: ${error.message}`);
            }
        }
    })



    app.route({
        url:"/image/remove",
        method:"PATCH",
        handler:async(req:FastifyRequest,res:FastifyReply)=>{
            const {url} = z.object({
                url:z.string()
            }).parse(req.body)
            //recurso que converte uma funçao em promessa
            const execPromise = promisify(exec);
            try{
                // Usando path.join para garantir compatibilidade de caminho entre sistemas operacionais
                const pythonScriptPath = path.join(__dirname, '../python/basic.py');
                const ImagePath = path.join(url)
                //stdout= sucesso stderr = erros 
                const { stdout, stderr } = await execPromise(`python ${pythonScriptPath} ${ImagePath}`);
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
        }
    })

}
