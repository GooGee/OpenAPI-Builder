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
            component: require('@/pages/Home').default,
        },
        {
            path: '/example',
            name: 'example',
            component: require('@/pages/Example').default,
        },
        {
            path: '/info',
            name: 'info',
            component: require('@/pages/Info').default,
        },
        {
            path: '/parameter',
            name: 'parameter',
            component: require('@/pages/Parameter').default,
        },
        {
            path: '/request',
            name: 'request',
            component: require('@/pages/RequestBody').default,
        },
        {
            path: '/response',
            name: 'response',
            component: require('@/pages/Response').default,
        },
        {
            path: '/schema',
            name: 'schema',
            component: require('@/pages/schema/SchemaPage').default,
        },
        {
            path: '/security',
            name: 'security',
            component: require('@/pages/Security').default,
        },
        {
            path: '/server',
            name: 'server',
            component: require('@/pages/server/ServerList').default,
        },
        {
            path: '/tag',
            name: 'tag',
            component: require('@/pages/Tag').default,
        },
        {
            path: '*',
            redirect: '/',
        },
    ],
})
