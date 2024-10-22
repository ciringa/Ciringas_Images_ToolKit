import "@fastify/jwt"
import "fastify-multer"
declare module '@fastify/jwt' {
    export interface FastifyJWT {
        user:{
            sub:string
        }
    }
}

