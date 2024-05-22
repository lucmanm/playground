"use server"

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const techDefaultData = [
    "React", "Javascript", "HTML"
] as const

const projectDefaultData = {
    title: "www.compu-tech.com.sa",
    description: "A website electronic from jeddah",
    technology: ["React", "Javascript"]

}


const techDefaultDataSchema = z.string().array()

export async function createSyncTechnology() {
    try {
        const session = await auth()
        const user = session?.user

        const data = techDefaultDataSchema.parse(techDefaultData)

        if (user?.role === "ADMIN") {

            const status = await prisma.technology.createMany({
                data: data.map(data => ({
                    name: data
                })),
                skipDuplicates: true
            })
            if (user.id) {

                await prisma.project.create({
                    data: {
                        name: projectDefaultData.title,
                        description: projectDefaultData.description,
                        userId: user.id,
                        technology: {
                            connect: projectDefaultData.technology.map(data => ({
                                name: data
                            }))
                        }
                    },

                })


            }
            revalidatePath("/")
            if (status) {
                return { message: "Sucessfully Syncronized" }
            }

        }

    } catch (error) {
        console.log("createSyncTechnology_ERROR", error);

    }
}