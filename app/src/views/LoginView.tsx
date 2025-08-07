import React from "react"
import LoginForm from "../components/auth/LoginForm"

const LoginView: React.FC = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <LoginForm />
        </div>
    )
}

export default LoginView 