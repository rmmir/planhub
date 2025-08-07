import { Routes, Route } from "react-router-dom"
import { AuthProvider } from "./contexts/AuthContext"
import LoginView from "./views/LoginView"
import RegisterView from "./views/RegisterView"
import DashboardView from "./views/DashboardView"
import WhiteboardView from "./views/WhiteboardView"
import ProtectedRoute from "./components/common/ProtectedRoute"

function App() {
    return (
        <AuthProvider>
            <div className="min-h-screen bg-gray-100 text-gray-800">
                <Routes>
                    <Route
                        path="/"
                        element={
                            <ProtectedRoute>
                                <DashboardView />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/whiteboard/:id"
                        element={
                            <ProtectedRoute>
                                <WhiteboardView />
                            </ProtectedRoute>
                        }
                    />
                    <Route path="/login" element={<LoginView />} />
                    <Route path="/register" element={<RegisterView />} />
                </Routes>
            </div>
        </AuthProvider>
    )
}

export default App 