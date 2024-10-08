import { FastifyInstance, FastifyRequest } from "fastify";
import { MulterRequest } from "../../lib/multer";

export async function IsUserLoggedIn(req:MulterRequest | FastifyRequest) {
    try {
        await req.jwtVerify(); // Tenta verificar o token JWT
        return true; // Retorna `true` se o token for válido
    } catch (err) {
        // Retorna `false` caso o token seja inválido ou ocorra algum erro
        return false;
    }
}