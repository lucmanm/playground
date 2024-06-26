import { z } from "zod";


const envSchema = z.object({
    POSTGRES_URL: z.string().min(1, "ERROR_POSTGRES_URL"),
    POSTGRES_PRISMA_URL: z.string().min(1, "ERROR_POSTGRES_PRISMA_URL"),
    POSTGRES_URL_NO_SSL: z.string().min(1, "ERROR_POSTGRES_URL_NO_SSL"),
    POSTGRES_URL_NON_POOLING: z.string().min(1, "POSTGRES_URL_NON_POOLING"),
    POSTGRES_USER: z.string().min(1, "ERROR_POSTGRES_USER"),
    POSTGRES_HOST: z.string().min(1, "ERROR_POSTGRES_HOST"),
    POSTGRES_PASSWORD: z.string().min(1, "ERROR_POSTGRES_PASSWORD"),
    POSTGRES_DATABASE: z.string().min(1, "ERROR_POSTGRES_DATABASE"),
    AUTH_SECRET: z.string().min(1, "ERROR_AUTH_SECRET "),
    AUTH_GOOGLE_ID: z.string().min(1, "ERROR_AUTH_GOOGLE_ID "),
    AUTH_GOOGLE_SECRET: z.string().min(1, "AUTH_GOOGLE_SECRET "),
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: z.string().min(1, "ERROR_NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME "),
    NEXT_PUBLIC_CLOUDINARY_API_KEY: z.string().min(1, "ERROR_NEXT_PUBLIC_CLOUDINARY_API_KEY "),
    CLOUDINARY_API_SECRET: z.string().min(1, "ERROR_CLOUDINARY_API_SECRET"),
    NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESETS: z.string().min(1, "ERROR_NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESETS"),
})

export const env = envSchema.parse(process.env) 