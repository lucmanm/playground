"use server"

import { projectSchema } from "@/app/(root)/[crudproduct]/add-edit-project-form";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";


// export const projectSchema = z.object({
//     name: z.string().min(1),
//     description: z.string().min(1)
// })
type TProjectProps = {
    name: string,
    description: string
}
// Create Single Project Query
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


// Update Project Query
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


// Create Nuld Project Query
export async function createBulkProject(excelData: TProjectProps[]) {
    try {
        await prisma.project.createMany({
            data: excelData.map(item => ({
                name: item.name,
                description: item.description
            }))
        })
        revalidatePath("/")
    } catch (error) {
        console.log("ERROR_CREATE_RPOJECT", error);
    }
}

// export async function createBulkProject(excelData: z.infer<typeof projectSchema>[]) {
//     try {
//         console.log("Creating BULK project");
//         for(const data of excelData){
//             await createProject(data)
//         }
//     } catch (error) {
//         console.log("ERROR_CREATE_RPOJECT", error);

//     }
// }

export async function deleteProject(paramId: string | undefined) {
    try {
        await prisma.project.delete({
            where:{
                id: paramId
            }
        })
        revalidatePath("/")
    } catch (error) {
        console.log("ERROR_DELETE_PROJECT", error);
        
    }
}