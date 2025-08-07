import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import { ApolloProvider } from "@apollo/client"
import { Toaster } from "react-hot-toast"
import App from "./App.tsx"
import { apolloClient } from "./apollo-client"
import "./style.css"

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <ApolloProvider client={apolloClient}>
            <BrowserRouter>
                <App />
                <Toaster
                    position="top-right"
                    toastOptions={{
                        duration: 4000,
                        style: {
                            background: "#363636",
                            color: "#fff",
                        },
                    }}
                />
            </BrowserRouter>
        </ApolloProvider>
    </React.StrictMode>
) 