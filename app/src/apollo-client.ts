import {
    ApolloClient,
    createHttpLink,
    InMemoryCache,
} from "@apollo/client/core"
import { setContext } from "@apollo/client/link/context"

const link = createHttpLink({
    uri: import.meta.env.VITE_SERVER_URL + "/graphql",
})

const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem("jwt-token")

    return {
        ...headers,
        Authorization: token ? `Bearer ${token}` : "",
    }
})

const apolloClient = new ApolloClient({ link: authLink.concat(link), cache: new InMemoryCache() })

export default apolloClient
