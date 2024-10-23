import { FastifyRequest } from "fastify";
import multer from "fastify-multer";

export const upload = multer({
    dest:".temp/uploads/"
})


export interface MulterRequest extends FastifyRequest{
    [x: string]: any;
    file:Express.Multer.File // tipagem de arquivo
}