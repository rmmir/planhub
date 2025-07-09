import { createRouter, createWebHistory } from 'vue-router';

import LoginView from '@/views/LoginView.vue';
import RegisterView from '@/views/RegisterView.vue';
import DashboardView from '@/views/DashboardView.vue';

const routes = [
    { path: '/', component: DashboardView },
    { path: '/login', component: LoginView },
    { path: '/register', component: RegisterView },
];

export const router = createRouter({
    history: createWebHistory(),
    routes,
});
