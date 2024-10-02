import { error } from "console";
import { prisma } from "../../lib/prisma";


export class LoginUserUseCase{
    async execute(data:{Email:string,Password:string}):Promise<string>{
        const {Email,Password} = data
        const doesTheUserExists = await prisma.user.findUnique({
            where:{
                Email
            }
        })
        if(!doesTheUserExists){
            throw new Error("user does not exists");
        }else if(doesTheUserExists.Password == Password){
            return doesTheUserExists.Id
        }else{
            throw new Error("wrong password")
        }
    }
}