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

export const defaultFormProjectSchema = z.object({
    id: z.string().optional(),
    name: z.string().min(1, "Please enter title of your project"),
    description: z.string().min(1, "Please enter description of your project"),
    technology: z.array(z.object({
        name: z.array(z.string()).refine((value) => value.some((item) => item), {
            message: "You have to select at least one item.",
          }),
    }))
});