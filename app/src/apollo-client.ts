import {
    ApolloClient,
    createHttpLink,
    InMemoryCache,
} from "@apollo/client/core"

const link = createHttpLink({
    uri: import.meta.env.VITE_SERVER_URL,
})

const cache = new InMemoryCache()

const apolloClient = new ApolloClient({ link, cache })

export default apolloClient
