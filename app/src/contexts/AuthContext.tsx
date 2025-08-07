import React, { createContext, useContext, useEffect, useState } from "react"
import { jwtDecode } from "jwt-decode"

interface AuthContextType {
    isAuthenticated: boolean
    login: (token: string) => void
    logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
}

interface AuthProviderProps {
    children: React.ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    useEffect(() => {
        const token = localStorage.getItem("access_token")
        if (token) {
            try {
                const decoded: { exp: number } = jwtDecode(token)
                const isExpired = decoded.exp * 1000 < Date.now()
                
                if (!isExpired) {
                    setIsAuthenticated(true)
                } else {
                    localStorage.removeItem("access_token")
                }
            } catch (err) {
                localStorage.removeItem("access_token")
            }
        }
    }, [])

    const login = (token: string) => {
        localStorage.setItem("access_token", token)
        setIsAuthenticated(true)
    }

    const logout = () => {
        localStorage.removeItem("access_token")
        setIsAuthenticated(false)
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
} 