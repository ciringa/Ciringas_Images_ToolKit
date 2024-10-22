import { randomUUID } from "crypto";
import { FastifyReply, FastifyRequest } from "fastify";
import { createReadStream, readFile } from "fs";
import path from "path";
import { z } from "zod";

export async function downloadImage(req:FastifyRequest,res:FastifyReply) {
    const {filePath} = z.object({
        filePath:z.string(),
    }).parse(req.body)

    const imagePath = path.join(__dirname, filePath); // Caminho da imagem
    try{


        // Lê o arquivo da imagem
        readFile(imagePath, (err, data) => {
          if (err) {
            res.status(500).send('Erro ao carregar a imagem');
            return;
          }

          // Envia a imagem com o cabeçalho correto
          res
            .type('image/jpeg') // Defina o tipo MIME conforme a imagem
            .send(data);
        });
    }catch(err){
        if(err){
            console.error(err);
            res.status(500).send(err);
        }
    }
}