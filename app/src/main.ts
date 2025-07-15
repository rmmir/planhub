import { createApp, provide, h } from "vue"
import App from "./App.vue"
import { router } from "./router/index.js"
import "./style.css"
import { DefaultApolloClient } from "@vue/apollo-composable"
import apolloClient from "./apollo-client.js"

const app = createApp({
    setup() {
        provide(DefaultApolloClient, apolloClient)
    },
    render: () => h(App),
})
app.use(router)
app.mount("#app")
