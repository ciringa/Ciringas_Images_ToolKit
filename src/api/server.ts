import { app } from "./lib/app"

app.listen({
    port:4545,
    host:"localhost"
},(err,path)=>{
    console.log(err||path)
})