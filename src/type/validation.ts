import { z } from "zod";

export const defaultTechnologySchema = z.array(z.object({
    id: z.string().optional(),
    name: z.string(),
}))


export const defaultProjectSchema = z.object({
    id: z.string().optional(),
    name: z.string().min(1, "Please enter title of your project"),
    description: z.string().min(1, "Please enter description of your project"),
    technology: defaultTechnologySchema
});

