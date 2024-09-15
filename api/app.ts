import { exec } from "child_process";
import {fastify, FastifyReply, FastifyRequest} from "fastify"
import path from "path";
import { promisify } from "util";
import {z} from "zod"
import cors from "@fastify/cors"
import { router } from "./router";
const app = fastify()

//register CORS
app.register(cors, { 
    origin: true, // Permite todas as origens. Para restringir, você pode especificar uma URL, como 'http://localhost:3000'
    methods: ['GET', 'POST', 'PUT', 'DELETE', "PATCH"], // Métodos HTTP permitidos
    allowedHeaders: ['Content-Type', 'Authorization'], // Cabeçalhos permitidos
    credentials: true // Permite o envio de cookies e headers de autorização entre o frontend e o backend
});

app.listen({
    port:4545,
    host:"localhost"
},(err,path)=>{
    console.log(err||path)
})

app.register(router)

//rota simples

/*

app.route({
    method:"GET",
    url:"/test",
    handler:async (req:FastifyRequest,res:FastifyReply)=>{
        //gambiarra abaixo para rodar scripts python
        const execPromise = promisify(exec);
        try {
            // Usando path.join para garantir compatibilidade de caminho entre sistemas operacionais
            const pythonScriptPath = path.join(__dirname, '../python/test.py');
            
            const { stdout, stderr } = await execPromise(`python ${pythonScriptPath}`);
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

*/