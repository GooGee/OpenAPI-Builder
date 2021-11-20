<template>
    <nav
        v-if="store.ready"
        class="navbar navbar-expand fixed-top navbar-dark bg-primary"
    >
        <ul class="navbar-nav mr-auto">
            <template v-for="menu in menuxx">
                <li
                    v-if="menu.menuxx.length"
                    :key="menu.path"
                    class="nav-item dropdown"
                >
                    <span class="nav-link dropdown-toggle pointer">
                        {{ menu.title }}
                    </span>
                    <ul class="dropdown-menu">
                        <li v-for="mm in menu.menuxx" :key="mm.path">
                            <router-link
                                :to="mm.path"
                                active-class="active"
                                class="dropdown-item"
                            >
                                {{ mm.title }}
                            </router-link>
                        </li>
                    </ul>
                </li>
                <li v-else :key="menu.path" class="nav-item">
                    <router-link :to="menu.path" active-class="active" class="nav-link">
                        {{ menu.title }}
                    </router-link>
                </li>
            </template>
        </ul>

        <ul v-if="inBrowser" class="navbar-nav ml-auto mr11">
            <li class="nav-item">
                <a
                    href="https://github.com/GooGee/OpenAPI-Builder"
                    rel="noopener"
                    target="_blank"
                    class="nav-link"
                >
                    GitHub
                </a>
            </li>
        </ul>
    </nav>
</template>

<script lang="ts">
import menuxx from '@/menuxx'
import store from '@/store'
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        inBrowser: {
            type: Boolean,
            required: true,
        },
    },
    setup(props, context) {
        return {
            menuxx,
            store,
        }
    },
})
</script>

<style scoped>
.nav-item.dropdown:hover .dropdown-menu,
.dropdown-menu:hover {
    display: block;
    top: 88%;
}

.navbar-dark .navbar-nav .nav-link.active {
    font-weight: bold;
}
.navbar-dark .navbar-nav .nav-link:hover {
    color: white;
}
.navbar-dark .navbar-nav .dropdown-item:not(.active):hover {
    background-color: #e9ecef;
}
</style>