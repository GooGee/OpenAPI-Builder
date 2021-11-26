import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import menuxx from './menuxx'
import Menu from './model/Entity/Menu'

export const routexx: Array<RouteRecordRaw> = []
menuxx.forEach((group) => group.menuxx.forEach((menu) => routexx.push(makeRoute(menu))))

function makeRoute(menu: Menu) {
    const item = {
        path: menu.path,
    } as RouteRecordRaw
    if (menu.redirect) {
        item.redirect = menu.redirect
    }
    if (menu.component) {
        item.component = menu.component as any
    }

    if (menu.menuxx.length) {
        item.children = []
        menu.menuxx.forEach((menu) => item.children!.push(makeRoute(menu)))
    }
    return item
}

const router = createRouter({
    history: createWebHashHistory(),
    routes: routexx,
})

export default router
