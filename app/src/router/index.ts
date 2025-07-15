import { createRouter, createWebHistory } from "vue-router"

import LoginView from "@/views/LoginView.vue"
import RegisterView from "@/views/RegisterView.vue"
import DashboardView from "@/views/DashboardView.vue"

const routes = [
    { path: "/", component: DashboardView, meta: { requiresAuth: true } },
    { path: "/login", component: LoginView },
    { path: "/register", component: RegisterView },
]

export const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach((to, _, next) => {
    const token = localStorage.getItem("jwt-token")

    if (to.meta.requiresAuth && !token) {
        next("/login")
    } else if ((to.path === "/login" || to.path === "/register") && token) {
        next("/")
    } else {
        next()
    }
})
