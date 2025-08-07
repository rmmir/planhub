import React from "react"
import RegisterForm from "../components/auth/RegisterForm"

const RegisterView: React.FC = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <RegisterForm />
        </div>
    )
}

export default RegisterView 