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
    {
        path: '/enumer',
        name: 'enumer',
        component: () => import('@/view/EnumerPage.vue'),
    },
    {
        path: '/example',
        name: 'example',
        component: () => import('@/view/ExamplePage.vue'),
    },
    {
        path: '/header',
        name: 'header',
        component: () => import('@/view/HeaderPage.vue'),
    },
    {
        path: '/parameter',
        name: 'parameter',
        component: () => import('@/view/ParameterPage.vue'),
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
        component: () => import('@/view/RequestPage.vue'),
        children: [
            { path: '', redirect: '/request/property' },
            { path: 'content', component: () => import('@/view/response/Content.vue') },
            { path: 'property', component: () => import('@/view/response/Property.vue') },
        ],
    },
    {
        path: '/response',
        name: 'response',
        component: () => import('@/view/ResponsePage.vue'),
        children: [
            { path: '', redirect: '/response/property' },
            { path: 'content', component: () => import('@/view/response/Content.vue') },
            { path: 'header', component: () => import('@/view/response/Header.vue') },
            { path: 'property', component: () => import('@/view/response/Property.vue') },
        ],
    },
    {
        path: '/schema',
        name: 'schema',
        component: () => import('@/view/SchemaPage.vue'),
        children: [
            { path: '', redirect: '/schema/property' },
            { path: 'discriminator', component: () => import('@/view/schema/Discriminator.vue') },
            { path: 'excluded', component: () => import('@/view/schema/ExcludedField.vue') },
            { path: 'import', component: () => import('@/view/schema/Import.vue') },
            { path: 'property', component: () => import('@/view/schema/Property.vue') },
            { path: 'required', component: () => import('@/view/schema/RequiredField.vue') },
            { path: 'script', component: () => import('@/view/schema/Script.vue') },
            { path: 'structure', component: () => import('@/view/schema/SchemaComplex.vue') },
        ],
    },
    {
        path: '/script',
        name: 'script',
        component: () => import('@/view/ScriptPage.vue'),
    },
    {
        path: '/security-requirement',
        name: 'security-requirement',
        component: () => import('@/view/SecurityRequirementPage.vue'),
    },
    {
        path: '/security-scheme',
        name: 'security-scheme',
        component: () => import('@/view/SecuritySchemePage.vue'),
    },
    {
        path: '/security-scope',
        name: 'security-scope',
        component: () => import('@/view/SecurityScopePage.vue'),
    },
    {
        path: '/server',
        name: 'server',
        component: () => import('@/view/ServerPage.vue'),
    },
    {
        path: '/server-variable',
        name: 'server-variable',
        component: () => import('@/view/ServerVariablePage.vue'),
    },
    {
        path: '/tag',
        name: 'tag',
        component: () => import('@/view/TagPage.vue'),
    },
    {
        path: '/template',
        name: 'template',
        component: () => import('@/view/TemplatePage.vue'),
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router
