import { exec } from "child_process";
import { FastifyReply, FastifyRequest } from "fastify";
import path from "path";
import { promisify } from "util";
import { z } from "zod";
import { promises as fsPromises } from "fs";

export async function GoHome(req:FastifyRequest,res:FastifyReply){
    try {
        const __dirname = "C:/programaçao/Ciringas_Images_ToolKit"
        const htmlPath = path.join(__dirname,'src/frontend', 'index.html');
        const html = await fsPromises.readFile(htmlPath, 'utf8');
        res.header('Content-Type', 'text/html'); //garante que o navegador irá interpretar a reposta como sendo html 
        res.send(html);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
}
