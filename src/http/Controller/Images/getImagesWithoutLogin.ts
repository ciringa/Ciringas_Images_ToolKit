import { FastifyReply, FastifyRequest } from "fastify";
import { readdirSync } from "fs";
import path from "path";

export async function GetImagesListWithoutLogin(req:FastifyRequest,res:FastifyReply) {
    const folder = "./.temp/images"//add this to request later
    const getImagesFromFolder = async (folderPath:string):Promise<string[]>=>{
        const files = readdirSync(folderPath)//lê todos os arquivos da pasta
        const images: string[] = [];

        files.forEach(file=>{
            const ext = path.extname(file).toLowerCase();//extensão do arquivo
            if(ext==".png"){
                images.push(path.join(__dirname,file))
            }
        })

        return images;
    }

    res.status(200).send({
        Description:"Returned the following file list",
        Files: await getImagesFromFolder(folder)
    })
}