import { gql } from "@apollo/client/core"

export const GET_USER = gql`
    query GetUser($id: String!) {
        getUserById(input: $id) {
            id
            username
        }
    }
`
