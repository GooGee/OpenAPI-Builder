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
            { path: 'contact', component: () => import('@/view/info/Contact.vue') },
            { path: 'external', component: () => import('@/view/info/External.vue') },
            { path: 'info', component: () => import('@/view/info/Info.vue') },
            { path: 'license', component: () => import('@/view/info/License.vue') },
        ],
    },
    {
        path: '/example',
        name: 'example',
        component: () => import('@/view/Example.vue'),
    },
    {
        path: '/header',
        name: 'header',
        component: () => import('@/view/HeaderPage.vue'),
    },
    {
        path: '/other',
        name: 'other',
        component: () => import('@/view/OtherPage.vue'),
        children: [
            { path: '', redirect: '/other/tag' },
            { path: 'tag', component: () => import('@/view/other/TagList.vue') },
        ],
    },
    {
        path: '/parameter',
        name: 'parameter',
        component: () => import('@/view/Parameter.vue'),
    },
    {
        path: '/path',
        name: 'path',
        component: () => import('@/view/PathPage.vue'),
        children: [
            { path: '', redirect: '/path/property' },
            { path: 'operation', component: () => import('@/view/path/OperationList.vue') },
            { path: 'parameter', component: () => import('@/view/path/Parameter.vue') },
            { path: 'property', component: () => import('@/view/path/Property.vue') },
        ],
    },
    {
        path: '/preset',
        name: 'preset',
        component: () => import('@/view/PresetPage.vue'),
    },
    {
        path: '/request',
        name: 'request',
        component: () => import('@/view/RequestBody.vue'),
    },
    {
        path: '/response',
        name: 'response',
        component: () => import('@/view/Response.vue'),
        children: [
            { path: '', redirect: '/response/content' },
            { path: 'content', component: () => import('@/view/response/Content.vue') },
            { path: 'header', component: () => import('@/view/response/Header.vue') },
            { path: 'property', component: () => import('@/view/response/Property.vue') },
        ],
    },
    {
        path: '/schema',
        name: 'schema',
        component: () => import('@/view/SchemaPage.vue'),
    },
    {
        path: '/server',
        name: 'server',
        component: () => import('@/view/ServerPage.vue'),
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router
