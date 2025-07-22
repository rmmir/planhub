import { createApp, provide, h } from "vue"
import Toast from "vue-toastification"
import "vue-toastification/dist/index.css"
import { DefaultApolloClient } from "@vue/apollo-composable"
import App from "./App.vue"
import { router } from "./router/index.js"
import "./style.css"

import apolloClient from "./apollo-client.js"

const app = createApp({
    setup() {
        provide(DefaultApolloClient, apolloClient)
    },
    render: () => h(App),
})
app.use(router)
app.use(Toast as any, {
    transition: "Vue-Toastification__fade",
    maxToasts: 5,
    newestOnTop: true,
})
app.mount("#app")
