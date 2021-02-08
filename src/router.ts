import { createRouter, createWebHashHistory } from 'vue-router'

export const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('@/view/Home.vue'),
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router
