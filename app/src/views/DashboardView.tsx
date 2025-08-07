import React, { useState, useMemo } from "react"
import { useQuery, useMutation } from "@apollo/client"
import { gql } from "@apollo/client"
import toast from "react-hot-toast"
import HeaderMenu from "../components/common/HeaderMenu"
import DashboardCard from "../components/whiteboard/DashboardCard"
import CreateWhiteboardModal from "../components/whiteboard/CreateWhiteboardModal"

const GET_WHITEBOARDS = gql`
    query GetWhiteboards {
        getAll {
            id
            name
            description
            elements
            createdAt
            updatedAt
        }
    }
`

const CREATE_WHITEBOARD = gql`
    mutation CreateWhiteboard($input: CreateWhiteboardInput!) {
        create(input: $input) {
            id
            message
        }
    }
`

interface Whiteboard {
    id: string
    name: string
    description: string
    elements: any[]
}

interface WhiteboardPayload {
    name: string
    description: string
}

const DashboardView: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState("")
    const [isAddWhiteboardModalOpen, setIsAddWhiteboardModalOpen] = useState(false)

    const { data, loading, error, refetch } = useQuery(GET_WHITEBOARDS)
    const [createWhiteboard] = useMutation(CREATE_WHITEBOARD)

    const whiteboards = useMemo(() => {
        return data?.getAll || []
    }, [data])

    const filteredBoards = useMemo(() => {
        if (!searchQuery.trim()) {
            return whiteboards
        }

        return whiteboards.filter(
            (board: Whiteboard) =>
                board.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                board.description.toLowerCase().includes(searchQuery.toLowerCase())
        )
    }, [whiteboards, searchQuery])

    const handleClose = () => {
        setIsAddWhiteboardModalOpen(false)
    }

    const handleEditWhiteboardModal = (payload: WhiteboardPayload) => {
        console.log("Edit Whiteboard Modal Opened", payload)
    }

    const handleCreate = async (payload: WhiteboardPayload) => {
        try {
            const result = await createWhiteboard({
                variables: {
                    input: {
                        name: payload.name,
                        description: payload.description,
                    },
                },
            })

            toast.success(result.data?.create?.message || "Whiteboard created successfully")
            await refetch()
        } catch (error) {
            toast.error("Failed to create whiteboard")
        }

        setIsAddWhiteboardModalOpen(false)
    }

    return (
        <>
            <HeaderMenu />

            <div className="flex justify-start items-center my-8 ml-8">
                <input
                    type="text"
                    placeholder="Search..."
                    className="px-3 py-2 border border-gray-300 rounded-md min-w-[240px] focus:outline-none focus:ring-2 focus:ring-blue-200"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                    onClick={() => setIsAddWhiteboardModalOpen(true)}
                    className="ml-4 px-4 py-2 bg-blue-600 text-white rounded cursor-pointer hover:bg-blue-700 focus:outline-none"
                >
                    Add Whiteboard
                </button>
            </div>

            {loading && (
                <div className="flex justify-center items-center py-8">
                    <div className="text-gray-600">Loading whiteboards...</div>
                </div>
            )}

            {error && (
                <div className="flex justify-center items-center py-8">
                    <div className="text-red-600">Error loading whiteboards. Please try again.</div>
                </div>
            )}

            {!loading && !error && (
                <div className="flex flex-wrap gap-6 justify-center mx-8">
                    {filteredBoards.length === 0 ? (
                        <div className="text-center py-8 text-gray-600">
                            {searchQuery.trim() ? (
                                <div>No whiteboards found matching "{searchQuery}"</div>
                            ) : (
                                <div>No whiteboards available. Create your first whiteboard!</div>
                            )}
                        </div>
                    ) : (
                        filteredBoards.map((card: Whiteboard) => (
                            <div
                                key={card.id}
                                className="bg-white border border-gray-200 rounded-lg w-64 shadow-sm flex flex-col overflow-hidden"
                            >
                                <DashboardCard
                                    id={card.id}
                                    name={card.name}
                                    description={card.description}
                                    onOpenEditWhiteboardModal={handleEditWhiteboardModal}
                                />
                            </div>
                        ))
                    )}
                </div>
            )}

            <CreateWhiteboardModal
                isOpen={isAddWhiteboardModalOpen}
                onClose={handleClose}
                onCreate={handleCreate}
            />
        </>
    )
}

export default DashboardView 