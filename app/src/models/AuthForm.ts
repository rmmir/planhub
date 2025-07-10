import { z } from "zod"

export interface LoginForm {
    email: string
    password: string
}

export interface RegisterForm {
    username: string
    email: string
    password: string
    confirmPassword: string
}

const passwordRequirements =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/

export const registerSchema = z
    .object({
        email: z.string().email({ message: "Invalid email address" }),
        username: z
            .string()
            .min(3, { message: "Username must be at least 3 characters" }),
        password: z
            .string()
            .min(8, { message: "Password must be at least 8 characters" })
            .regex(passwordRequirements, {
                message:
                    "Password must include uppercase, lowercase, number, and special character",
            }),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    })

export const loginSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(8, {
        message: "Password must be at least 8 characters",
    }),
})
