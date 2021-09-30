import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

export const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'home',
        component: () => import('@/view/Home.vue'),
    },
    {
        path: '/info',
        name: 'info',
        component: () => import('@/view/InfoPage.vue'),
        children: [
            { path: '', redirect: '/info/info' },
            { path: 'contact', component: () => import('@/view/info/Contact.vue') },
            { path: 'external', component: () => import('@/view/info/External.vue') },
            { path: 'info', component: () => import('@/view/info/Info.vue') },
            { path: 'license', component: () => import('@/view/info/License.vue') },
        ],
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router
