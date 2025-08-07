import React, { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useMutation } from "@apollo/client"
import { gql } from "@apollo/client"
import { z } from "zod"
import toast from "react-hot-toast"

const REGISTER = gql`
    mutation Register($input: RegisterInput!) {
        register(input: $input) {
            message
        }
    }
`

const registerSchema = z.object({
    email: z.string().email("Invalid email address"),
    username: z.string().min(3, "Username must be at least 3 characters"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
})

interface RegisterFormData {
    email: string
    username: string
    password: string
    confirmPassword: string
}

interface FormErrors {
    email?: string
    username?: string
    password?: string
    confirmPassword?: string
    message?: string
}

const RegisterForm: React.FC = () => {
    const [form, setForm] = useState<RegisterFormData>({
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
    })
    const [errors, setErrors] = useState<FormErrors>({})
    const [register] = useMutation(REGISTER)
    const navigate = useNavigate()

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setForm(prev => ({ ...prev, [name]: value }))
        setErrors(prev => ({ ...prev, [name]: "" }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        
        const result = registerSchema.safeParse(form)
        if (!result.success) {
            const newErrors: FormErrors = {}
            result.error.errors.forEach((error) => {
                const field = error.path[0] as keyof RegisterFormData
                newErrors[field] = error.message
            })
            setErrors(newErrors)
            return
        }

        const { email, username, password } = form

        try {
            const result = await register({
                variables: {
                    input: {
                        username,
                        email,
                        password,
                    },
                },
            })

            toast.success(result.data.register.message)
            navigate("/login")
        } catch (err: any) {
            const errorMessage = err.graphQLErrors?.[0]?.message || "Registration failed"
            setErrors(prev => ({ ...prev, message: errorMessage }))
            toast.error(errorMessage)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-sm mx-auto">
            <h2 className="text-2xl font-bold text-center">Register</h2>

            <div>
                <label className="block mb-1 text-sm font-medium">Email</label>
                <input
                    name="email"
                    value={form.email}
                    onChange={handleInputChange}
                    type="email"
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
                />
                {errors.email && (
                    <p className="text-red-600 text-sm mt-1">{errors.email}</p>
                )}
            </div>

            <div>
                <label className="block mb-1 text-sm font-medium">Username</label>
                <input
                    name="username"
                    value={form.username}
                    onChange={handleInputChange}
                    type="text"
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
                />
                {errors.username && (
                    <p className="text-red-600 text-sm mt-1">{errors.username}</p>
                )}
            </div>

            <div>
                <label className="block mb-1 text-sm font-medium">Password</label>
                <input
                    name="password"
                    value={form.password}
                    onChange={handleInputChange}
                    type="password"
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
                />
                {errors.password && (
                    <p className="text-red-600 text-sm mt-1">{errors.password}</p>
                )}
            </div>

            <div>
                <label className="block mb-1 text-sm font-medium">Confirm Password</label>
                <input
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={handleInputChange}
                    type="password"
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
                />
                {errors.confirmPassword && (
                    <p className="text-red-600 text-sm mt-1">{errors.confirmPassword}</p>
                )}
            </div>

            {errors.message && (
                <p className="text-red-600 text-sm mt-1">{errors.message}</p>
            )}

            <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
                Create Account
            </button>

            <p className="text-sm text-center mt-4">
                Already have an account?{" "}
                <Link to="/login" className="text-blue-600 hover:underline">
                    Log In
                </Link>
            </p>
        </form>
    )
}

export default RegisterForm 