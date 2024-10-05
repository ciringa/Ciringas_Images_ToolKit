import fastify from "fastify";
import cors from "@fastify/cors"
import multer from "fastify-multer";
import { router } from "../http/router";
import fastifyJwt from "@fastify/jwt";
import fastifyCookie from "@fastify/cookie";
import fastifyMultipart from "@fastify/multipart";
export const app = fastify()

//register CORS
app.register(cors, { 
    origin: true, // Permite todas as origens. Para restringir, você pode especificar uma URL, como 'http://localhost:3000'
    methods: ['GET', 'POST', 'PUT', 'DELETE', "PATCH"], // Métodos HTTP permitidos
    allowedHeaders: ['Content-Type', 'Authorization'], // Cabeçalhos permitidos
    credentials: true // Permite o envio de cookies e headers de autorização entre o frontend e o backend
});

app.register(fastifyCookie,{})

app.register(fastifyJwt,{
    secret:"ImagesToolkitLoginAndSingup"
});

app.register(fastifyMultipart)



//registra as rotas da aplição 
app.register(router);