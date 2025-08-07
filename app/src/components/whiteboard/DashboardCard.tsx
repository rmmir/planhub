import React from "react"
import { useNavigate } from "react-router-dom"

interface DashboardCardProps {
    id: string
    name: string
    description: string
    onOpenEditWhiteboardModal: (payload: { name: string; description: string }) => void
}

const DashboardCard: React.FC<DashboardCardProps> = ({
    id,
    name,
    description,
    onOpenEditWhiteboardModal,
}) => {
    const navigate = useNavigate()

    const goToWhiteboardPage = () => {
        navigate(`/whiteboard/${id}`)
    }

    return (
        <>
            <div className="bg-gray-200 h-36 w-full"></div>
            <div className="p-4">
                <h3
                    className="text-lg font-semibold mb-2 cursor-pointer"
                    onClick={goToWhiteboardPage}
                >
                    {name}
                </h3>
                <p className="text-gray-600 text-sm">{description}</p>
                <button
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded cursor-pointer hover:bg-blue-700 focus:outline-none"
                    onClick={() => onOpenEditWhiteboardModal({ name, description })}
                >
                    Edit
                </button>
            </div>
        </>
    )
}

export default DashboardCard 