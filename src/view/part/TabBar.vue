<template>
    <ul class="nav nav-tabs">
        <li v-for="item in list" :key="item.path" class="nav-item">
            <router-link
                :to="path + '/' + item.path"
                active-class="active"
                class="nav-link"
            >
                {{ item.path }}
            </router-link>
        </li>
    </ul>
</template>

<script lang="ts">
import { routes } from '@/router'
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        path: {
            type: String,
            required: true,
        },
    },
    setup(props, context) {
        const route = routes.find((one) => one.path === props.path)
        const list =
            route?.children?.filter((route) => route.redirect === undefined) ?? []
        return {
            list,
        }
    },
})
</script>
