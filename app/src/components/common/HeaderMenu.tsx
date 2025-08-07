import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"

const HeaderMenu: React.FC = () => {
    const [showProfileDropdown, setShowProfileDropdown] = useState(false)
    const { logout } = useAuth()
    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        navigate("/login")
    }

    return (
        <div className="flex justify-between items-center px-8 py-4 bg-gray-100 border-b border-gray-200">
            <div className="flex items-center">
                <img src="" alt="Logo" className="h-10 mr-6" />
                <nav>
                    <ul className="flex gap-6 m-0 p-0 list-none">
                        <li>
                            <a href="#" className="text-gray-800 font-medium hover:text-blue-600">
                                Dashboard
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
            <div className="relative">
                <button
                    onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                    className="font-semibold text-gray-600 hover:text-blue-600 focus:outline-none cursor-pointer"
                >
                    User
                </button>

                {showProfileDropdown && (
                    <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                        <ul className="py-1">
                            <li>
                                <a
                                    href="/settings"
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                    Settings
                                </a>
                            </li>
                            <li>
                                <button
                                    onClick={handleLogout}
                                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                                >
                                    Logout
                                </button>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    )
}

export default HeaderMenu 