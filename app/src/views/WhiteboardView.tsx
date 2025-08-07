import React from "react"
import HeaderMenu from "../components/common/HeaderMenu"
import ExcalidrawBoard from "../components/whiteboard/ExcalidrawBoard"

const WhiteboardView: React.FC = () => {
    return (
        <>
            <HeaderMenu />
            <ExcalidrawBoard />
        </>
    )
}

export default WhiteboardView 