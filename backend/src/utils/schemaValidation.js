import {z} from "zod";


export const registerValidation = z.object({
    name: z.string().min(3,"Name must be more than 3 characters"),
    email: z.string().email(),
    password: z.string().min(4,"Password must be more than 4 characters"),
})

export const loginValidation = z.object({
    email: z.string().email(),
    password: z.string().min(4,"Password must be more than 4 characters")
})