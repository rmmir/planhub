import React, { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useMutation } from "@apollo/client"
import { gql } from "@apollo/client"
import { useAuth } from "../../contexts/AuthContext"
import toast from "react-hot-toast"

const LOGIN = gql`
    mutation Login($input: LoginInput!) {
        login(input: $input) {
            access_token
        }
    }
`

interface LoginFormData {
    email: string
    password: string
}

const LoginForm: React.FC = () => {
    const [form, setForm] = useState<LoginFormData>({
        email: "",
        password: "",
    })
    const [error, setError] = useState("")
    const [login] = useMutation(LOGIN)
    const { login: authLogin } = useAuth()
    const navigate = useNavigate()

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setForm(prev => ({ ...prev, [name]: value }))
        setError("")
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const { email, password } = form

        try {
            const result = await login({
                variables: {
                    input: {
                        email,
                        password,
                    },
                },
            })

            const token = result.data.login.access_token
            authLogin(token)
            toast.success("Login successful!")
            navigate("/")
        } catch (err: any) {
            const errorMessage = err.graphQLErrors?.[0]?.message || "Login failed"
            setError(errorMessage)
            toast.error(errorMessage)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-sm mx-auto">
            <h2 className="text-2xl font-bold text-center">Login</h2>

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
            </div>

            {error && (
                <p className="text-red-600 text-sm mt-1">{error}</p>
            )}

            <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
                Sign In
            </button>

            <p className="text-sm text-center mt-4">
                Don't have an account?{" "}
                <Link to="/register" className="text-blue-600 hover:underline">
                    Register
                </Link>
            </p>
        </form>
    )
}

export default LoginForm 