import React, { useState, useEffect } from "react"
import Modal from "../common/Modal"

interface CreateWhiteboardModalProps {
    isOpen: boolean
    onClose: () => void
    onCreate: (payload: { name: string; description: string }) => void
}

const CreateWhiteboardModal: React.FC<CreateWhiteboardModalProps> = ({
    isOpen,
    onClose,
    onCreate,
}) => {
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")

    useEffect(() => {
        if (!isOpen) {
            resetForm()
        }
    }, [isOpen])

    const resetForm = () => {
        setName("")
        setDescription("")
    }

    const closeModal = () => {
        resetForm()
        onClose()
    }

    const submitForm = (e: React.FormEvent) => {
        e.preventDefault()
        onCreate({ name, description })
        closeModal()
    }

    return (
        <Modal isOpen={isOpen} onClose={closeModal}>
            <h2 className="text-lg font-semibold">Create New Whiteboard</h2>
            <p className="mt-2 text-sm text-gray-600">
                Give your whiteboard a name and optional description.
            </p>

            <form onSubmit={submitForm} className="mt-4 space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                        required
                        className="mt-1 w-full px-3 py-2 border rounded shadow-sm focus:ring focus:outline-none"
                        placeholder="e.g., Project Planning"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={3}
                        className="mt-1 w-full px-3 py-2 border rounded shadow-sm focus:ring focus:outline-none"
                        placeholder="Optional description"
                    ></textarea>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                    <button
                        type="button"
                        onClick={closeModal}
                        className="px-4 py-2 bg-gray-200 rounded cursor-pointer hover:bg-gray-300 focus:outline-none"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white rounded cursor-pointer hover:bg-blue-700 focus:outline-none"
                    >
                        Create
                    </button>
                </div>
            </form>
        </Modal>
    )
}

export default CreateWhiteboardModal 