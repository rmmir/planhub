import { createRouter, createWebHistory } from "vue-router"
import { jwtDecode } from "jwt-decode"

import LoginView from "@/views/LoginView.vue"
import RegisterView from "@/views/RegisterView.vue"
import DashboardView from "@/views/DashboardView.vue"
import WhiteboardView from "@/views/WhiteboardView.vue"

const routes = [
    { path: "/", component: DashboardView, meta: { requiresAuth: true } },
    { path: "/whiteboard/:id", component: WhiteboardView, meta: { requiresAuth: true } },
    { path: "/login", component: LoginView },
    { path: "/register", component: RegisterView },
]

export const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach((to, _, next) => {
    const token = localStorage.getItem("access_token")

    if (to.meta.requiresAuth) {
        if (!token) {
            next("/login")
        }

        try {
            const decoded: { exp: number } = jwtDecode(token)
            const isExpired = decoded.exp * 1000 < Date.now()

            if (isExpired) {
                localStorage.removeItem("access_token")
                return next("/login")
            }
        } catch (err) {
            localStorage.removeItem("access_token")
            return next("/login")
        }
    }

    if ((to.path === "/login" || to.path === "/register") && token) {
        next("/")
    }

    next()
})
