<template>
    <div class="row">
        <div class="col-3"></div>

        <div class="col-9">
            <TabBar :route="route" class="mt11"></TabBar>
            <router-view></router-view>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import TabBar from './part/TabBar.vue'
import sss from '@/sss.ts'

export default defineComponent({
    components: {
        TabBar,
    },
    data() {
        return {
            route: this.$router.options.routes.find(route => route.name === 'other'),
        }
    },
})
</script>
