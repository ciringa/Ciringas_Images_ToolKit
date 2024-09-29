import { app } from "./lib/app"
import { HOST, PORT } from "./lib/env"

app.listen({
    port:Number(PORT),
    host:HOST
},(err,path)=>{
    console.log(err||path)
})