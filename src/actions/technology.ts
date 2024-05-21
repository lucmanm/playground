"use server"

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const techDefaultData = [
    "React", "Javascript", "HTML"
] as const

const techDefaultDataSchema = z.string().array()

export  async function createSyncTechnology() {
    try {

        const data =  techDefaultDataSchema.parse(techDefaultData)
        // const checkData = await prisma.technology.findMany({
        //     where: {
        //         name: data.map(data =>(data)) 
        //     }
        // })
        const status = await prisma.technology.createMany({
            data: data.map(data => ({
                name: data
            })),
            skipDuplicates: true
        })
        if (status) {
            return {message :"Sucessfully Syncronized"}
        }

    } catch (error) {
        console.log("createSyncTechnology_ERROR", error);

    }
}