import { FastifyReply } from "fastify";
import { promisify } from "util";
import { exec } from "child_process";
import path from "path";
import { z } from "zod";
import { MulterRequest } from "../../../core/multer";
import { HOST, PORT } from "../../../core/env";
import { Image } from "@prisma/client";
import { IsUserLoggedIn } from "../../midleware/VerifyJWT";
import { createImageUseCase } from "../../../services/Images/CreateImage";
import { unlinkSync } from "fs";
import { slugger } from "../../../utils/slugger";
import { jwtUser } from "../../../@types/Fastify-jwt";
import { basename } from "node:path";
import { uploadImage } from "../../../core/minio";

export async function FaceRecogntionController(req:MulterRequest,res:FastifyReply) {
    const file = req.file
    if (!file) {
        res.status(400).send({ error: "No file uploaded" })
        return
    }

    const {action} = z.object({
        action:z.string()
    }).parse(req.body)
    
    //recurso que converte uma funçao em promessa
    const execPromise = promisify(exec);
    try{
        // Usando path.join para garantir compatibilidade de caminho entre sistemas operacionais
        const pythonScriptPath = path.resolve(process.cwd(), 'src', 'python', 'Faces', 'main.py');
        const ImagePath = path.join(file.path)
        const outPath = path.join("./.temp/images/")
        //stdout= sucesso stderr = erros 
        const { stdout, stderr } = await execPromise(`python ${pythonScriptPath} ${ImagePath} ${outPath} ${action}`);
        if (stderr) {
            console.error(`stderr: ${stderr}`);
            res.status(500).send(`Error: ${stderr}`);
            return;
        }else{
            const outputPath = stdout.trim().split(/\r?\n/).pop();
            if (!outputPath) {
                throw new Error("Face recognition did not return an output path");
            }
            const objectName = `images/final/${basename(outputPath)}`;
            await uploadImage(objectName, outputPath, "image/png");

            //if logged user, creates an image ref in DB 
            var newImage:Image|null = null;
            if(await IsUserLoggedIn(req) && req.file){
                const service = new createImageUseCase()
                const user = await req.jwtDecode() as jwtUser;
                newImage = await service.execute({
                    path:objectName,
                    userId:String(req.cookies.sub),
                    slug:slugger(`${file.originalname}.${file.mimetype}-${user.sub}`),
                    mimetype:file.mimetype,
                    size:file.size?String(file.size)+"kb":undefined
                })
            }
            //deletar o arquivo temporario
            unlinkSync(file.path)
            res.status(201).send({
                ResultFromPython:objectName,
                Description:"uploaded and saved image",
                File:{ ...file, path:objectName },
                ToUser:newImage
            })
        }
    }catch (error) {
        console.error(`Error: ${error}`);
        res.status(500).send({ error: "Unable to process image",errorDetails:error });
    }
}