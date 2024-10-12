import { randomUUID } from "crypto";
import { FastifyReply, FastifyRequest } from "fastify";
import { createReadStream } from "fs";
import { z } from "zod";

export async function downloadImage(req:FastifyRequest,res:FastifyReply) {
    const {filePath} = z.object({
        filePath:z.string(),
    }).parse(req.body)

    try{
        const stream = createReadStream(filePath);
        res.header('Content-Type', 'application/octet-stream') // MIME type
        .header(`Content-Disposition`, `attachment; filename="${randomUUID()}.png"`) // Force download
        .send({
            fileType:"png",
            stream}
        ); // Send the file stream
    }catch(err){
        if(err){
            console.error(err);
            res.status(500).send(err);
        }
    }

}