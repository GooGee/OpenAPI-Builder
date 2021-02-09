<template>
    <div class="row">
        <div class="col-3"></div>

        <div class="col-9">
            <h1></h1>
            <TabBar :route="route"></TabBar>
            <router-view></router-view>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import TabBar from './part/TabBar.vue'

export default defineComponent({
    components: {
        TabBar,
    },
    data() {
        return {
            route: this.$router.options.routes.find(route => route.name === 'info'),
        }
    },
})
</script>
