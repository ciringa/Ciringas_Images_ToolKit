import { Image, Prisma } from "@prisma/client";
import { prisma } from "../lib/prisma";
import { error } from "console";

export class createImageUseCase{
    async execute(data:Prisma.ImageUncheckedCreateInput):Promise<Image>{
        const doesTheUserExists = await prisma.image.create({
            data
        })
        if(!doesTheUserExists){
            throw new Error("The user does not exists")
        }

        return await prisma.image.create({
            data
        })
    }
}