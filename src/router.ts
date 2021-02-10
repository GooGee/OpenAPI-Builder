import { createRouter, createWebHashHistory } from 'vue-router'

export const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('@/view/Home.vue'),
    },
    {
        path: '/infopage',
        name: 'info',
        component: () => import('@/view/InfoPage.vue'),
        children: [
            { path: '', redirect: '/infopage/info' },
            { path: 'info', component: () => import('@/view/info/Info.vue') },
            { path: 'contact', component: () => import('@/view/info/Contact.vue') },
            { path: 'license', component: () => import('@/view/info/License.vue') },
        ],
    },
    {
        path: '/example',
        name: 'example',
        component: () => import('@/view/Example.vue'),
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router
