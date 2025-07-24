import { gql } from "@apollo/client/core"

export const GET_WHITEBOARDS = gql`
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

export const GET_WHITEBOARD_BY_ID = gql`
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

export const CREATE_WHITEBOARD = gql`
    mutation CreateWhiteboard($input: CreateWhiteboardInput!) {
        create(input: $input) {
            id
            message
        }
    }
`
