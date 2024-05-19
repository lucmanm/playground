"use server"

import { projectSchema } from "@/app/(root)/[crudproduct]/add-edit-project-form";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { User } from "next-auth";
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
        const session = await auth()
        const userId = session?.user.id

        if (userId) {
            const { name, description, } = data
            await prisma.project.create({

                data: {
                    name,
                    description,
                    userId: userId
                }
            })

        }
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

export async function deleteProject(productId: string | undefined) {
    try {
        const session = await auth()
        const user = session?.user

        if (user?.role === "ADMIN") {

            await prisma.project.delete({
                where: {
                    id: productId
                }
            })

        }
        revalidatePath("/")
    } catch (error) {
        console.log("ERROR_DELETE_PROJECT", error);

    }
} export async function deleteUserProject(productId: string | undefined) {
    try {
        const session = await auth()
        const user = session?.user

        if (user?.role === "USER") {

            await prisma.project.delete({
                where: {
                    id: productId,
                    userId: user?.id 
                }
            })

        }
        revalidatePath("/")
    } catch (error) {
        console.log("ERROR_DELETE_PROJECT", error);

    }
}