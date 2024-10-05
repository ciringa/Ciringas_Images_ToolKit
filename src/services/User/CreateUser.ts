import { Prisma, User } from "@prisma/client";
import { prisma } from "../../lib/prisma";


export class createUserUseCase{
    async execute(data:Prisma.UserCreateInput):Promise<User>{
        const doesTheEmailAlreadyExists = await prisma.user.findUnique({
            where:{
                Email:data.Email
            }
        })

        if(doesTheEmailAlreadyExists){
            throw new Error("This email is already in use")
        }

        const response = await prisma.user.create({
            data
        })
        return response
    }
}