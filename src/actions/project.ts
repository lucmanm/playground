"use server"

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { defaultprojectSchema } from "@/type/validation";
import { revalidatePath } from "next/cache";
import { z } from "zod";


export async function createProject(data: z.infer<typeof defaultprojectSchema>) {
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
export async function updateProject(data: z.infer<typeof defaultprojectSchema>) {
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


// Create Nuld Project Query schema type remove
export async function createBulkProject(excelData) {
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

        } else if (user?.role === "USER") {
            const project = await prisma.project.findFirst({
                where:
                {
                    id: productId,
                    user: {
                        role: user.role
                    }
                },
            })

            if (project) {
                await prisma.project.delete({
                    where: {
                        id: productId
                    }
                })
            } else {
                return { error: "Only Admin can delete this project" }
            }
        } else {
            return { error: "Only authorized user can take and action!" }
        }

        revalidatePath("/")

    } catch (error) {
        console.log("ERROR_DELETE_PROJECT", error);

    }
} 