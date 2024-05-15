"use server"

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

export async function createProject(excelData: TProjectProps[]) {
    try {
        await prisma.project.createMany({
            data: excelData.map(item => ({
                name: item.name,
                description: item.description
            }))
        })
        console.log("Creating project");
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
