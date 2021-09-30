import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

export const routes: Array<RouteRecordRaw> = [
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
