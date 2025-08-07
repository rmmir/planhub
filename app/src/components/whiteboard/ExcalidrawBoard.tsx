import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { useQuery } from "@apollo/client"
import { gql } from "@apollo/client"
import { Excalidraw } from "@excalidraw/excalidraw"

const GET_WHITEBOARD_BY_ID = gql`
    query GetWhiteboardById($id: String!) {
        getById(input: $id) {
            id
            name
            description
            elements
            createdAt
            updatedAt
        }
    }
`

const ExcalidrawBoard: React.FC = () => {
    const { id } = useParams<{ id: string }>()
    const [elements, setElements] = useState<any[]>([])
    const [excalidrawComponent, setExcalidrawComponent] = useState<any>(null)

    const { data, loading, error } = useQuery(GET_WHITEBOARD_BY_ID, {
        variables: { id },
    })

    useEffect(() => {
        if (data?.getById?.elements) {
            setElements(data.getById.elements)
        }
    }, [data])

    useEffect(() => {
        // Excalidraw is already imported, so we can use it directly
        setExcalidrawComponent(Excalidraw)
    }, [])

    const handleElementsChange = (updatedElements: readonly any[]) => {
        const mutableElements = [...updatedElements]
        if (JSON.stringify(mutableElements) !== JSON.stringify(elements)) {
            setElements(mutableElements)
        }
    }

    const handlePointerUp = () => {
        setElements([...elements])
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center py-8">
                <div className="text-gray-600">Loading whiteboard...</div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="flex justify-center items-center py-8">
                <div className="text-red-600">Error loading whiteboard. Please try again.</div>
            </div>
        )
    }

    return (
        <div style={{ height: "85vh", width: "90vw", borderRadius: "20px", overflow: "hidden" }}>
            {excalidrawComponent && (
                <Excalidraw
                    initialData={{ elements }}
                    onChange={handleElementsChange}
                    onPointerUp={handlePointerUp}
                />
            )}
        </div>
    )
}

export default ExcalidrawBoard 