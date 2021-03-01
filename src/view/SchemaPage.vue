<template>
    <div class="row">
        <div class="col-3">
            <SideBar :sidebar="sidebar" @select="changeKey"></SideBar>
        </div>

        <div v-if="sidebar.item" class="col-9">
            <TabBar :route="route" class="mt11"></TabBar>
            <router-view :key="key"></router-view>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import TabBar from './part/TabBar.vue'
import SideBar from './part/SideBar.vue'
import { SideBarEnum } from '@/model/Data/SideBar'
import PageSetup from './hook/PageSetup'

export default defineComponent({
    components: {
        TabBar,
        SideBar,
    },
    setup() {
        const data = PageSetup(SideBarEnum.Schema)
        return data
    },
    data() {
        return {
            route: this.$router.options.routes.find(route => route.name === 'schema'),
        }
    },
})
</script>
