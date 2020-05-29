import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    scrollBehavior() {
        return { x: 0, y: 0 }
    },
    routes: [
        {
            path: '/',
            name: 'home',
            component: require('@/components/Home').default,
        },
        {
            path: '/example',
            name: 'example',
            component: require('@/components/Example').default,
        },
        {
            path: '/header',
            name: 'header',
            component: require('@/components/HeaderPage').default,
        },
        {
            path: '/info',
            name: 'info',
            component: require('@/components/Info').default,
        },
        {
            path: '/parameter',
            name: 'parameter',
            component: require('@/components/Parameter').default,
        },
        {
            path: '/path',
            name: 'path',
            component: require('@/components/PathPage').default,
        },
        {
            path: '/request',
            name: 'request',
            component: require('@/components/RequestBody').default,
        },
        {
            path: '/response',
            name: 'response',
            component: require('@/components/Response').default,
        },
        {
            path: '/schema',
            name: 'schema',
            component: require('@/components/schema/SchemaPage').default,
        },
        {
            path: '/security',
            name: 'security',
            component: require('@/components/Security').default,
        },
        {
            path: '/server',
            name: 'server',
            component: require('@/components/server/ServerList').default,
        },
        {
            path: '/tag',
            name: 'tag',
            component: require('@/components/Tag').default,
        },
        {
            path: '*',
            redirect: '/',
        },
    ],
})
