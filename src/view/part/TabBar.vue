<template>
    <ul class="nav nav-tabs">
        <li v-for="item in list" :key="item.path" class="nav-item">
            <router-link :to="route.path + '/' + item.path" active-class="active" class="nav-link">
                {{ item.path }}
            </router-link>
        </li>
    </ul>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { RouteRecordRaw } from 'vue-router'
import sss from '@/sss.ts'

export default defineComponent({
    props: {
        route: {
            type: Object as PropType<RouteRecordRaw>,
            required: true,
        },
    },
    data() {
        return {
            sss,
            list: [] as RouteRecordRaw[],
        }
    },
    created() {
        if (this.route.children) {
            this.list = this.route.children.filter(route => route.redirect === undefined)
        }
    },
})
</script>
