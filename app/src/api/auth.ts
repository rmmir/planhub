import { gql } from "@apollo/client/core"

export const GET_USER = gql`
    query GetUser($id: String!) {
        getUserById(input: $id) {
            id
            username
        }
    }
`

export const LOGIN = gql`
    mutation Login($input: LoginInput!) {
        login(input: $input) {
            access_token
        }
    }
`

export const REGISTER = gql`
    mutation Register($input: RegisterInput!) {
        register(input: $input) {
            username
        }
    }
`
