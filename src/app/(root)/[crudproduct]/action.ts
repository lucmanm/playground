"use server"
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { projectSchema } from "./add-edit-project-form";


export async function updateProject(data: z.infer<typeof projectSchema>) {
    try {
        const { name, description } = data
        await prisma.project.update({
            where: {
                id: data.id
            },
            data: {
                name,
                description
            }
        })
        revalidatePath("/")
    } catch (error) {
        console.log("ERROR_UPDATE_PROJECT", error);
    }
}

export async function createProject(data: z.infer<typeof projectSchema>) {
    try {
        
        const { name, description } = data
        await prisma.project.create({

            data: {
                name,
                description
            }
        })

        revalidatePath("/")
    } catch (error) {
        console.log("ERROR_CREATE_PROJECT", error);
    }
}