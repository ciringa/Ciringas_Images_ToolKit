import { exec } from "child_process";
import fastify, { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { readFile } from "fs";
import path from "path";
import { promisify } from "util";
import { z } from "zod";
import { promises as fsPromises } from "fs";

export async function router(app:FastifyInstance) {
    app.addHook("preHandler",(req,res,done)=>{
        console.log(req.method,req.routeConfig.url,req.body,req.params)
        done()
    })
    app.route({
        method:"GET",
        url:"/",
        handler:async (req: FastifyRequest, res: FastifyReply) => {
            try {
                const htmlPath = path.join(__dirname, '../frontend', 'index.html');
                const html = await fsPromises.readFile(htmlPath, 'utf8');
                res.header('Content-Type', 'text/html'); //garante que o navegador irá interpretar a reposta como sendo html 
                res.send(html);
            } catch (err) {
                console.error(err);
                res.status(500).send('Internal Server Error');
            }
        }
    
    })

    app.route({
        url:"/image/apply/effect",
        method:"post",
        handler:async(req:FastifyRequest,res:FastifyReply)=>{
            const {url,effect} = z.object({
                url:z.string(),
                effect:z.number()
            }).parse(req.body)
            //recurso que converte uma funçao em promessa
            const execPromise = promisify(exec);
            try{
                // Usando path.join para garantir compatibilidade de caminho entre sistemas operacionais
                const pythonScriptPath = path.join(__dirname, '../python/Effects.py');
                const ImagePath = path.join(url)
                //stdout= sucesso stderr = erros 
                const { stdout, stderr } = await execPromise(`python ${pythonScriptPath} ${ImagePath} ${effect}`);
                if (stderr) {
                    console.error(`stderr: ${stderr}`);
                    res.status(500).send(`Error: ${stderr}`);
                    return;
                }
                res.send(`Result from Python: ${stdout}`);
            }catch (error) {
                console.error(`Error: ${error.message}`);
                res.status(500).send(`Error: ${error.message}`);
            }
        }
    })


    app.route({
        url:"/image/remove",
        method:"POST",
        handler:async(req:FastifyRequest,res:FastifyReply)=>{
            const {inputPath,outputPath} = z.object({
                inputPath:z.string(),
                outputPath:z.string()
            }).parse(req.body)
            //recurso que converte uma funçao em promessa
            const execPromise = promisify(exec);
            try{
                // Usando path.join para garantir compatibilidade de caminho entre sistemas operacionais
                const pythonScriptPath = path.join(__dirname, '../python/bgremove.py');
                const ImagePath = path.join(inputPath)
                const exitPath = path.join(outputPath)
                //stdout= sucesso stderr = erros 
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
        }
    })
}
