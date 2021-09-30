<template>
    <nav v-if="store.ready" class="navbar navbar-expand fixed-top navbar-dark bg-primary">
        <ul class="navbar-nav mr-auto">
            <li v-for="item in routes" :key="item.path" class="nav-item">
                <router-link :to="item.path" active-class="active" class="nav-link">
                    {{ item.name }}
                </router-link>
            </li>
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
import { routes } from '@/router'
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
        return { routes, store }
    },
})
</script>
